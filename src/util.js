import { formatUnits } from '@ethersproject/units'

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

const ETHERSCAN_PREFIXES = {
  1: 'etherscan.io/',
  3: 'ropsten.etherscan.io/',
  4: 'rinkeby.etherscan.io/address/',
  5: 'goerli.etherscan.io/address/',
  42: 'kovan.etherscan.io/address/',
  100: 'blockscout.com/poa/xdai/'
}

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {[number, string]} data
 */
export function formatEtherscanLink(type, data) {
  switch (type) {
    case 'Account': {
      const [chainId, address] = data
      return `https://${ETHERSCAN_PREFIXES[chainId]}address/${address}`
    }
    case 'Transaction': {
      const [chainId, hash] = data
      return `https://${ETHERSCAN_PREFIXES[chainId]}tx/${hash}`
    }
  }
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimals = 18, decimalsToDisplay = 3) =>
  Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay)
