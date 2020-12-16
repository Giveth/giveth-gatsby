import React from 'react'
import useIsClient from '../utils/useIsClient'
import ProjectTemplate from '../templates/project'
import Layout from '../components/layout'

const Project = props => {
  const { isClient } = useIsClient()
  const { params } = props
  // if (!isClient) return null
  if (params?.id) return <ProjectTemplate id={params?.id} />
  return <Layout />
}

export default Project
