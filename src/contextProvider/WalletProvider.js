import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { keccak256 } from 'ethers/lib/utils'
import { promisify } from 'util'
import * as Auth from '../services/auth'
import LoadingModal from '../components/loadingModal'
import { getToken } from '../services/token'
import { getWallet } from '../wallets'
import User from '../entities/user'
import { PopupContext } from '../contextProvider/popupProvider'

console.log(`*** User : ${JSON.stringify(User, null, 2)}`)
const WalletContext = React.createContext()
const network = process.env.GATSBY_NETWORK
const DEFAULT_WALLET = 'torus'
let wallet = {}
if (typeof window === 'object') {
  wallet = getWallet(DEFAULT_WALLET)
}

function useWallet() {
  const context = React.useContext(WalletContext)
  if (!context) {
    throw new Error(`userWallet must be used within a WalletProvider`)
  }
  return context
}

function WalletProvider(props) {
  const popup = React.useContext(PopupContext)

  const localStorageUser = Auth.getUser()
  const initUser = new User(localStorageUser.walletType, localStorageUser)
  console.log(`debug: initUser : ${JSON.stringify(initUser, null, 2)}`)

  const [user, setUser] = useState(initUser)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  console.log(`debug: Auth.checkIfLoggedIn() ---> : ${Auth.checkIfLoggedIn()}`)
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())

  const initWallet = async () => {
    await wallet.init('production', network)
    wallet?.provider?.on('accountsChanged', function (accounts) {
      popup.triggerPopup('Account changed')
    })
  }

  useEffect(() => {
    initWallet()
  }, [])

  async function logout() {
    setLoading(true)

    Auth.handleLogout()
    setIsLoggedIn(false)
    // if (balancePolling) {
    //   clearInterval(balancePolling)
    //   balancePolling = 0
    // }
    setLoading(false)
  }

  async function signMessage(message, publicAddress) {
    try {
      let signedMessage = null
      console.log({ user })
      console.log('signMessage 1')

      const customPrefix = `\u0019${window.location.hostname} Signed Message:\n`
      const prefixWithLength = Buffer.from(
        `${customPrefix}${message.length.toString()}`,
        'utf-8'
      )
      const finalMessage = Buffer.concat([
        prefixWithLength,
        Buffer.from(message)
      ])
      console.log('signMessage 2')

      const hashedMsg = keccak256(finalMessage)
      const send = promisify(wallet.web3.currentProvider.sendAsync)

      console.log(
        `message sending : ${JSON.stringify(
          [publicAddress, hashedMsg, { customPrefix, customMessage: message }],
          null,
          2
        )}`
      )
      console.log(`meta: THIS FAR ---> `, publicAddress)
      const { result } = await send({
        method: 'eth_sign',
        params: [
          publicAddress,
          hashedMsg,
          { customPrefix, customMessage: message }
        ],
        from: publicAddress
      })
      console.log('AFTER sign')

      signedMessage = result

      return signedMessage
    } catch (error) {
      console.log('Signing Error!', error)
    }
  }

  async function updateUser(accounts) {
    console.log(`accounts : ${JSON.stringify(accounts, null, 2)}`)

    const publicAddress = wallet.web3.utils.toChecksumAddress(accounts[0])
    console.log(
      `meta: updateUser publicAddress : ${JSON.stringify(
        publicAddress,
        null,
        2
      )}`
    )

    console.log(`Updating User`)
    setAccount(publicAddress)
    const balance = await wallet.web3.eth.getBalance(publicAddress)
    // .then(balance => {
    //   setBalance(balance)
    // })
    setBalance(balance)
    // let user
    let user
    if (typeof wallet.torus !== 'undefined') {
      const torusUser = await wallet.torus.getUserInfo()
      // getUserInfo() won't return the addresses, so we have to add them here
      user = new User('torus')
      console.log('OMG', { torusUser })
      user.parseTorusUser({
        ...torusUser,
        addresses: [publicAddress]
      })
      // user.addresses = accounts
    } else {
      user = new User('other')
      // const accounts = await wallet.web3.currentProvider.request({
      //   method: 'eth_accounts'
      // })
      // console.log(`meta: accounts: ${JSON.stringify(accounts, null, 2)}`)
      // Check for 3box here?
      // user = {
      //   addresses: [publicAddress]
      // }
      console.log(`debug: publicAddress ---> : ${publicAddress}`)
      user.addWalletAddress(publicAddress)
      // user = {
      //   profileImage:
      //     'https://lh3.googleusercontent.com/a-/AOh14Ggo5BQVYb9izvbN0SaLtxSP220nntDwO0SLtZVa3g=s96-c',
      //   name: 'James Farrell',
      //   email: 'jamespfarrell@gmail.com',
      //   verifierId: 'jamespfarrell@gmail.com',
      //   verifier: 'google',
      //   typeOfLogin: 'google',
      //   addresses: [publicAddress],
      //   userIDFromDB: '4',
      //   profile: {
      //     id: '4',
      //     firstName: null,
      //     lastName: null,
      //     name: 'James Farrell',
      //     email: 'jamespfarrell@gmail.com',
      //     avatar:
      //       'https://lh3.googleusercontent.com/a-/AOh14Ggo5BQVYb9izvbN0SaLtxSP220nntDwO0SLtZVa3g=s96-c',
      //     url: null,
      //     location: null,
      //     __typename: 'User'
      //   }
      // }
    }

    console.log(`debug: publicAddress ---> : ${publicAddress}`)
    const signedMessage = await signMessage('our_secret', publicAddress)

    console.log(`debug: signedMessage ---> : ${signedMessage}`)

    const { userIDFromDB, token, dbUser } = await getToken(user, signedMessage)
    user.parseDbUser(dbUser)

    console.log(
      `debug: { userIDFromDB, token } : ${JSON.stringify(
        { userIDFromDB, token },
        null,
        2
      )}`
    )

    user.setUserId(userIDFromDB)
    user.setToken(token)

    Auth.setUser(user)
    console.log('debug: setting logged in')
    console.log(`user : ${JSON.stringify(user, null, 2)}`)
    setIsLoggedIn(true)
    setUser(user)
  }

  async function login({ walletProvider = DEFAULT_WALLET }) {
    wallet = getWallet(walletProvider)
    if (walletProvider !== DEFAULT_WALLET) await initWallet()
    console.log(`torus: login WalletProvider.login`, {
      wallet,
      walletProvider
    })
    console.log(
      `torus: login  wallet.torus is loaded : ${typeof wallet.torus === true}`
    )
    setLoading(true)
    // console.log(`walletProvider: wallet : ${JSON.stringify(wallet, null, 2)}`)

    console.log(`jpf wallet.isLoggedIn() ---> : ${wallet.isLoggedIn()}`)
    if (!wallet.isLoggedIn()) {
      await wallet.login()
    }
    wallet.web3.eth.getAccounts().then(updateUser)

    setLoading(false)
  }

  function isWalletAddressValid(address) {
    if (address.length !== 42 || !Web3.utils.isAddress(address)) {
      return false
    } else {
      return true
    }
  }

  function isAddressENS(address) {
    console.log(
      `isAddressENS ---> : ${address.toLowerCase().indexOf('.eth') > -1}`
    )
    return address.toLowerCase().indexOf('.eth') > -1
  }

  async function getAddressFromENS(address) {
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
      account,
      balance,
      isLoggedIn,
      updateUser,
      logout,
      user,
      network,
      isWalletAddressValid,
      isAddressENS,
      getAddressFromENS
    }
  }, [account, balance, isLoggedIn, user, network])
  //return <WalletContext.Provider value={value} {...props} />
  return (
    <WalletContext.Provider value={value} {...props}>
      {loading && <LoadingModal isOpen={loading} />}
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletProvider, useWallet }
