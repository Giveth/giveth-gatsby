import gql from 'graphql-tag'
const SAVE_DONATION = gql`
  mutation($transactionId: String!, $anonymous: Boolean!) {
    saveDonation(transactionId: $transactionId, anonymous: $anonymous)
  }
`

export { SAVE_DONATION }
