import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  uri: process.env.GATSBY_APOLLO_SERVER,
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
