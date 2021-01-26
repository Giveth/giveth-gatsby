import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
import { client } from '../../apollo/client'
import {
  getAddressFromENS,
  isWalletAddressValid,
  isAddressENS
} from '../../services/wallet'

export async function getProjectWallet (projectWalletAddress) {
  if (projectWalletAddress) {
    try {
      if (!isWalletAddressValid(projectWalletAddress))
        throw new Error('Wallet address is invalid')

      projectWalletAddress = isAddressENS(projectWalletAddress)
        ? await getAddressFromENS(projectWalletAddress)
        : projectWalletAddress
    } catch (error) {
      throw new Error(`Error while validating wallet - ${projectWalletAddress}`)
    }
  }
  return projectWalletAddress
}

export async function projectWalletAlreadyUsed (projectWalletAddress) {
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
