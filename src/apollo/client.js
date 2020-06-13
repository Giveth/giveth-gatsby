import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: process.env.GATSBY_APOLLO_SERVER,
  fetch
})
