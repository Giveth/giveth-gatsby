/** @jsx jsx */
import React from 'react'
import { Link } from 'gatsby'
import { jsx, Text, Flex, Spinner, Box } from 'theme-ui'
import { useQueryParams, StringParam } from 'use-query-params'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { useWallet } from '../../contextProvider/WalletProvider'
import { BsArrowLeft } from 'react-icons/bs'
import LoadingModal from '../../components/loadingModal'
import { USERS_DONATIONS } from '../../apollo/gql/donations'
import { FETCH_USER_PROJECTS } from '../../apollo/gql/projects'
import AccountTop from '../../components/account/AccountTop'
import AccountNav from '../../components/account/AccountNav'
import AccountBody from '../../components/account/AccountBody'

const UserSpan = styled.span`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-self: end;
  @media (max-width: 1030px) {
    grid-row: 1;
    grid-column: 3;
  }
`

const AccountPage = props => {
  const { user, isLoggedIn } = useWallet()
  const fromWalletAddress = user.getWalletAddress()

  const userWallets = user.walletAddresses
  const { data: donations, loading: dataLoading } = useQuery(USERS_DONATIONS, {
    variables: { fromWalletAddresses: userWallets },
    fetchPolicy: 'network-only'
  })
  const userDonations = donations?.donationsFromWallets

  console.log(`debug: account/index user : ${JSON.stringify(user, null, 2)}`)

  const { data: userProjects, loading: projectsLoading } = useQuery(
    FETCH_USER_PROJECTS,
    {
      variables: { admin: parseFloat(user?.id || -1) },
      fetchPolicy: 'network-only'
    }
  )
  const projectsList = userProjects?.projects

  const [query, setQuery] = useQueryParams({
    view: StringParam,
    data: StringParam
  })
  const isSSR = typeof window === 'undefined'

  if (dataLoading || projectsLoading) {
    return (
      <>
        <AccountTop />
        <Flex sx={{ height: '80vh' }} />
        <LoadingModal isOpen={true} />
      </>
    )
  }

  if (!isLoggedIn) {
    return (
      <Text
        sx={{
          variant: 'headings.h3',
          m: 20
        }}
      >
        unavailable page
      </Text>
    )
  }

  return (
    <>
      <AccountTop />
      <Flex
        sx={{
          mx: '5%',
          fontFamily: 'heading',
          flexDirection: ['column', 'row', 'row']
        }}
      >
        <AccountNav
          setQuery={setQuery}
          query={query}
          userDonations={userDonations}
          projectsList={projectsList}
        />
        <AccountBody
          projectsList={projectsList}
          setQuery={setQuery}
          query={query}
          isSSR={isSSR}
          userDonations={userDonations}
          projectsList={projectsList}
        />
      </Flex>
    </>
  )
}

export default AccountPage
