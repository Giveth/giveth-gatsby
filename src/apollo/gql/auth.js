import gql from 'graphql-tag'

const DO_LOGIN = gql`
  mutation DoLoginWallet(
    $walletAddress: String!
    $signature: String!
    $email: String!
  ) {
    loginWallet(
      walletAddress: $walletAddress
      signature: $signature
      email: $email
    ) {
      token
      user {
        firstName
        lastName
        email
      }
    }
  }
`

const DO_REGISTER = gql`
  mutation DoRegister($name: String!, $email: String!, $password: String!) {
    register(
      data: {
        firstName: $name
        lastName: ""
        email: $email
        password: $password
      }
    ) {
      firstName
      email
      lastName
    }
  }
`
export { DO_LOGIN, DO_REGISTER }
