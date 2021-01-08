import gql from 'graphql-tag'
const SAVE_DONATION = gql`
  mutation($transactionId: String!, $anonymous: Boolean!) {
    saveDonation(transactionId: $transactionId, anonymous: $anonymous)
  }
`
const USERS_DONATIONS = gql`
  query DonationsByDonor {
    donationsByDonor {
      transactionId
      walletAddress
      anonymous
      amount
      userId
      project {
        title
      }
      createdAt
      currency
    }
  }
`
export { SAVE_DONATION, USERS_DONATIONS }
