import React, { useContext, useState } from "react"
import {TorusContext} from "../contextProvider/torusProvider"
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
import {
  setUser,
  checkIfLoggedIn,
  getUser,
  handleLogout
} from '../services/auth'
import Web3 from 'web3'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

const web3 = new Web3(process.env.GATSBY_ETHEREUM_NODE)

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
  const {isLoggedIn, login, logout, user, balance} = useContext(TorusContext);
  if (!isLoggedIn) {
    return <LoginButton login={login} />
  } else {
    return <UserDetails logout={logout} user={user} balance={balance} />
  }
}
export default Login
