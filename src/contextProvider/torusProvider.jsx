import React, { useState } from 'react'
import Torus from '@toruslabs/torus-embed'
import Web3 from 'web3'
import {
  checkIfLoggedIn,
  getUser,
  handleLogout,
  setUser
} from '../services/auth'

const torus = new Torus()

let web3
let isInitialized = false

const torusContext = React.createContext({})

async function initTorus () {
  if (!isInitialized) {
    await torus.init({
      network: { host: process.env.GATSBY_NETWORK },
      // buildEnv: process.env.NODE_ENV,
      showTorusButton: false,
      enableLogging: process.env.TORUS_DEBUG_LOGGING
    })
    isInitialized = true
  }
}

const TorusProvider = props => {
  let user = getUser()

  function updateBalance () {
    if (web3 && user?.addresses) {
      web3.eth
        .getBalance(user?.addresses[0])
        .then(result => setBalance(Number(Web3.utils.fromWei(result))))
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())
  const [balance, setBalance] = useState(0)

  updateBalance()

  async function logout () {
    await torus.logout()
    handleLogout()
    setIsLoggedIn(false)
    window.location = process.env.GATSBY_BASE_URL
  }

  async function login () {
    if (!isLoggedIn) {
      await initTorus()
      const addresses = await torus.login()
      if (addresses.length > 0) {
        web3 = new Web3(torus.provider)
        user = await torus.getUserInfo()
        user.addresses = addresses
        console.log(JSON.stringify(user, null, 2))
        setUser(user)
        setIsLoggedIn(true)
        updateBalance()
        const signedMessage = await web3.eth.personal.sign(
          'our_secret',
          user.addresses[0],
          ''
        )
        // const signedMessage = ''
        await props.onLogin(signedMessage, user?.addresses[0], user?.email)
      }
    }
  }

  return (
    <torusContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        balance,
        user
      }}
    >
      {props.children}
    </torusContext.Provider>
  )
}

export const TorusConsumer = torusContext.Consumer
export const TorusContext = torusContext
export default TorusProvider
