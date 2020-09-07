/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_PROJECTS } from '../apollo/gql/projects'
import ProjectsList from '../components/ProjectsList'
import { useState } from 'react'

const Projects = () => {
  const [limit, setLimit] = useState(2)
  const { data } = useQuery(FETCH_PROJECTS)

  const { topProjects } = data || {}
  const { projects = [], totalCount } = topProjects || {}
  console.log(projects);
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
      />
    </Layout>
  )}

export default Projects
