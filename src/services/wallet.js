import Web3 from 'web3'
import React from 'react'

// import dynamic from 'next/dynamic'
import { getWallet } from '../wallets'

// const getWallet = dynamic(() => import('../wallets').then(md => md.getWallet), {
//   ssr: false
// })

export function isAddressENS(address) {
  return address.toLowerCase().indexOf('.eth') > -1
}
export function isWalletAddressValid(address) {
  if (address.length !== 42 || !Web3.utils.isAddress(address)) {
    return false
  } else {
    return true
  }
}
export async function getAddressFromENS(address) {
  const wallet = await getWallet('torus')
  await wallet.init()
  const ens = await wallet.web3.eth.ens.getOwner(address)

  let zeroXAddress
  if (ens !== '0x0000000000000000000000000000000000000000') {
    zeroXAddress = ens
  } else {
    zeroXAddress = address
  }

  if (isWalletAddressValid(zeroXAddress)) {
    return zeroXAddress
  } else {
    return new Error('Error gettingAddressFromENS')
  }
}
