import React, { useState } from 'react'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'
// const Web3 = Loadable(() => import('web3'))

// // import Web3 from 'web3'
// const web3 = new Web3(process.env.GATSBY_ETHEREUM_NODE)
console.log(
  `process.env.GOOGLE_CLIENT_ID ---> : ${process.env.GATSBY_GOOGLE_CLIENT_ID}`
)
const torus = new DirectWebSdk({
  baseUrl: process.env.GATSBY_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GATSBY_GOOGLE_CLIENT_ID,
  proxyContractAddress: process.env.GATSBY_PROXY_CONTRACT_ADDRESS,
  network: process.env.GATSBY_NETWORK,
  enableLogging: true
})

async function initTorus () {
  await torus.init()
}

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [balance, setBalance] = useState(0)

  async function login () {
    console.log('in login')

    await initTorus()

    const verifierName = process.env.GATSBY_VERIFIER_NAME
      ? process.env.GATSBY_VERIFIER_NAME
      : 'google-giveth2'

    const user = await torus.triggerLogin('google', verifierName)

    console.log(`user : ${JSON.stringify(user, null, 2)}`)
    setIsLoggedIn(true)
    setUser(user)
    setBalance(0)
    //web3.eth.getBalance(user.publicAddress).then(setBalance)
  }
  //#492657
  //#C2459F
  const buttonStyle = {
    background: '#C2459F',
    backgroundImage: 'linear-gradient(to bottom, #C2459F, #492657)',
    borderRadius: '20px',
    color: '#FFFFFF',
    fontSize: '20px',
    fontWeight: '100',
    padding: '20px',
    boxShadow: '1px 1px 20px 0px #000000',
    textShadow: '1px 1px 20px #000000',
    border: 'solid #492657 1px',
    cursor: 'pointer',
    textAlign: 'center',
    position: 'absolute',
    right: '20px',
    top: '40px'
  }

  // .BUTTON_SEL:hover {
  //    border: solid #337FED 1px;
  //    background: #1E62D0;
  //    background-image: -webkit-linear-gradient(top, #1E62D0, #3D94F6);
  //    background-image: -moz-linear-gradient(top, #1E62D0, #3D94F6);
  //    background-image: -ms-linear-gradient(top, #1E62D0, #3D94F6);
  //    background-image: -o-linear-gradient(top, #1E62D0, #3D94F6);
  //    background-image: linear-gradient(to bottom, #1E62D0, #3D94F6);
  //    -webkit-border-radius: 20px;
  //    -moz-border-radius: 20px;
  //    border-radius: 20px;
  //    text-decoration: none;
  // }
  const LoginButton = () => (
    <button style={buttonStyle} onClick={login}>
      Log in
    </button>
  )

  const UserDetails = () => (
    <div
      style={{
        position: 'absolute',
        right: '20px',
        top: '20px',
        color: 'white'
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridGap: 4,
          gridTemplateColumns: ['auto', '1fr 256px']
        }}
      >
        <main>
          {user.publicAddress}
          <p>Your balance:{balance}</p>
        </main>
        <aside>
          <img style={{ width: '50px' }} src={user.profileImage} />
        </aside>
      </div>
      {/* <p
        style={{
          width: '250px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'white'
        }}
      >
        {user.publicAddress}
      </p>
      <p>Your balance:{balance}</p>
      <img style={{ width: '50px' }} src={user.profileImage} /> */}
    </div>
  )

  if (!isLoggedIn) {
    return <LoginButton />
  } else {
    return <UserDetails />
  }
}
export default Login
