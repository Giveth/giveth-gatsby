import gql from 'graphql-tag'

const FETCH_PROJECTS = gql`
 query FetchProjects($limit: Int, $skip: Int)
  {
  topProjects(take: $limit, skip: $skip){
      projects {
        title
        balance
      }
      totalCount
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

export { FETCH_PROJECTS, ADD_PROJECT }
