import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
  },
  initialize: async function (buildEnv) {
    const torus = new Torus()
    await torus.init({
      buildEnv: buildEnv || 'production',
      network: { host: 'rinkeby' }
    })
    await torus.login()
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
    sessionStorage.setItem('pageUsingTorus', buildEnv)
    return web3Obj
  }
  // initialize: async function (buildEnv) {
  //   const torus = new Torus()
  //   console.log('torus init')

  //   await torus.init({
  //     buildEnv: buildEnv || 'production',
  //     network: { host: 'rinkeby' }
  //   })
  //   console.log('torus login')
  //   await torus.login()
  //   console.log('torus post init')
  //   web3Obj.setweb3(torus.provider)
  //   web3Obj.torus = torus
  //   sessionStorage.setItem('pageUsingTorus', buildEnv)
  // }
}
export default web3Obj
