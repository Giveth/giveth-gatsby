import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import LoadingModal from '../components/loadingModal'
import * as Auth from '../services/auth'

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
  if (torus && !isInitialized) {
    await torus.init({
      network: { host: process.env.GATSBY_NETWORK },
      // buildEnv: process.env.NODE_ENV,
      showTorusButton: false,
      enableLogging: process.env.TORUS_DEBUG_LOGGING
    })
    web3 = new Web3(torus.provider)
    isInitialized = true
  }
}

const TorusProvider = props => {
  let user = Auth.getUser()

  const [isLoggedIn, setIsLoggedIn] = useState(Auth.checkIfLoggedIn())
  const [balance, setBalance] = useState(0)
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

  function loadTorus () {
    if (!torusLoaded && !torusIsLoading && window?.Torus) {
      torusIsLoading = true
      torus = new window.Torus()
      torusLoaded = true
      torusIsLoading = false
      initTorus()
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

  async function login () {
    try {
      if (!torusLoaded) {
        torusNotLoadedMessage()
        return
      }

      if (!isLoggedIn) {
        setLoading(true)
        await initTorus()
        const addresses = await torus.login()
        if (addresses.length > 0) {
          user = await torus.getUserInfo()
          user.addresses = addresses
          Auth.setUser(user)
          setIsLoggedIn(true)
        }
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  async function signMessage (message) {
    try {
      setLoading(true)

      if (!torusLoaded) {
        await initTorus()
      }
      let signedMessage = null

      if (isLoggedIn) {
        signedMessage = await web3.eth.personal.sign(
          message,
          user.addresses[0],
          ''
        )
      }
      setLoading(false)
      return signedMessage
    } catch (error) {
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
      {loading && <LoadingModal isOpen={loading} />}
      {props.children}
    </torusContext.Provider>
  )
}

export const TorusConsumer = torusContext.Consumer
export const TorusContext = torusContext
export default TorusProvider
