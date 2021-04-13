import fetch from 'isomorphic-fetch'
import { GET_PROJECT_BY_ADDRESS } from '../apollo/gql/projects'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import ERC20List from './erc20TokenList'
import Web3 from 'web3'

export function titleCase(str) {
  //hot fix
  return str
  if (!str) return null
  return str
    ?.toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}

export function base64ToBlob(base64) {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new Blob([bytes], { type: 'application/pdf' })
}

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export const getImageFile = async (base64Data, projectName) => {
  const imageFile = await fetch(base64Data)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], projectName)
    })
  return imageFile
}

export async function getEtherscanTxs(
  address,
  apolloClient = false,
  isDonor = false
) {
  try {
    const apiKey = process.env.GATSBY_ETHERSCAN_API_KEY
    const api = process.env.GATSBY_NETWORK_ID === '3' ? 'api-ropsten' : 'api'
    const balance = await fetch(
      `https://${api}.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(data => {
        return data?.result
      })

    return await fetch(
      `https://${api}.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    )
      .then(response => response.json())
      .then(async data => {
        const modified = []
        if (data?.status === '0' || typeof data?.result === 'string') {
          return {
            balance,
            txs: [],
            error: data?.result
          }
        }
        for (const t of data?.result) {
          const extra = apolloClient
            ? await apolloClient?.query({
                query: isDonor ? GET_USER_BY_ADDRESS : GET_PROJECT_BY_ADDRESS,
                constiables: {
                  address: isDonor
                    ? Web3.utils.toChecksumAddress(t?.from)
                    : Web3.utils.toChecksumAddress(t?.to)
                }
              })
            : null
          modified.push({
            ...t,
            extra: extra?.data || null,
            donor: t.from,
            createdAt: t.timeStamp,
            currency: 'ETH'
          })
        }
        return {
          balance,
          txs: modified
        }
      })
  } catch (error) {
    console.log({ error })
  }
}

export function ensRegex(ens) {
  return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(
    ens
  )
}

export function getEtherscanPrefix() {
  return typeof process.env.ETHEREUM_NETWORK !== 'undefined'
    ? process.env.ETHEREUM_NETWORK === 'mainnet'
      ? ''
      : process.env.ETHEREUM_NETWORK + '.'
    : ''
}

export const getERC20List = ERC20List

export async function checkIfURLisValid(checkUrl) {
  let url = checkUrl
  if (!/^(?:f|ht)tps?\:\/\//.test(checkUrl)) {
    url = 'https://' + url
  }
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!pattern.test(url)
}
