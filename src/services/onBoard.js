import Notify from 'bnc-notify'
import Onboard from 'bnc-onboard'

const networkId = process.env.GATSBY_NETWORK_ID
const rpcUrl = process.env.GATSBY_ETHEREUM_NODE
const dappId = process.env.BLOCK_NATIVE_DAPP_ID
const portisKey = process.env.GATSBY_PORTIS_KEY
export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: false,
    networkId: parseInt(networkId),
    // darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        { walletName: 'torus' },
        {
          walletName: 'portis',
          apiKey: portisKey
        },
        {
          walletName: 'trezor',
          appUrl: 'https://giveth.io/',
          // email: 'mail@mail.com',
          rpcUrl
        },
        {
          walletName: 'lattice',
          appName: 'Giveth 2.0',
          rpcUrl
        },
        {
          walletName: 'ledger',
          rpcUrl
        },
        { walletName: 'dapper' },
        { walletName: 'coinbase' },
        { walletName: 'status' },
        // { walletName: 'walletLink', rpcUrl },
        // { walletName: 'fortmatic', apiKey: 'pk_test_886ADCAB855632AA' },
        { walletName: 'unilogin' },
        // { walletName: 'squarelink', apiKey: '87288b677f8cfb09a986' },
        { walletName: 'authereum', disableNotifications: true },
        // { walletName: 'trust', rpcUrl },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: 'd5e29c9b9a9d4116a7348113f57770a8'
        // },
        { walletName: 'opera' },
        { walletName: 'operaTouch' },
        { walletName: 'imToken', rpcUrl },
        { walletName: 'meetone' },
        { walletName: 'mykey' },
        { walletName: 'wallet.io', rpcUrl }
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
      { checkName: 'balance', minimumBalance: '100000' }
    ]
  })
}

export function initNotify() {
  return Notify({
    dappId,
    networkId: parseInt(networkId)
  })
}
