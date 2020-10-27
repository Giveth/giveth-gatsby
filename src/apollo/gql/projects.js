import gql from 'graphql-tag'

const FETCH_PROJECTS = gql`
  query FetchProjects($limit: Int, $skip: Int, $orderBy: OrderBy) {
    topProjects(take: $limit, skip: $skip, orderBy: $orderBy) {
      projects {
        id
        title
        balance
      }
      totalCount
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

const ADD_PROJECT_SIMPLE = gql`
  mutation($title: String!, $description: String!) {
    addProjectSimple(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

const ADD_PROJECT = gql`
  mutation($project: ProjectInput!) {
    addProject(project: $project) {
      title
      description
      admin
      image
      impactLocation
    }
  }
`

export { FETCH_PROJECTS, FETCH_PROJECT, ADD_PROJECT, ADD_PROJECT_SIMPLE }
