/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx, Text, Flex, Spinner } from 'theme-ui'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useApolloClient } from '@apollo/client'
import { PublicProfileView } from '../components/user'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'

const User = props => {
  const { address } = props
  const client = useApolloClient()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user) return null
        const { data } = await client.query({
          query: GET_USER_BY_ADDRESS,
          variables: {
            address: address
          }
        })
        setUser(data?.userByAddress)
        setLoading(false)
      } catch (error) {
        console.log({ error })
        setLoading(false)
      }
    }
    if (address) {
      getUser()
    } else {
      setLoading(false)
    }
  })
  return (
    <Layout>
      <Seo title={user?.name ? `${user?.name} at Giveth` : 'Giveth Profile'} />
      {loading ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Spinner variant='spinner.medium' />
        </Flex>
      ) : user ? (
        <PublicProfileView user={user} />
      ) : null}
    </Layout>
  )
}

export default User
