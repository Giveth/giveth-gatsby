import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
import { client } from '../../apollo/client'
import {
  getAddressFromENS,
  isWalletAddressValid,
  isAddressENS
} from '../../services/wallet'
import Web3 from 'web3'
import { ethers } from 'ethers'

const infuraId = process.env.NEXT_INFURA_ID
const network = process.env.NEXT_NETWORK
const provider = new ethers.providers.InfuraProvider(network, infuraId)

export async function getProjectWallet(projectWalletAddress) {
  if (projectWalletAddress) {
    try {
      const isENS = await isAddressENS(projectWalletAddress)
      if (!isWalletAddressValid(projectWalletAddress) && !isENS) {
        throw new Error('Wallet address is invalid')
      }

      projectWalletAddress = isENS
        ? await getAddressFromENS(projectWalletAddress)
        : projectWalletAddress
    } catch (error) {
      console.log({ error })
      throw new Error(`Error while validating wallet - ${projectWalletAddress}`)
    }
  }
  return projectWalletAddress
}

export async function projectWalletAlreadyUsed(projectWalletAddress) {
  const res = await client.query({
    query: GET_PROJECT_BY_ADDRESS,
    variables: {
      address: projectWalletAddress
    }
  })
  if (res?.data?.projectByAddress) {
    return true
  }
  return false
}

export async function isSmartContract(projectWalletAddress) {
  const code = await provider.getCode(projectWalletAddress)

  return code !== '0x'
}
