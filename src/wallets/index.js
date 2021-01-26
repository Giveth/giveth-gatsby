import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const wallets = {
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
    }
  }
}

export function getWallet (wallet) {
  return wallets[wallet]
}
