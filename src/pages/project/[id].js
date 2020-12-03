/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { useQuery } from '@apollo/react-hooks'
import { useApolloClient } from '@apollo/react-hooks'
import { ProjectDonatorView } from '../../components/project'
import {
  FETCH_PROJECTS,
  FETCH_PROJECT_BY_SLUG
} from '../../apollo/gql/projects'
import { Flex, Spinner } from 'theme-ui'
import React, { useEffect, useState } from 'react'

const Projects = props => {
  console.log({ props })
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
  }, [])

  return (
    <Layout>
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

export default Projects
