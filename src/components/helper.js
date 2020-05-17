import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'
import DirectWebSdk from '@toruslabs/torus-direct-web-sdk'

function getTorus (direct) {
  if (direct)
    return new DirectWebSdk({
      baseUrl: 'http://localhost:3000/serviceworker/',
      GOOGLE_CLIENT_ID: 'MY CLIENT ID GOOGLE',
      proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183', // details for test net
      network: 'ropsten' // details for test net
    })
  else return new Torus({ buttonPosition: 'top-right' })
}

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function (config) {
    const torus = getTorus(false)
    console.log(`config1 : ${JSON.stringify(config)}`)

    const buildEnv = config.buildEnv || 'production'
    const networkConfig = {}
    networkConfig.host = config.host

    if (config.chainId) networkConfig.chainId = config.chainId

    console.log(`networkConfig : ${JSON.stringify(networkConfig, null, 2)}`)

    await torus.init({
      buildEnv: buildEnv,
      network: networkConfig
    })
    await torus.login()
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
    sessionStorage.setItem('pageUsingTorus', buildEnv)
    const userInfo = await torus.getUserInfo()

    console.log(`userInfo : ${JSON.stringify(userInfo, null, 2)}`)

    const publicAddress = await torus.getPublicAddress({
      verifier: userInfo.verifier,
      verifierId: userInfo.email
    })

    console.log(`publicAddress ---> : ${publicAddress}`)
  }
}
export default web3Obj
