/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { FETCH_PROJECTS, FETCH_PROJECT_BY_SLUG } from '../apollo/gql/projects'
import ProjectsList, {
  OrderByDirection,
  OrderByField
} from '../components/ProjectsList'

const Projects = props => {
  const { location } = props
  const client = useApolloClient()

  const [limit, setLimit] = useState(12)
  const [loading, setLoading] = useState(true)
  const [slugProject, setSlugProject] = useState(null)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }

  const { data } = useQuery(FETCH_PROJECTS, {
    variables: { orderBy }
  })

  const { topProjects } = data || {}
  const { projects = [], totalCount = 0 } = topProjects || {}
  const showingProjects = projects.slice(0, limit)

  const pathname = location?.pathname.split('/')

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

    const slug = pathname[2]
    if (slug) {
      // redirect
      console.log('slug', { slug })
      getProject(slug)
    } else {
      setLoading(false)
    }
  })

  const AllProjects = () => (
    <React.Fragment>
      <Seo title='Projects' />
      <ProjectsList
        projects={showingProjects}
        totalCount={totalCount}
        loadMore={() => {
          setLimit(limit + 3)
        }}
        hasMore={limit < projects.length}
        selectOrderByField={orderByField => {
          setLimit(2)
          setOrderByField(orderByField)
        }}
      />
    </React.Fragment>
  )

  return (
    <Layout>
      <AllProjects />
    </Layout>
  )
}

export default Projects
