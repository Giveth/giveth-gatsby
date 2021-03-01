import gql from 'graphql-tag'
const SAVE_DONATION = gql`
  mutation(
    $fromAddress: String!
    $toAddress: String!
    $transactionId: String!
    $transactionNetworkId: Float!
    $amount: Float!
    $token: String!
    $projectId: Float!
  ) {
    saveDonation(
      fromAddress: $fromAddress
      toAddress: $toAddress
      transactionId: $transactionId
      transactionNetworkId: $transactionNetworkId
      amount: $amount
      token: $token
      projectId: $projectId
    )
  }
`
const SAVE_DONATION_TRANSACTION = gql`
  mutation($transactionId: String!, $donationId: Float!) {
    saveDonationTransaction(
      transactionId: $transactionId
      donationId: $donationId
    )
  }
`
const WALLET_DONATIONS = gql`
  query donationsFromWallets($fromWalletAddresses: [String!]!) {
    donationsFromWallets(fromWalletAddresses: $fromWalletAddresses) {
      transactionId
      transactionNetworkId
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
const USERS_DONATIONS = gql`
  query {
    donationsByDonor {
      transactionId
      transactionNetworkId
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
export {
  SAVE_DONATION,
  USERS_DONATIONS,
  WALLET_DONATIONS,
  SAVE_DONATION_TRANSACTION
}
