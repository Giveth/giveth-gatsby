/** @jsx jsx */
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { jsx, Text, Flex, Box } from 'theme-ui'
import { useQueryParams, StringParam } from 'use-query-params'
import { useApolloClient } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_USER_PROJECTS } from '../../apollo/gql/projects'
import styled from '@emotion/styled'
import { TorusContext } from '../../contextProvider/torusProvider'
import { getEtherscanTxs } from '../../utils'
import { useMediaQuery } from 'react-responsive'
import theme from '../../gatsby-plugin-theme-ui/index'
import iconVerticalLine from '../../images/icon-vertical-line.svg'
import { BsArrowLeft } from 'react-icons/bs'
import { USERS_DONATIONS } from '../../apollo/gql/donations'
import { FETCH_PROJECTS } from '../../apollo/gql/projects'

import MyProjects from './myProjects'
const MyAccount = React.lazy(() => import('../../components/account/myAccount'))
const MyDonations = React.lazy(() =>
  import('../../components/account/myDonations')
)

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

const CreateLink = styled(Link)`
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  color: ${theme.colors.primary};
  align-self: center;
  :hover {
    color: ${theme.colors.accent};
  }
`

const AccountPage = props => {
  const { user, isLoggedIn, logout } = React.useContext(TorusContext)
  const [projects, setProjects] = React.useState(null)
  const client = useApolloClient()
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const { data } = useQuery(USERS_DONATIONS)
  const { donationsByDonor } = data || {}
  const userDonations = donationsByDonor

  const options = [
    { route: 'account', name: 'My Account' },
    { route: 'projects', name: 'My Projects' },
    { route: 'donations', name: 'My Donations' }
  ]
  const [query, setQuery] = useQueryParams({
    view: StringParam,
    data: StringParam
  })
  const isSSR = typeof window === 'undefined'
  const projectsList = projects?.data?.projects

  const handleLogout = () => {
    logout()
  }

  const SetView = () => {
    const { view, data } = query
    switch (view) {
      case 'projects':
        switch (data) {
          case 'all':
            return <MyProjects projects={projectsList} />
          default:
            return <MyProjects projects={projectsList} edit={data} />
        }
      case 'donations':
        return (
          !isSSR && (
            <React.Suspense fallback={<div />}>
              <MyDonations donations={userDonations} />
            </React.Suspense>
          )
        )
      default:
        return (
          !isSSR && (
            <React.Suspense fallback={<div />}>
              <MyAccount
                info={{
                  myDonations: userDonations?.length,
                  myProjects: projectsList?.length
                }}
              />
            </React.Suspense>
          )
        )
    }
  }

  const formatTitle = title => {
    switch (title) {
      case 'My Projects':
        return `My Projects ${
          projectsList?.length ? `(${projectsList?.length})` : ''
        }`
      case 'My Donations':
        return `My Donations ${
          userDonations?.length ? `(${userDonations?.length})` : ''
        }`
      default:
        return title
    }
  }

  if (!isLoggedIn) {
    return (
      <Text
        sx={{
          variant: 'headings.h3',
          my: 20
        }}
      >
        unavailable
      </Text>
    )
  }

  return (
    <React.Fragment>
      <Flex sx={{ justifyContent: 'space-between', mx: '5%', height: '128px' }}>
        <Link
          to='/'
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            width: '80px',
            justifyContent: 'space-between',
            variant: 'links.default'
          }}
        >
          <BsArrowLeft size='24px' />
          Giveth
        </Link>
        <Flex>
          <UserSpan>
            {isMobile ? null : (
              <span>
                <CreateLink to='/create'>Create a project</CreateLink>
              </span>
            )}
            <img src={iconVerticalLine} alt='' />
            {/* <Login onLogin={onLogin} balance={balance} /> */}
          </UserSpan>
        </Flex>
      </Flex>
      <Flex
        sx={{
          mx: '5%',
          fontFamily: 'heading',
          flexDirection: ['column', 'row', 'row']
        }}
      >
        <Box sx={{ width: ['100%', '30%', '30%'] }}>
          <Text
            sx={{
              fontFamily: 'heading',
              color: 'secondary',
              fontSize: 8,
              mt: '40px',
              mb: '68px',
              variant: 'links.secondary'
            }}
          >
            My Account
          </Text>
          <Box>
            {options.map((i, index) => {
              return (
                <a
                  key={index}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  onClick={() => {
                    switch (i.route) {
                      case 'projects':
                        return setQuery({ view: 'projects', data: 'all' })
                      case 'account':
                        return setQuery({ view: undefined, data: undefined })
                      default:
                        return setQuery({ view: i.route, data: undefined })
                    }
                  }}
                >
                  <Text
                    sx={{
                      mb: '8px',
                      color:
                        query?.view === i.route ||
                        (!query?.view && i.route === 'account')
                          ? 'secondary'
                          : 'primary'
                    }}
                  >
                    {formatTitle(i.name)}
                  </Text>
                </a>
              )
            })}
          </Box>
          <Box sx={{ mt: ['35px', '70px', '70px'] }}>
            <Link
              href='https://app.tor.us'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ textDecoration: 'none' }}
            >
              <Text sx={{ mb: '8px', variant: 'links.grey' }}>
                Wallet Settings
              </Text>
            </Link>
            <Link
              href='https://github.com/Giveth/giveth-2/issues/new/choose'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ textDecoration: 'none' }}
            >
              <Text sx={{ mb: '8px', variant: 'links.grey' }}>
                Report A Bug
              </Text>
            </Link>
            <Link
              href='https://discord.gg/JYNBDuFUpG'
              target='_blank'
              rel='noopener noreferrer'
              sx={{ textDecoration: 'none' }}
            >
              <Text sx={{ mb: '8px', variant: 'links.grey' }}>Support</Text>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }} onClick={handleLogout}>
              <Text sx={{ mb: '8px', variant: 'links.grey' }}>Sign Out</Text>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            width: ['100%', null, '70%'],
            mt: ['100px', '140px', '140px']
          }}
        >
          <SetView />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default AccountPage
