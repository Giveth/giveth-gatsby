import gql from 'graphql-tag'

const FETCH_PROJECTS = gql`
  {
    projects {
      title
    }
  }
`
const ADD_PROJECT = gql`
  mutation($title: String!, $description: String!) {
    addProject(title: $title, description: $description) {
      title
      description
    }
  }
`

export { FETCH_PROJECTS, ADD_PROJECT }
