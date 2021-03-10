/** @jsx jsx */

import { jsx } from 'theme-ui'
import { useApolloClient } from '@apollo/client'
import { FETCH_PROJECTS } from '../../apollo/gql/projects'
import { navigate } from 'gatsby'
import ProjectsList, { OrderByDirection, OrderByField } from '../ProjectsList'
import { useState, useEffect } from 'react'

const HomeTopProjects = ({ projects = [], totalCount = null }) => {
  const client = useApolloClient()
  const [showProjects, setShowProjects] = useState(projects)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }

  useEffect(() => {
    const checkProjects = async () => {
      if (projects) return null
      const { data } = await client.query({
        query: FETCH_PROJECTS,
        variables: { limit: 15, orderBy },
        fetchPolicy: 'network-only'
      })
      const { topProjects } = data || {}
      setShowProjects(topProjects)
    }
    checkProjects()
  }, [])
  return (
    <ProjectsList
      projects={showProjects}
      totalCount={totalCount}
      loadMore={() => navigate('/projects')}
      hasMore
      selectOrderByField={setOrderByField}
    />
  )
}

export default HomeTopProjects
