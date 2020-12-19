import gql from 'graphql-tag'

const DO_LOGIN = gql`
  mutation DoLoginWallet(
    $walletAddress: String!
    $signature: String!
    $email: String!
    $avatar: String!
    $name: String!
  ) {
    loginWallet(
      walletAddress: $walletAddress
      signature: $signature
      email: $email
      avatar: $avatar
      name: $name
    ) {
      token
      user {
        id
        firstName
        lastName
        name
        email
        avatar
      }
    }
  }
`

const GET_USER = gql`
  query User($userId: Int!) {
    user(userId: $userId) {
      id
      firstName
      lastName
      name
      email
      avatar
    }
  }
`

const GET_USER_BY_ADDRESS = gql`
  query UserByAddress($address: String!) {
    userByAddress(address: $address) {
      id
      firstName
      lastName
      name
      email
      avatar
      walletAddress
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
export { DO_LOGIN, DO_REGISTER, GET_USER, GET_USER_BY_ADDRESS }
