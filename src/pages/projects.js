/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useApolloClient } from '@apollo/client'
import { FETCH_ALL_PROJECTS } from '../apollo/gql/projects'
import ProjectsList, {
  OrderByDirection,
  OrderByField
} from '../components/ProjectsList'

const Projects = ({ data }) => {
  const client = useApolloClient()
  const [showProjects, setShowProjects] = useState(data?.giveth?.projects)
  const [limit, setLimit] = useState(12)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const orderBy = {
    field: orderByField,
    direction: OrderByDirection.DESC
  }
  const categories = data?.giveth?.categories
  useEffect(() => {
    const checkProjectsAfterSSR = async () => {
      try {
        // This updates the projects after showing the SSR
        const { data } = await client.query({
          query: FETCH_ALL_PROJECTS,
          // variables: { orderBy },
          fetchPolicy: 'network-only'
        })
        const { projects } = data || {}
        setShowProjects(Array.from(projects).filter(i => i?.status?.id === '5'))
      } catch (error) {
        console.log({ error })
      }
    }
    checkProjectsAfterSSR()
  }, [])

  const { giveth } = data
  const { projects } = giveth
  const totalCount = showProjects?.length
  const showingProjects = showProjects
    ?.slice(0, limit)
    .sort((a, b) => b?.qualityScore > a?.qualityScore)

  const AllProjects = () => (
    <React.Fragment>
      <Seo title='Projects' />
      <ProjectsList
        projects={showingProjects}
        categories={categories}
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

export const query = graphql`
  query FetchProjects {
    giveth {
      projects {
        id
        title
        balance
        image
        slug
        creationDate
        admin
        description
        walletAddress
        impactLocation
        categories {
          name
        }
        reactions {
          reaction
          id
          projectUpdateId
          userId
        }
      }
      categories {
        name
      }
    }
    allProject {
      edges {
        node {
          id
          title
          balance
          image
          slug
          creationDate
          admin
          description
          walletAddress
          impactLocation
          qualityScore
          totalDonations
          totalHearts
          categories {
            name
          }
          reactions {
            reaction
            id
            projectUpdateId
            userId
          }
        }
      }
      totalCount
    }
  }
`
