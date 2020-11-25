/** @jsx jsx */
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { MyAccount, MyProjects } from '../components/account'
import { jsx, Text, Flex, Box } from 'theme-ui'
import styled from '@emotion/styled'
import Layout from '../components/layout'
import { useMediaQuery } from 'react-responsive'
import theme from '../gatsby-plugin-theme-ui/index'
import iconVerticalLine from '../images/icon-vertical-line.svg'
import { BsArrowLeft } from 'react-icons/bs'

const MyDonations = React.lazy(() =>
  import('../components/account/myDonations')
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

const AccountPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const [selectedView, setSelectedView] = useState('My Account')
  const options = ['My Account', 'My Projects', 'My Donations']
  const isSSR = typeof window === 'undefined'

  const SetView = () => {
    switch (selectedView) {
      case 'My Account':
        return <MyAccount />
      case 'My Projects':
        return <MyProjects />
      case 'My Donations':
        return (
          !isSSR && (
            <React.Suspense fallback={<div />}>
              <MyDonations />
            </React.Suspense>
          )
        )
      default:
        return null
    }
  }

  return (
    <Layout noHeader>
      <Flex sx={{ justifyContent: 'space-between', mx: '5%', height: '128px' }}>
        <Link
          to='/'
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <a
            sx={{
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
        <Box sx={{ width: ['100%', null, '30%'] }}>
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
                    {i}
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
          sx={{ width: ['100%', null, '70%'], mt: ['100px', '140px', '140px'] }}
        >
          <SetView />
        </Box>
      </Flex>
    </Layout>
  )
}

export default AccountPage
