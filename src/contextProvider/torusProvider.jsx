import React, { useState } from "react"
import DirectWebSdk from "@toruslabs/torus-direct-web-sdk"
import Web3 from "web3"
import { checkIfLoggedIn, getUser, handleLogout, setUser } from "../services/auth"
// import LoginButton from "../components/torus/loginButton"
// import UserDetails from "../components/torus/userDetails"

const torus = new DirectWebSdk({
  baseUrl: process.env.GATSBY_BASE_URL + "/serviceworker/",
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID,
  proxyContractAddress: process.env.GATSBY_PROXY_CONTRACT_ADDRESS,
  network: process.env.GATSBY_NETWORK,
  enableLogging: process.env.TORUS_DEBUG_LOGGING
})

// TODO: use torus builtin provider
const web3 = new Web3(process.env.GATSBY_ETHEREUM_NODE)

const torusContext = React.createContext({})

async function initTorus() {
  await torus.init()
}


const TorusProvider = props => {
  let user = getUser()

  const { publicAddress, email } = user

  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())
  const [balance, setBalance] = useState(0)

  if (user && publicAddress) {
    web3.eth.getBalance(publicAddress).then(result => setBalance(Number(Web3.utils.fromWei(result))))
  }

  // const [user, setUser] = useState({})

  function logout() {
    handleLogout()
    setIsLoggedIn(false)
    window.location = process.env.GATSBY_BASE_URL
  }

  async function login() {
    await initTorus()

    const verifierName = process.env.GATSBY_VERIFIER_NAME
      ? process.env.GATSBY_VERIFIER_NAME
      : "google-giveth2"

    if (!isLoggedIn) {
      user = await torus.triggerLogin("google", verifierName)
      setUser(user)
      setIsLoggedIn(true)
    }

    const signedMessage = await web3.eth.accounts.sign(
      "our_secret",
      user.privateKey
    )
    await props.onLogin(signedMessage, publicAddress, email)
  }

  // if (isLoggedIn) {
  //   initTorus().then(() => {
  //     web3.eth.getBalance(user.publicAddress).then(result => setBalance(Number(web3.utils.fromWei(result))))
  //   })
  // }
  return (
    <torusContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      balance,
      user
    }}>
      {props.children}
    </torusContext.Provider>
  )
}

export const TorusConsumer = torusContext.Consumer
export const TorusContext = torusContext
export default TorusProvider