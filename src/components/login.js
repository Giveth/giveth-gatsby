import React, { useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import jwt from 'jsonwebtoken'
import {
  setUser,
  checkIfLoggedIn,
  setIsLoggedIn,
  getUser,
  handleLogout
} from '../services/auth'
import ApolloClient from 'apollo-boost'
import { gql, useMutation } from '@apollo/react-hooks'
import { DO_LOGIN, DO_REGISTER } from '../apollo/gql/auth'
import Web3 from 'web3'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

var web3 = new Web3(process.env.GATSBY_ETHEREUM_NODE)

console.log(
  `process.env.GOOGLE_CLIENT_ID ---> : ${process.env.GATSBY_GOOGLE_CLIENT_ID}`
)

const torus = new DirectWebSdk({
  baseUrl: process.env.GATSBY_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID,
  proxyContractAddress: process.env.GATSBY_PROXY_CONTRACT_ADDRESS,
  network: process.env.GATSBY_NETWORK,
  enableLogging: process.env.TORUS_DEBUG_LOGGING
})

async function initTorus () {
  await torus.init()
}

const Login = () => {
  const [doLogin] = useMutation(DO_LOGIN)
  const [doRegister] = useMutation(DO_REGISTER)
  let user = getUser()

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())

  // const [user, setUser] = useState({})
  const [balance, setBalance] = useState(0)

  function logout () {
    handleLogout()
    setIsLoggedIn(false)
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

    setBalance(0)

    const signedMessage = await web3.eth.accounts.sign(
      'our_secret',
      user.privateKey
    )
    try {
      const loginResonse = await doLogin({
        variables: {
          walletAddress: user.publicAddress,
          signature: signedMessage.signature,
          email: user.email
        }
      })

      const token = jwt.verify(
        loginResonse.data.loginWallet.token,
        process.env.GATSBY_JWT_SECRET
      )
      // console.log(`token : ${JSON.stringify(token, null, 2)}`)
    } catch (error) {
      console.log(`error : ${JSON.stringify(error, null, 2)}`)
    }

    //web3.eth.getBalance(user.publicAddress).then(setBalance)
  }

  if (!isLoggedIn) {
    return <LoginButton login={login} />
  } else {
    return <UserDetails logout={logout} user={user} balance={balance} />
  }
}
export default Login
