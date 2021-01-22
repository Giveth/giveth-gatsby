/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useApolloClient, useQuery } from '@apollo/client'
import { FETCH_PROJECTS, FETCH_PROJECT_BY_SLUG } from '../apollo/gql/projects'
import ProjectsList, {
  OrderByDirection,
  OrderByField
} from '../components/ProjectsList'

const Projects = props => {
  const [limit, setLimit] = useState(12)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }

  const { data } = useQuery(FETCH_PROJECTS, {
    variables: { orderBy },
    fetchPolicy: 'network-only'
  })

  const { topProjects } = data || {}
  const { projects = [], totalCount = 0 } = topProjects || {}
  const showingProjects = projects.slice(0, limit)

  const AllProjects = () => (
    <React.Fragment>
      <Seo title='Projects' />
      <ProjectsList
        projects={showingProjects}
        totalCount={totalCount}
        loadMore={() => {
          setLimit(limit + 3)
        }}
        hasMore={limit < projects.length}
        selectOrderByField={orderByField => {
          setLimit(2)
          setOrderByField(orderByField)
        }}
      />
    </React.Fragment>
  )

  return (
    <Layout>
      <AllProjects />
    </Layout>
  )
}

export default Projects
