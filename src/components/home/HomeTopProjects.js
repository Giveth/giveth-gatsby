/** @jsx jsx */

import { jsx } from 'theme-ui'
import { useQuery } from '@apollo/client'
import { FETCH_PROJECTS } from '../../apollo/gql/projects'
import { navigate } from 'gatsby'
import ProjectsList, { OrderByDirection, OrderByField } from '../ProjectsList'
import { useState } from 'react'

const HomeTopProjects = () => {
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }

  const { data } = useQuery(FETCH_PROJECTS, {
    variables: { limit: 3, orderBy }
  })

  const { topProjects } = data || {}
  const { projects = [], totalCount = 0 } = topProjects || {}
  return (
    <ProjectsList
      projects={projects}
      totalCount={totalCount}
      loadMore={() => navigate('/projects')}
      hasMore
      selectOrderByField={setOrderByField}
    />
  )
}

export default HomeTopProjects
