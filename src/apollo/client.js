import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { createUploadLink } from 'apollo-upload-client'
import { from } from '@apollo/client'

const link = createUploadLink({ uri: process.env.GATSBY_APOLLO_SERVER })

export const client = new ApolloClient({
  uri: process.env.GATSBY_APOLLO_SERVER,
  link: from([link]),
  fetch
})
