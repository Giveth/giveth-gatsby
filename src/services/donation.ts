import Logger from '../Logger'
import { SAVE_DONATION, SAVE_DONATION_TRANSACTION } from '../apollo/gql/donations'
import { client } from '../apollo/client'

export async function saveDonation (
  fromAddress: string,
  toAddress: string,
  transactionId: string,
  amount: number,
  token: string,
  projectId: number
) {
  const saveDonationErrors = []
  let donationId: any = 0
  try {
    const { data } = await client.mutate({
      mutation: SAVE_DONATION,
      variables: {
        fromAddress,
        toAddress,
        transactionId,
        amount,
        token,
        projectId
      }
    })
    const { saveDonation: saveDonationId } = data 
    donationId = saveDonationId
  } catch (error) {
    saveDonationErrors.push(error)
  }
  return {
    donationId,
    saveDonationErrors,
    savedDonation: saveDonationErrors.length === 0
  }
}

export async function saveDonationTransaction (hash: string, donationId: Number) {
  const saveDonationTransactionErrors = []
  let savedDonationTransaction: any = 0
  try {
    const { data, error } = await client.mutate({
      mutation: SAVE_DONATION_TRANSACTION,
      variables: {
        transactionId: hash?.toString(),
        donationId
        // anonymous: false
      }
    })
    savedDonationTransaction = data 
  } catch (error) {
    saveDonationTransactionErrors.push(error)
  }
  
  return {
    savedDonationTransaction,
    saveDonationTransactionErrors
  }

}
