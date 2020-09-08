/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_PROJECTS } from '../apollo/gql/projects'
import ProjectsList, { OrderByDirection, OrderByField } from '../components/ProjectsList'
import { useState } from 'react'

const Projects = () => {
  const [limit, setLimit] = useState(2)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance);
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }

  const { data } = useQuery(FETCH_PROJECTS, {
    variables: { orderBy }
  })

  const { topProjects } = data || {}
  const { projects = [], totalCount = 0 } = topProjects || {}
  const showingProjects = projects.slice(0, limit);
  return (
    <Layout>
      <SEO title='Projects' />
      <ProjectsList
        projects={showingProjects}
        totalCount={totalCount}
        loadMore={() => {
          setLimit(limit + 3);
        }}
        hasMore={limit < projects.length}
        selectOrderByField={orderByField => {
          setLimit(2);
          setOrderByField(orderByField)
        }}
      />
    </Layout>
  )}

export default Projects
