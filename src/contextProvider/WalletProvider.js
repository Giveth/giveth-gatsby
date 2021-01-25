import React, { useState, useEffect } from 'react'
// import web3Obj from '../providers/torus'
import Web3 from 'web3'
import { keccak256 } from 'ethers/lib/utils'
import { promisify } from 'util'
import * as Auth from '../services/auth'
import Torus from '@toruslabs/torus-embed'
import LoadingModal from '../components/loadingModal'
import { getToken } from '../services/token'
const WalletContext = React.createContext()
const network = 'rinkeby'

const wallet = {
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    wallet.web3 = web3Inst
    console.log(`torus: setweb3 wallet.web3 ---> : ${wallet.web3}`)
  },
  init: async buildEnv => {
    const torus = new Torus()
    await torus.init({
      buildEnv: buildEnv || 'production',
      network: { host: network },
      showTorusButton: false,
      whiteLabel: true
    })
    //await torus.login()

    wallet.torus = torus
    wallet.setweb3(torus.provider)
    console.log(`torus: login wallet.torus is inited`)

    console.log(
      `torus: ! wallet.torus.isLoggedIn ---> : ${wallet.torus.isLoggedIn}`
    )
  },
  login: async () => {
    console.log('torus: Logging into Torus')
    await wallet.torus.login()
    return wallet.torus
  },
  logout: async () => {
    // wallet.torus.logout()
  }
}

function useWallet () {
  const context = React.useContext(WalletContext)
  if (!context) {
    throw new Error(`userWallet must be used within a WalletProvider`)
  }
  return context
}
const jamesOut = true
function WalletProvider (props) {
  const jamesIn = true
  const [account, setAccount] = useState('')
  //const [wallet, setWallet] = useState(web3Obj)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(Auth.getUser())
  const [network, setNetwork] = useState(network)
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())

  useEffect(() => {
    console.log(`torus: login wallet.init`)

    wallet.init('production')
  }, [])

  /*useEffect(() => {
    console.log('Do init')

    const initWallet = async () => {
      const walletObj = await web3Obj.initialize('development')
      console.log(
        `torus -> It has been initialised : ${JSON.stringify(
          walletObj.torus,
          null,
          2
        )}`
      )
      //setWallet(walletObj)
    }
    initWallet()
  }, [])*/

  function getWeb3 () {
    if (!wallet.web3) throw new Error('Web 3 not loaded yet')
    return wallet.web3
  }
  function getNetwork () {
    wallet.web3.eth.net.getNetworkType((_, net) => setNetwork(net))
  }

  async function logout () {
    setLoading(true)

    if (wallet.torus.isLoggedIn) {
      console.log('torus: Logging out')

      // await wallet.logout()
    }

    Auth.handleLogout()
    setIsLoggedIn(false)
    // if (balancePolling) {
    //   clearInterval(balancePolling)
    //   balancePolling = 0
    // }
    setLoading(false)
  }

  async function signMessage (message) {
    try {
      let signedMessage = null

      const publicAddress = wallet.web3.utils.toChecksumAddress(
        user.addresses[0]
      )
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
      const send = promisify(wallet.web3.currentProvider.send)

      console.log(
        `message sending : ${JSON.stringify(
          [publicAddress, hashedMsg, { customPrefix, customMessage: message }],
          null,
          2
        )}`
      )

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

  async function updateUser (accounts) {
    console.log(`Updating User`)
    setAccount(accounts[0])
    const balance = await wallet.web3.eth.getBalance(accounts[0])
    // .then(balance => {
    //   setBalance(balance)
    // })
    setBalance(balance)
    const user = await wallet.torus.getUserInfo()
    user.addresses = accounts

    const signedMessage = await signMessage('our_secret')
    const { userIDFromDB, token } = await getToken(user, signedMessage)
    user.userIDFromDB = userIDFromDB

    localStorage.setItem('token', token)
    Auth.setUser(user)
    setIsLoggedIn(true)
    setUser(user)
  }

  async function login () {
    console.log(`torus: login WalletProvider.login`)
    console.log(
      `torus: login  wallet.torus is loaded : ${typeof wallet.torus === true}`
    )

    setLoading(true)
    console.log(`wallet.torus.isLoggedIn ---> : ${wallet.torus.isLoggedIn}`)
    if (!wallet.torus.isLoggedIn) {
      await wallet.login()
    } else {
      const userInfo = await wallet.torus.getUserInfo()
    }
    wallet.web3.eth.getAccounts().then(updateUser)

    setLoading(false)
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
    console.log(`torus: useMemo wallet.web3 ---> : ${wallet.web3}`)
    return {
      login,
      account,
      balance,
      isLoggedIn,
      logout,
      user,
      balance,
      network,
      getWeb3,
      isWalletAddressValid,
      isAddressENS,
      getAddressFromENS
    }
  }, [account, balance, isLoggedIn, user, balance, network])
  //return <WalletContext.Provider value={value} {...props} />
  return (
    <WalletContext.Provider value={value} {...props}>
      {loading && <LoadingModal isOpen={loading} />}
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletProvider, useWallet }
