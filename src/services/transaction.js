import { ethers } from 'ethers'
import Web3 from 'web3'
import getSigner from './ethersSigner'

export async function send(
  toAddress,
  contractAddress, // if none is set, it defaults to ETH
  subtotal,
  fromOwnProvider,
  isLoggedIn,
  sendTransaction,
  provider,
  txCallbacks
) {
  try {
    const transaction = {
      to: toAddress,
      value: ethers.utils.parseEther(subtotal.toString())
    }
    let hash

    if (fromOwnProvider && isLoggedIn) {
      const regularTransaction = await sendTransaction(
        transaction,
        txCallbacks,
        contractAddress
      )
      hash = regularTransaction?.transactionHash
    } else {
      const signer = getSigner(provider)
      const signerTransaction = await sendTransaction(
        transaction,
        txCallbacks,
        contractAddress,
        signer
      )

      hash = signerTransaction?.hash
    }
    if (!hash) throw new Error('Transaction failed')

    return hash
  } catch (error) {
    const err = new Error(error)
    err.data = error?.data || error
    throw err
  }
}

export function notify(hash) {
  if (process.env.NEXT_PUBLIC_NETWORK === 'ropsten') return

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
    console.log('ALL', event)
  })
}

export async function getHashInfo(txHash, isXDAI) {
  try {
    const web3 = new Web3(
      isXDAI
        ? process.env.NEXT_PUBLIC_XDAI_NODE_HTTP_URL
        : process.env.NEXT_PUBLIC_ETHEREUM_NODE
    )
    const txInfo = await web3.eth.getTransaction(txHash)
    console.log({ txInfo })
    return txInfo
  } catch (error) {
    console.log({ error })
    throw new Error(error)
  }
}

export async function getTxFromHash(transactionHash, isXDAI) {
  try {
    const web3 = new Web3(
      isXDAI
        ? process.env.NEXT_PUBLIC_XDAI_NODE_HTTP_URL
        : process.env.NEXT_PUBLIC_ETHEREUM_NODE
    )
    const tx = await web3.eth.getTransaction(transactionHash)
    return tx
  } catch (error) {
    return false
  }
}

export async function confirmEtherTransaction(
  transactionHash,
  callbackFunction,
  count = 0,
  isXDAI
) {
  const web3 = new Web3(
    isXDAI
      ? process.env.NEXT_PUBLIC_XDAI_NODE_HTTP_URL
      : process.env.NEXT_PUBLIC_ETHEREUM_NODE
  )
  const MAX_INTENTS = 20 // one every second
  web3.eth.getTransactionReceipt(transactionHash, function (err, receipt) {
    if (err) {
      throw Error(err)
    }

    if (receipt !== null) {
      // Transaction went through
      if (callbackFunction) {
        callbackFunction({ ...receipt, tooSlow: false })
      }
    } else if (count >= MAX_INTENTS) {
      callbackFunction({ tooSlow: true })
    } else {
      // Try again in 1 second
      setTimeout(function () {
        confirmEtherTransaction(
          transactionHash,
          callbackFunction,
          ++count,
          isXDAI
        )
      }, 1000)
    }
  })
}
