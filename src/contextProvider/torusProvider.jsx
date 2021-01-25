import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import { keccak256 } from 'ethers/lib/utils'
import { promisify } from 'util'
import LoadingModal from '../components/loadingModal'
import * as Auth from '../services/auth'
import { alert } from '@ungap/global-this'
import web3Obj from '../providers/torus'

const TORUS_POLLING_DELAY = 100
const BALANCE_POLLING_DELAY = 2000

let torus
let web3
let isInitialized = false
let torusLoaded = false
let torusIsLoading = false
let torusPolling
let balancePolling

const torusContext = React.createContext({})

async function initTorus () {
  console.log(`torus ---> : ${torus}`)
  console.log(`isInitialized ---> : ${isInitialized}`)
  console.log(`window.Torus() ---> : ${window.Torus}`)
  if (torus && !isInitialized) {
    console.log('initing torus')
    const torInit = await torus.init({
      network: { host: process.env.GATSBY_NETWORK },
      // buildEnv: process.env.NODE_ENV,
      showTorusButton: false,
      enableLogging: process.env.TORUS_DEBUG_LOGGING
    })
    console.log('torInit', JSON.stringify(torInit))

    web3 = new Web3(torus.provider)
    isInitialized = true
  }
  console.log('end init torus')
  return true
}

// async function getWeb3 () {
//   console.log('getting web 3')
//   if (web3) return web3
//   else {
//     await initTorus()
//     if (web3) return web3
//     else {
//       throw new Error('This shouldnt happpend fetching web3')
//     }
//   }
// }

const TorusProvider = props => {
  const [account, setAccount] = useState({})
  const [balance, setBalance] = useState(0)

  function setStateInfo () {
    web3Obj.web3.eth.getAccounts().then(accounts => {
      setAccount({ account: accounts[0] })
      web3Obj.web3.eth.getBalance(accounts[0]).then(balance => {
        setBalance({ balance: balance })
      })
    })
  }
  useEffect(() => {
    const isTorus = sessionStorage.getItem('pageUsingTorus')
    web3Obj.initialize(isTorus).then(() => {
      setStateInfo()
    })
  })
  let user = Auth.getUser()

  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())
  // const [balance, setBalance] = useState(0)
  const [network, setNetwork] = useState('')
  const [loading, setLoading] = useState(false)
  function updateBalance () {
    if (web3 && user?.addresses && isLoggedIn) {
      web3.eth
        .getBalance(user?.addresses[0])
        .then(result => setBalance(Number(Web3.utils.fromWei(result))))
      getNetwork()
    }
  }

  function fetchBalance () {
    updateBalance()

    if (balancePolling) {
      clearInterval(balancePolling)
      balancePolling = 0
    }

    if (isLoggedIn) {
      balancePolling = setInterval(() => {
        updateBalance()
      }, BALANCE_POLLING_DELAY)
    }
  }

  async function getNetwork () {
    web3.eth.net.getNetworkType((_, net) => setNetwork(net))
  }

  const torusNotLoadedMessage = () => console.log('torus is not loaded')

  async function loadTorus () {
    console.log(`torusLoaded ---> : ${torusLoaded}`)
    console.log(`torusIsLoading ---> : ${torusIsLoading}`)
    console.log(`window?.Torus ---> : ${window?.Torus}`)
    if (!torusLoaded && !torusIsLoading && window?.Torus) {
      torusIsLoading = true
      torus = new window.Torus()
      torusLoaded = true
      torusIsLoading = false
      console.log('James - init torus 3')
      await initTorus()
    }
  }

  useEffect(() => {
    if (window?.Torus) {
      loadTorus()
    } else {
      torusPolling = setInterval(() => {
        if (!torusLoaded && window?.Torus) {
          loadTorus()
        } else if (torusLoaded) {
          if (torusPolling) {
            clearInterval(torusPolling)
            torusPolling = 0
          }
        }
      }, TORUS_POLLING_DELAY)

      fetchBalance()
    }

    return function cleanUp () {
      if (torusPolling) {
        clearInterval(torusPolling)
      }
      if (balancePolling) {
        clearInterval(balancePolling)
      }
    }
  }, [])

  useEffect(() => {
    fetchBalance()
  }, [isLoggedIn])

  async function logout () {
    try {
      setLoading(true)
      if (torusLoaded) {
        if (isLoggedIn) {
          try {
            await torus.logout()
          } catch (e) {
            console.error(e)
          }
        }
      } else {
        torusNotLoadedMessage()
      }
      Auth.handleLogout()
      setIsLoggedIn(false)
      if (balancePolling) {
        clearInterval(balancePolling)
        balancePolling = 0
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  //Like initialize
  async function login () {
    console.log('in login')
    try {
      if (!torusLoaded) {
        torusNotLoadedMessage()
        return
      }

      console.log('james is loged in', isLoggedIn)
      if (!isLoggedIn) {
        console.log('james - before loading')
        setLoading(true)
        console.log('james - initTorus 1 after loading')
        await initTorus()
        console.log('james - after inti torus')

        try {
          const addresses = await torus.login()
          if (addresses.length > 0) {
            user = await torus.getUserInfo()
            user.addresses = addresses
            Auth.setUser(user)
            setIsLoggedIn(true)
          }
          setLoading(false)
        } catch (error) {
          alert('errrorrro', error)
        }
      }
    } catch (error) {
      alert('Error', error)
      setLoading(false)
    }
  }

  async function signMessage (message) {
    console.log('In sign Message')

    try {
      setLoading(true)

      console.log(`iii torusLoaded ---> : ${torusLoaded}`)
      if (!torusLoaded) {
        console.log('James - initTorus2')
        await loadTorus()
      }
      let signedMessage = null

      console.log(`signMessage > isLoggedIn ---> : ${isLoggedIn}`)
      if (isLoggedIn) {
        const publicAddress = Web3.utils.toChecksumAddress(user.addresses[0])
        const customPrefix = `\u0019${window.location.hostname} Signed Message:\n`
        const prefixWithLength = Buffer.from(
          `${customPrefix}${message.length.toString()}`,
          'utf-8'
        )
        const finalMessage = Buffer.concat([
          prefixWithLength,
          Buffer.from(message)
        ])
        console.log(`finalMessage ---> : ${finalMessage}`)
        const hashedMsg = keccak256(finalMessage)
        //const web3 = await getWeb3()
        console.log(`web3 1 ---> : ${web3}`)
        console.log(`typeof loadTorus ---> : ${typeof loadTorus}`)
        if (!web3) await loadTorus()()
        console.log(`web3 2 ---> : ${web3}`)
        const send = promisify(web3.currentProvider.send)
        console.log('Doing ethsign with:')
        console.log(`publicAddress ---> : ${publicAddress}`)
        console.log(`hashedMsg ---> : ${hashedMsg}`)
        console.log(`publicAddress ---> : ${publicAddress}`)
        console.log(
          `{ customPrefix, customMessage: message } : ${JSON.stringify(
            { customPrefix, customMessage: message },
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
        console.log(`Signed Mesage = result ---> : ${result}`)
        signedMessage = result
      }
      setLoading(false)
      return signedMessage
    } catch (error) {
      console.log('Signing Error!', error)

      setLoading(false)
    }
  }

  return (
    <torusContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        balance,
        user,
        signMessage,
        network,
        web3
      }}
    >
      <h1>TorusContextProvider</h1>
      {loading && <LoadingModal isOpen={loading} />}
      {props.children}
    </torusContext.Provider>
  )
}

export const TorusConsumer = torusContext.Consumer
export const TorusContext = torusContext
export default TorusProvider
