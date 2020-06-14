//import { gql } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { graphql } from 'gatsby'

const FETCH_PROJECTS = gql`
  {
    projects {
      title
    }
  }
`
const ADD_PROJECT = gql`
  mutation($title: String!, $description: String!) {
    addProject(project: { title: $title, description: $description }) {
      title
      description
    }
  }
`

const ADD_PROJECT_SIMPLE = gql`
  mutation($title: String!, $description: String!) {
    addProjectSimple(title: $title, description: $description) {
      title
      description
    }
  }
`

export { FETCH_PROJECTS, ADD_PROJECT_SIMPLE }
