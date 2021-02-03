import gql from 'graphql-tag'
const SAVE_DONATION = gql`
  mutation($transactionId: String!) {
    saveDonation(transactionId: $transactionId)
  }
`
const USERS_DONATIONS = gql`
  query donationsFromWallets($fromWalletAddresses: [String!]!) {
    donationsFromWallets(fromWalletAddresses: $fromWalletAddresses) {
      transactionId
      toWalletAddress
      fromWalletAddress
      anonymous
      amount
      valueUsd
      user {
        id
        firstName
        lastName
      }
      project {
        title
      }
      createdAt
      currency
    }
  }
`
export { SAVE_DONATION, USERS_DONATIONS }
