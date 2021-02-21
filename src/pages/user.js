/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx, Text, Flex, Spinner } from 'theme-ui'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useApolloClient } from '@apollo/client'
import { PublicProfileView } from '../components/user'
import { FETCH_USER_PROJECTS } from '../apollo/gql/projects'
import { GET_USER_BY_ADDRESS } from '../apollo/gql/auth'
import { WALLET_DONATIONS } from '../apollo/gql/donations'
import Web3 from 'web3'

const User = props => {
  console.log({ props })
  const { address } = props
  const client = useApolloClient()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userDonations, setDonations] = useState(null)
  const [userProjects, setProjects] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        if (user) return null
        const { data } = await client.query({
          query: GET_USER_BY_ADDRESS,
          variables: {
            address: address?.toLowerCase()
          }
        })
        setUser(data?.userByAddress)

        // GET PROJECTS
        const { data: projects } = await client.query({
          query: FETCH_USER_PROJECTS,
          variables: { admin: parseFloat(data?.userByAddress?.id || -1) },
          fetchPolicy: 'network-only'
        })
        console.log({ projects })
        setProjects(projects?.projects)

        // GET DONATIONS
        const { data: donations } = await client.query({
          query: WALLET_DONATIONS,
          variables: { fromWalletAddresses: [address] },
          fetchPolicy: 'network-only'
        })
        setDonations(donations?.donationsByDonor)

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
        <PublicProfileView
          user={user}
          projects={userProjects}
          donations={userDonations}
        />
      ) : (
        <Flex sx={{ m: 'auto' }}>
          <Text variant='headings.h3' color='secondary'>
            No user found
          </Text>
        </Flex>
      )}
    </Layout>
  )
}

export default User
