import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'
import detectEthereumProvider from '@metamask/detect-provider'

const metamask = {
  isInitialized: false,
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    metamask.web3 = web3Inst
    metamask.isInitialized = true
  },
  init: async (buildEnv, network) => {
    const provider = await detectEthereumProvider()
    if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?')
      }
      metamask.setweb3(provider)
    } else {
      console.error('MetaMask! not installed, should have fallen back to Torus')
    }
  },
  login: async () => {
    console.log(`jpf: metamask.isInitialized ---> : ${metamask.isInitialized}`)
    if (!metamask.isInitialized) {
      console.log('Not initialized yet')
      console.log(
        `typeof this.init : ${JSON.stringify(typeof this.init, null, 2)}`
      )
    }

    await metamask.init()
    metamask.web3.eth.personal.sign(
      metamask.web3.utils.fromUtf8('Hello from Giveth'),
      '0x514eD72f1396107EB2d280F26B88d460836946C0',
      console.log
    )

    return true
  },
  logout: async () => {
    //No need to logout of Torus it happens automatically when the user closes the window
    // wallet.torus.logout()
  },
  isLoggedIn: () => {
    return false
  }
}
const wallets = {
  metamask,
  torus: {
    setweb3: function (provider) {
      const web3Inst = new Web3(provider)
      wallets.torus.web3 = web3Inst
    },
    init: async (buildEnv, network) => {
      const torus = new Torus()
      await torus.init({
        buildEnv: buildEnv || 'production',
        network: { host: network },
        showTorusButton: false,
        whiteLabel: true
      })
      //await torus.login()

      wallets.torus.torus = torus
      wallets.torus.setweb3(torus.provider)
    },
    login: async () => {
      await wallets.torus.torus.login()
      return wallets.torus.torus
    },
    logout: async () => {
      //No need to logout of Torus it happens automatically when the user closes the window
      // wallet.torus.logout()
    },
    isLoggedIn: () => {
      return wallets.torus.isLoggedIn
    }
  }
}

export function getWallet (wallet) {
  return wallets[wallet]
}
