import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'
import detectEthereumProvider from '@metamask/detect-provider'

// TODO: SET wallet address to this link
const metamask = {
  isInitialized: false,
  supportLink: `https://etherscan.io/address/`,
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    metamask.web3 = web3Inst
    metamask.isInitialized = true
    console.log(`setweb3 provider : ${JSON.stringify(provider, null, 2)}`)

    metamask.provider = provider
  },
  enable: async () => window.ethereum.enable(),
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
    await metamask.enable()
    return true
  },
  logout: async () => {
    //No need to logout of Torus it happens automatically when the user closes the window
    // wallet.torus.logout()
  },
  isLoggedIn: () => {
    return false
  },
  isTorus: false,
  type: 'metamask'
}
export const wallets = {
  metamask,
  torus: {
    type: 'torus',
    isTorus: true,
    supportLink: 'https://app.tor.us',
    setweb3: function (provider) {
      const web3Inst = new Web3(provider)
      wallets.torus.web3 = web3Inst
    },
    init: async (buildEnv, network) => {
      if (wallets?.torus?.torus?.isInitialized) return true
      const torus = new Torus()
      await torus.init({
        buildEnv: buildEnv || 'production',
        network: { host: network },
        showTorusButton: false,
        whiteLabel: true,
        paymentProviders: {
          moonpay: {
            minOrderValue: 24.99,
            maxOrderValue: 2000,
            validCurrencies: ['USD', 'EUR', 'GBP'],
            validCryptoCurrencies: ['ETH', 'DAI', 'TUSD', 'USDC', 'USDT']
          },
          wyre: {
            minOrderValue: 20,
            maxOrderValue: 250,
            validCurrencies: ['USD'],
            validCryptoCurrencies: ['ETH', 'DAI', 'USDC']
          },
          rampnetwork: {
            minOrderValue: 1,
            maxOrderValue: 10000,
            validCurrencies: ['GBP', 'EUR'],
            validCryptoCurrencies: ['ETH', 'DAI', 'USDC']
          }
        }
      })
      //await torus.login()
      wallets.torus.torus = torus
      wallets.torus.setweb3(torus.provider)
      wallets.torus.provider = torus.provider
    },
    login: async () => {
      console.log(
        ` typeof wallets.torus.torus : ${JSON.stringify(
          typeof wallets.torus.torus,
          null,
          2
        )}`
      )

      await wallets.torus.torus.login()
      return wallets.torus.torus
    },
    logout: async () => {
      try {
        wallets.torus.torus.logout()
      } catch (error) {
        console.log({ error })
      }
    },
    isLoggedIn: () => {
      return wallets.torus.torus.isLoggedIn
    }
  }
}

export function getWallet (wallet) {
  return wallets[wallet]
}
