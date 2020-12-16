import React from 'react'
import ProjectTemplate from '../../templates/project'
import Layout from '../../components/layout'

const Project = props => {
  const { id } = props
  if (id) return <ProjectTemplate id={id} />
  return <Layout />
}

export default Project
