/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Spinner } from 'theme-ui'
import Layout from '../components/layout'
import { Router } from '@reach/router'
import Seo from '../components/seo'
import { useApolloClient } from '@apollo/client'
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
      <Seo
        title={
          slugProject?.title
            ? `Check out ${slugProject?.title}`
            : 'Check out this project!'
        }
        image={slugProject?.image}
      />
      {loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : slugProject ? (
        <ProjectDonatorView pageContext={{ project: slugProject }} />
      ) : null}
    </Layout>
  )
}

export default Project
