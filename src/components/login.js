import React, { useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import {
  setUser,
  checkIfLoggedIn,
  setIsLoggedIn,
  getUser,
  handleLogout
} from '../services/auth'
import ApolloClient from 'apollo-boost'
import Web3 from 'web3'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

var web3 = new Web3(process.env.GATSBY_ETHEREUM_NODE)

const torus = new DirectWebSdk({
  baseUrl: process.env.GATSBY_BASE_URL + '/serviceworker/',
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID,
  proxyContractAddress: process.env.GATSBY_PROXY_CONTRACT_ADDRESS,
  network: process.env.GATSBY_NETWORK,
  enableLogging: process.env.TORUS_DEBUG_LOGGING
})

async function initTorus () {
  await torus.init()
}

const Login = props => {
  let user = getUser()

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())

  // const [user, setUser] = useState({})

  function logout () {
    handleLogout()
    setIsLoggedIn(false)
    window.location = process.env.GATSBY_BASE_URL
  }

  async function login () {
    await initTorus()

    const verifierName = process.env.GATSBY_VERIFIER_NAME
      ? process.env.GATSBY_VERIFIER_NAME
      : 'google-giveth2'

    if (!isLoggedIn) {
      user = await torus.triggerLogin('google', verifierName)
      setUser(user)
      setIsLoggedIn(true)
    }

    const signedMessage = await web3.eth.accounts.sign(
      'our_secret',
      user.privateKey
    )
    await props.onLogin(signedMessage, user.publicAddress, user.email)
  }

  if (!isLoggedIn) {
    return <LoginButton login={login} />
  } else {
    return <UserDetails logout={logout} user={user} balance={props.balance} />
  }
}
export default Login
