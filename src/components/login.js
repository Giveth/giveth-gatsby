import React from "react"
import DirectWebSdk from "@toruslabs/torus-direct-web-sdk"

console.log(
  `process.env.GOOGLE_CLIENT_ID ---> : ${process.env.GATSBY_GOOGLE_CLIENT_ID}`
)
const torus = new DirectWebSdk({
  baseUrl: process.env.GATSBY_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID,
  proxyContractAddress: process.env.GATSBY_PROXY_CONTRACT_ADDRESS,
  network: process.env.GATSBY_NETWORK,
  enableLogging: true,
})

async function initTorus() {
  await torus.init()
}

async function login() {
  console.log("in login")

  await initTorus()

  const userInfo = await torus.triggerLogin("google", "google-giveth")

  console.log(`userInfo : ${JSON.stringify(userInfo, null, 2)}`)
}

const Login = () => (
  <button style={{ right: 0, position: "absolute" }} onClick={login}>
    Log in with tor.us
  </button>
)

export default Login
