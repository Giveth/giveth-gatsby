import { ethers } from 'ethers'
import getSigner from './ethersSigner'

export async function send (
  toAddress,
  subtotal,
  fromOwnProvider,
  isLoggedIn,
  sendTransaction,
  provider
) {
  const transaction = {
    to: toAddress,
    value: ethers.utils.parseEther(subtotal.toString())
  }
  let hash

  if (fromOwnProvider && isLoggedIn) {
    const start = Date.now()
    const regularTransaction = await sendTransaction(transaction)

    hash = regularTransaction?.transactionHash
  } else {
    const signer = getSigner(provider)
    const signerTransaction = signer.sendTransaction(transaction)

    hash = signerTransaction?.hash
  }
  if (!hash) throw new Error('Transaction failed')

  return hash
}

export function notify (hash) {
  if (process.env.GATSBY_NETWORK === 'ropsten') return

  notify.config({ desktopPosition: 'topRight' })
  const { emitter } = notify.hash(hash)

  emitter.on('txPool', transaction => {
    return {
      // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
      // or you could use onclick for when someone clicks on the notification itself
      onclick: () => window.open(`https://etherscan.io/tx/${transaction.hash}`)
    }
  })

  emitter.on('txSent', console.log)
  emitter.on('txConfirmed', console.log)
  emitter.on('txSpeedUp', console.log)
  emitter.on('txCancel', console.log)
  emitter.on('txFailed', console.log)

  emitter.on('all', event => {
    console.log('ALLLLLLL', event)
  })
}
