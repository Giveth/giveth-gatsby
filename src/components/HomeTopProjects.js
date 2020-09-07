/** @jsx jsx */

import { jsx, Box } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_PROJECTS } from '../apollo/gql/projects'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import ProjectsList from './ProjectsList'

const ProjectSection = styled(Box)``
const HomeTopProjects = () => {
  const { data } = useQuery(FETCH_PROJECTS, {
    variables: { limit: 2 }
  })

  const { topProjects } = data || {}
  const { projects, totalCount } = topProjects || {}
  return (
    <ProjectsList
      projects={projects}
      totalCount={totalCount}
      loadMore={() => navigate('/projects')}
      hasMore={true}
    />
  )
}

export default HomeTopProjects
