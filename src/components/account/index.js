/** @jsx jsx */
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { jsx, Text, Flex, Box } from 'theme-ui'
import { useApolloClient } from '@apollo/react-hooks'
import { FETCH_USER_PROJECTS } from '../../apollo/gql/projects'
import styled from '@emotion/styled'
import { TorusContext } from '../../contextProvider/torusProvider'
import { getEtherscanTxs } from '../../utils'
import { useMediaQuery } from 'react-responsive'
import theme from '../../gatsby-plugin-theme-ui/index'
import iconVerticalLine from '../../images/icon-vertical-line.svg'
import { BsArrowLeft } from 'react-icons/bs'

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
  const { user, isLoggedIn } = React.useContext(TorusContext)
  const [projects, setProjects] = React.useState(null)
  const client = useApolloClient()
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const [selectedView, setSelectedView] = useState('My Account')
  const [userDonations, setUserDonations] = useState(null)
  const options = ['My Account', 'My Projects', 'My Donations']
  const isSSR = typeof window === 'undefined'
  const projectsList = projects?.data?.projects

  const SetView = () => {
    switch (selectedView) {
      case 'My Account':
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
      case 'My Projects':
        return <MyProjects projects={projectsList} />
      case 'My Donations':
        return (
          !isSSR && (
            <React.Suspense fallback={<div />}>
              <MyDonations donations={userDonations} />
            </React.Suspense>
          )
        )
      default:
        return null
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

  React.useEffect(() => {
    const setup = async () => {
      if (!isLoggedIn) return
      const cryptoTxs = await getEtherscanTxs(user?.addresses[0], client)
      if (cryptoTxs) {
        setUserDonations(
          [...cryptoTxs.txs].filter(function (e) {
            return e
          })
        )
      }
      // setup projects
      if (!user?.userIDFromDB) return
      const projects = await client.query({
        query: FETCH_USER_PROJECTS,
        variables: {
          admin: parseFloat(user?.userIDFromDB)
        }
      })

      setProjects(projects)
    }

    setup()
  }, [user, isLoggedIn, client])

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
    <>
      <Flex sx={{ justifyContent: 'space-between', mx: '5%', height: '128px' }}>
        <Link
          to='/'
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <a
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '80px',
              justifyContent: 'space-between'
            }}
          >
            <BsArrowLeft size='24px' />
            <Text sx={{ fontFamily: 'body' }}>Giveth</Text>
          </a>
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
              mb: '68px'
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
                  onClick={() => setSelectedView(i)}
                >
                  <Text
                    sx={{
                      mb: '8px',
                      color: selectedView === i ? 'secondary' : 'primary'
                    }}
                  >
                    {formatTitle(i)}
                  </Text>
                </a>
              )
            })}
          </Box>
          <Box sx={{ mt: ['35px', '70px', '70px'] }}>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'bodyDark' }}>
                  Wallet Settings
                </Text>
              </a>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'bodyDark' }}>Report A Bug</Text>
              </a>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'bodyDark' }}>Support</Text>
              </a>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'bodyDark' }}>Sign Out</Text>
              </a>
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
    </>
  )
}

export default AccountPage
