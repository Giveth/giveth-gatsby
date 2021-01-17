/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Spinner } from 'theme-ui'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Router } from '@reach/router'
import { useApolloClient } from '@apollo/react-hooks'
import { ProjectDonatorView } from '../components/project'
import { FETCH_PROJECT_BY_SLUG } from '../apollo/gql/projects'
import { useEffect, useState } from 'react'

const Project = props => {
  const { id } = props
  const client = useApolloClient()

  const [loading, setLoading] = useState(true)
  const [slugProject, setSlugProject] = useState(null)

  useEffect(() => {
    const getProject = async () => {
      const slug = id
      try {
        const { data } = await client.query({
          query: FETCH_PROJECT_BY_SLUG,
          variables: {
            slug: slug.toString()
          }
        })
        console.log({ data })
        setSlugProject(data?.projectBySlug)
        setLoading(false)
      } catch (error) {
        console.log({ error })
        setLoading(false)
      }
    }
    if (id) {
      getProject()
    } else {
      setLoading(false)
    }
  })
  return (
    <Layout>
      {loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Seo title='Donate to this project' />
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : slugProject ? (
        <>
          <Seo
            title={`Check ${slugProject?.title} in Giveth`}
            image={slugProject?.image}
          />
          <ProjectDonatorView pageContext={{ project: slugProject }} />
        </>
      ) : null}
    </Layout>
  )
}

const ProjectWithoutSlug = () => {
  return <Layout />
}

const ProjectIndex = () => {
  return (
    <Router basepath='/'>
      <ProjectWithoutSlug path='project' />
      <Project path='project/:id' />
    </Router>
  )
}

export default ProjectIndex
