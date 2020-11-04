import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: process.env.GATSBY_APOLLO_SERVER }),
  request: operation => {
    // const token = localStorage.getItem('token')
    const token = true
    // NOTE: this token serves for testing while backend is updated, while we build the auth flow
    operation.setContext({
      headers: {
        authorization: token
          ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJmaXJzdE5hbWUiOiJDYW1pbG8iLCJpYXQiOjE2MDExODE5NjgsImV4cCI6MTYwMzc3Mzk2OH0.zjnJhN0hCpPOWXLJ_y1LXxya06f453vuvI_E6RWfUOo'
          : ''
      }
    })
  },
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
