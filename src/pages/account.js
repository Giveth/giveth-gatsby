/** @jsx jsx */
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { MyAccount, MyDonations, MyProjects } from '../components/account'
import { jsx, Text, Flex, IconButton, Box, Button } from 'theme-ui'
import styled from '@emotion/styled'
import Loadable from '@loadable/component'
import { useMediaQuery } from 'react-responsive'
import { useMutation } from '@apollo/react-hooks'

import { DO_LOGIN } from '../apollo/gql/auth'

import theme from '../gatsby-plugin-theme-ui/index'
import iconVerticalLine from '../images/icon-vertical-line.svg'
import { BsArrowLeft } from 'react-icons/bs'

import Footer from '../components/footer'

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
  // const Login = Loadable(() => import('../components/torus/login'))
  // const [doLogin] = useMutation(DO_LOGIN)

  const [balance, setBalance] = useState(0)
  // const onLogin = () => {}
  // const onLogin = async (signedMessage, userAddress, userEmail) => {
  //   console.log('onLogin > doinglogin')
  //   try {
  //     const loginResponse = await doLogin({
  //       variables: {
  //         walletAddress: userAddress,
  //         signature: signedMessage.signature,
  //         email: userEmail
  //       }
  //     })

  //     console.log(`didlogin - loginResponse ---> : ${loginResponse}`)

  //     // const token = jwt.verify(
  //     //   loginResponse.data.loginWallet.token,
  //     //   process.env.GATSBY_JWT_SECRET
  //     // )
  //     // console.log(`token : ${JSON.stringify(token, null, 2)}`)
  //     // web3.eth.getBalance(user.publicAddress).then(setBalance)
  //     console.log('setting balance to zero')
  //     setBalance(0)
  //     window.location = process.env.GATSBY_BASE_URL
  //   } catch (error) {
  //     console.error(`error1  : ${JSON.stringify(error, null, 2)}`)
  //   }
  // }

  const SetView = () => {
    switch (selectedView) {
      case 'My Account':
        return <MyAccount />
      case 'My Projects':
        return <MyProjects />
      case 'My Donations':
        return <MyDonations />
      default:
        return null
    }
  }

  return (
    <div>
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
      <Flex sx={{ mx: '5%', fontFamily: 'heading' }}>
        <Box sx={{ width: '30%' }}>
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
          <Box sx={{ mt: '70px' }}>
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
        <Box sx={{ width: '70%', mt: '140px' }}>
          <SetView />
        </Box>
      </Flex>
      <Footer />
    </div>
  )
}

export default AccountPage
