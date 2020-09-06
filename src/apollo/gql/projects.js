import gql from 'graphql-tag'

const FETCH_PROJECTS = gql`
  {
    projects {
      id
      title
    }
  }
`

const FETCH_PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      title
      description
    }
  }
`

const ADD_PROJECT = gql`
  mutation($title: String!, $description: String!) {
    addProjectSimple(title: $title, description: $description) {
      title
      description
    }
  }
`

export { FETCH_PROJECTS, FETCH_PROJECT, ADD_PROJECT }
