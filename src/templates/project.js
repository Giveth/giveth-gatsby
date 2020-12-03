import React from 'react'
import Layout from '../components/layout'
import { ProjectDonatorView } from '../components/project'

const ProjectPageTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <ProjectDonatorView pageContext={pageContext} />
    </Layout>
  )
}

export default ProjectPageTemplate
