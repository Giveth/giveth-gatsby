import React, { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import { keccak256 } from 'ethers/lib/utils'
import { promisify } from 'util'
import * as Auth from '../services/auth'
import { useApolloClient } from '@apollo/client'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import LoadingModal from '../components/loadingModal'
import { getToken, validateAuthToken } from '../services/token'
import { getWallet } from '../wallets'
import User from '../entities/user'
import Toast from '../components/toast'
import detectEthereumProvider from '@metamask/detect-provider'

const WalletContext = React.createContext()
const network = process.env.GATSBY_NETWORK
const networkId = process.env.GATSBY_NETWORK_ID

let wallet = {}

function useWallet () {
  const context = React.useContext(WalletContext)
  if (!context) {
    throw new Error(`userWallet must be used within a WalletProvider`)
  }
  return context
}

function WalletProvider (props) {
  const localStorageUser = Auth.getUser()
  const initUser = new User(localStorageUser.walletType, localStorageUser)

  const [user, setUser] = useState(initUser)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [ethEnabled, setEthEnabled] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())
  const client = useApolloClient()

  const initWallet = async walletProvider => {
    const provider = await detectEthereumProvider()
    if (provider && walletProvider !== 'torus') {
      setEthEnabled(provider)
      wallet = getWallet('metamask')
    } else {
      wallet = getWallet('torus')
    }
    console.log(`wallet.isTorus : ${JSON.stringify(wallet.isTorus, null, 2)}`)

    await wallet.init('production', network)
    const networkName = await wallet?.web3.eth.net.getNetworkType()
    updateBalance(
      localStorageUser?.walletAddresses?.length > 0 &&
        localStorageUser.walletAddresses[0]
    )
    setCurrentNetwork(networkName)

    wallet?.provider?.on('accountsChanged', function (accounts) {
      if (accounts[0] && accounts[0] !== account) {
        Toast({ content: 'Account changed', type: 'warn' })
      }
    })
    wallet?.provider?.on('chainChanged', async chainId => {
      // needs to be fetched again as chainId is being returned like 0x
      const chainID = await wallet?.web3.eth.net.getId()
      console.log({ chainID, networkId })
      if (networkId !== chainID?.toString()) {
        Toast({
          content: `Ethereum network changed please use ${network}`,
          type: 'warn'
        })
      }
    })
  }

  useEffect(() => {
    initWallet(localStorageUser?.walletType)
  }, [])

  async function logout () {
    setLoading(true)

    Auth.handleLogout()
    setIsLoggedIn(false)
    setLoading(false)
  }

  async function signMessage (message, publicAddress) {
    try {
      let signedMessage = null
      const customPrefix = `\u0019${window.location.hostname} Signed Message:\n`
      const prefixWithLength = Buffer.from(
        `${customPrefix}${message.length.toString()}`,
        'utf-8'
      )
      const finalMessage = Buffer.concat([
        prefixWithLength,
        Buffer.from(message)
      ])

      const hashedMsg = keccak256(finalMessage)
      const send = promisify(wallet.web3.currentProvider.sendAsync)

      const { result } = await send({
        method: 'eth_sign',
        params: [
          publicAddress,
          hashedMsg,
          { customPrefix, customMessage: message }
        ],
        from: publicAddress
      })
      signedMessage = result

      return signedMessage
    } catch (error) {
      console.log('Signing Error!', error)
    }
  }

  async function updateUserInfoOnly () {
    if (!user) return null
    const { data } = await client.query({
      query: GET_USER_BY_ADDRESS,
      variables: {
        address: user?.walletAddresses[0]?.toLowerCase()
      },
      fetchPolicy: 'network-only'
    })
    const localStorageUser = Auth.getUser()
    const newUser = new User(localStorageUser.walletType, localStorageUser)
    newUser.parseDbUser(data?.userByAddress)
    setUser(newUser)
    Auth.setUser(newUser)
  }

  async function updateBalance (publicAddress) {
    if (!publicAddress) return null
    const balance = await wallet.web3.eth.getBalance(publicAddress)
    setBalance(wallet.web3.utils.fromWei(balance, 'ether'))
  }

  async function updateUser (accounts) {
    console.log(`updateUser: accounts : ${JSON.stringify(accounts, null, 2)}`)
    if (accounts?.length < 0) return
    const publicAddress = wallet.web3.utils.toChecksumAddress(accounts[0])
    setAccount(publicAddress)
    updateBalance(publicAddress)
    // let user
    let user
    if (typeof wallet.torus !== 'undefined') {
      const torusUser = await wallet.torus.getUserInfo()
      torusUser.walletAddresses = []
      torusUser.walletAddresses.push(publicAddress)
      user = new User('torus')
      user.parseTorusUser(torusUser)
      // user.addresses = accounts
    } else {
      user = new User('other')
      user.addWalletAddress(publicAddress, true)
    }

    const signedMessage = await signMessage('our_secret', publicAddress)
    if (!signedMessage) return
    console.log(`updateUser: user : ${JSON.stringify(user, null, 2)}`)
    console.log(`signedMessage ---> : ${signedMessage}`)

    const { userIDFromDB, token, dbUser } = await getToken(user, signedMessage)
    user.parseDbUser(dbUser)

    user.setUserId(userIDFromDB)
    user.setToken(token)

    Auth.setUser(user)
    setIsLoggedIn(true)
    setUser(user)
  }

  async function validateToken () {
    const isValid = await validateAuthToken(Auth.getUserToken())
    return isValid
  }

  async function login ({ walletProvider }) {
    try {
      wallet = getWallet(walletProvider)
      setLoading(true)
      await initWallet(walletProvider)
      console.log(`torus: login WalletProvider.login`, {
        wallet,
        walletProvider
      })
      console.log(
        `torus: login  wallet.torus is loaded : ${typeof wallet.torus === true}`
      )
      console.log(
        `updateUser: typeof wallet : ${JSON.stringify(typeof wallet, null, 2)}`
      )
      console.log(
        `updateUser: wallet.torus : ${JSON.stringify(
          typeof wallet.torus,
          null,
          2
        )}`
      )
      console.log(
        `updateUser: wallet.isLoggedIn()  : ${JSON.stringify(
          wallet.isLoggedIn(),
          null,
          2
        )}`
      )

      if (wallet && !(wallet.isLoggedIn() && isLoggedIn)) {
        await wallet.login()
        console.log('updateUser: awaiting login')
        wallet.web3.eth.getAccounts().then(updateUser)
      }
      console.log('updateUser: post')

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  function isWalletAddressValid (address) {
    if (address.length !== 42 || !Web3.utils.isAddress(address)) {
      return false
    } else {
      return true
    }
  }

  function isAddressENS (address) {
    return address.toLowerCase().indexOf('.eth') > -1
  }

  async function checkNetwork () {
    if (!wallet) throw new Error('No Eth Provider')
    const currentNetworkId = await wallet?.web3.eth.getChainId()
    console.log({ currentNetworkId, networkId })
    if (currentNetworkId?.toString() === networkId) {
      return true
    } else {
      throw new Error(`Wrong network, please change to ${network}`)
    }
  }

  async function sendTransaction (params) {
    try {
      await checkNetwork()
      const fromAccount = await wallet?.web3.eth.getAccounts()
      return wallet?.web3.eth.sendTransaction({
        from: fromAccount[0],
        to: params?.to,
        value: params?.value
      })
    } catch (error) {
      console.log('Error sending transaction: ', { error })
      throw new Error(error)
    }
  }

  async function getAddressFromENS (address) {
    const ens = await wallet.web3.eth.ens.getOwner(address)
    let zeroXAddress
    if (ens !== '0x0000000000000000000000000000000000000000') {
      zeroXAddress = ens
    } else {
      zeroXAddress = address
    }

    if (isWalletAddressValid(zeroXAddress)) {
      return zeroXAddress
    } else {
      return new Error('Error gettingAddressFromENS')
    }
  }

  const value = React.useMemo(() => {
    return {
      login,
      validateToken,
      sendTransaction,
      checkNetwork,
      ethEnabled,
      account,
      balance,
      isLoggedIn,
      updateUser,
      updateUserInfoOnly,
      logout,
      user,
      network,
      currentNetwork,
      isWalletAddressValid,
      isAddressENS,
      getAddressFromENS,
      wallet
    }
  }, [account, balance, ethEnabled, isLoggedIn, user, currentNetwork])
  return (
    <WalletContext.Provider value={value} {...props}>
      {loading && <LoadingModal isOpen={loading} />}
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletProvider, useWallet }
