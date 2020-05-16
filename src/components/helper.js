import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function (config) {
    const torus = new Torus()
    console.log(`config : ${JSON.stringify(config)}`)

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
  }
}
export default web3Obj
