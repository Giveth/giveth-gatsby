import gql from 'graphql-tag'

const DO_LOGIN = gql`
  mutation DoLoginWallet(
    $walletAddress: String!
    $signature: String!
    $email: String!
    $avatar: String!
  ) {
    loginWallet(
      walletAddress: $walletAddress
      signature: $signature
      email: $email
      avatar: $avatar
    ) {
      token
      user {
        id
        firstName
        lastName
        email
        avatar
      }
    }
  }
`

const GET_USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id
      firstName
      lastName
      email
      avatar
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
export { DO_LOGIN, DO_REGISTER, GET_USER }
