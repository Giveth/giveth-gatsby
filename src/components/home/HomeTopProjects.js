import { useApolloClient } from '@apollo/client'
import { FETCH_ALL_PROJECTS } from '../../apollo/gql/projects'
import { useRouter } from 'next/router'
import ProjectsList, { OrderByDirection, OrderByField } from '../ProjectsList'
import { useState, useEffect } from 'react'

const HomeTopProjects = props => {
  const router = useRouter()
  const { projects = [], categories, fromHomePage } = props
  const client = useApolloClient()
  const [showProjects, setShowProjects] = useState(projects)
  const [orderByField, setOrderByField] = useState(OrderByField.Balance)
  const [limit, setLimit] = useState(12)
  // const orderBy = {
  //   field: orderByField,
  //   direction: OrderByDirection.DESC
  // }

  useEffect(() => {
    const checkProjectsAfterSSR = async () => {
      try {
        // This updates the projects after showing the SSR
        const { data } = await client.query({
          query: FETCH_ALL_PROJECTS,
          // variables: { limit: 3 },
          fetchPolicy: 'network-only'
        })
        const { projects } = data || {}
        setShowProjects(
          Array.from(projects)
            .filter(i => i?.status?.id === '5')
            .sort((a, b) => b?.qualityScore > a?.qualityScore)
            ?.slice(0, 3)
        )
      } catch (error) {
        console.log({ error })
      }
    }
    checkProjectsAfterSSR()
  }, [])

  return (
    <ProjectsList
      fromHomePage={fromHomePage}
      projects={showProjects}
      categories={categories}
      totalCount={null}
      loadMore={() => router.push('/projects')}
      hasMore
      selectOrderByField={orderByField => {
        setLimit(2)
        setOrderByField(orderByField)
      }}
    />
  )
}

export default HomeTopProjects
