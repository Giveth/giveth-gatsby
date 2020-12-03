import React, { useEffect, useState } from 'react'
import {
  FETCH_PROJECTS,
  FETCH_PROJECT_BY_SLUG
} from '../../apollo/gql/projects'
import Layout from '../../components/layout'
import { Flex, Spinner } from 'theme-ui'
import { ProjectDonatorView } from '../../components/project'

import { useApolloClient } from '@apollo/react-hooks'

const Projects = ({ id }) => {
  const client = useApolloClient()
  const [slugProject, setSlugProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const slug = id

  useEffect(() => {
    const getProject = async slug => {
      try {
        const { data } = await client.query({
          query: FETCH_PROJECT_BY_SLUG,
          variables: {
            slug: slug.toString()
          }
        })
        console.log(`data is ---> : ${data}`)

        setSlugProject(data?.projectBySlug)
        setLoading(false)
      } catch (error) {
        console.log('error is', { error })
        setLoading(false)
      }
    }

    if (slug) {
      // redirect
      console.log('slug', { slug })
      getProject(slug)
    } else {
      setLoading(false)
    }
  }, [])
  console.log(`id ---> : ${id}`)
  return (
    <Layout>
      {loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : (
        <>
          <ProjectDonatorView pageContext={{ project: slugProject }} />
        </>
      )}
    </Layout>
  )
}

export default Projects
