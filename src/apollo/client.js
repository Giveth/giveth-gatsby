import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'
import {
  getLocalStorageUserLabel,
  getLocalStorageTokenLabel
} from '../services/auth'

const gatsbyUser = getLocalStorageUserLabel()

const httpLink = createUploadLink({ uri: process.env.GATSBY_APOLLO_SERVER })

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(getLocalStorageTokenLabel())

  // return the headers to the context so httpLink can read them
  const mutation = {
    authorization: token ? `Bearer ${token}` : ''
  }
  if (localStorage.getItem(gatsbyUser)) {
    const user = JSON.parse(localStorage.getItem(gatsbyUser))
    const userAddress = user?.addresses && user.addresses[0]

    if (userAddress) mutation['wallet-address'] = userAddress
  }

  return {
    headers: {
      ...headers,
      ...mutation
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  typeDefs: gql`
    enum OrderField {
      CreationDate
      Balance
    }

    enum OrderDirection {
      ASC
      DESC
    }

    type OrderBy {
      field: OrderField!
      direction: OrderDirection!
    }
  `,
  fetch
})
