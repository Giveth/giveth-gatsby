/** @jsx jsx */
import React, { useState } from 'react'
import { Link } from 'gatsby'
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
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'secondary' }}>My Account</Text>
              </a>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'primary' }}>My Projects(2)</Text>
              </a>
            </Link>
            <Link to='/' sx={{ textDecoration: 'none' }}>
              <a>
                <Text sx={{ mb: '8px', color: 'primary' }}>
                  My Donations(24)
                </Text>
              </a>
            </Link>
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
          <Flex>
            <Text>Profile image</Text>
            <Box sx={{ ml: '27px' }}>
              <Text sx={{ color: 'secondary', fontSize: 7 }}>Marko</Text>
              <Text sx={{ color: 'bodyDark', fontSize: 3 }}>account@email</Text>
            </Box>
          </Flex>
          <Flex sx={{ mt: '40px', alignItems: 'center' }}>
            <Text sx={{ textTransform: 'uppercase', fontSize: 0 }}>
              Wallet Address
            </Text>
            <Button
              type='button'
              sx={{
                color: 'primary',
                border: 0,
                background: 'unset',
                fontSize: 1
              }}
            >
              Change
            </Button>
          </Flex>
          <Text sx={{ mt: '14px' }}>
            0x712852005C0423db1511c59D20283092E4aB3a2A
          </Text>
          <Flex sx={{ mt: '40px' }}>
            <Box
              sx={{
                width: '30%',
                height: '100px',
                paddingTop: '20px',
                paddingLeft: '24px',
                backgroundColor: '#F4F6FC',
                borderRadius: '12px'
              }}
            >
              <Text
                sx={{
                  fontSize: 0,
                  color: 'secondary',
                  textTransform: 'uppercase'
                }}
              >
                My donations
              </Text>
              <Text sx={{ color: 'primary', fontSize: 7 }}>24</Text>
            </Box>
            <Box
              sx={{
                width: '30%',
                height: '100px',
                paddingTop: '20px',
                paddingLeft: '24px',
                backgroundColor: '#F4F6FC',
                borderRadius: '12px',
                ml: '5%'
              }}
            >
              <Text
                sx={{
                  fontSize: 0,
                  color: 'secondary',
                  textTransform: 'uppercase'
                }}
              >
                My projects
              </Text>
              <Text sx={{ color: 'primary', fontSize: 7 }}>3</Text>
            </Box>
          </Flex>
          <Box
            sx={{
              width: '65%',
              height: '100px',
              paddingTop: '20px',
              paddingLeft: '24px',
              backgroundColor: '#F4F6FC',
              borderRadius: '12px',
              mt: '24px'
            }}
          >
            <Text
              sx={{
                fontSize: 0,
                color: 'secondary',
                textTransform: 'uppercase'
              }}
            >
              Total value of assets in wallet
            </Text>
            <Flex sx={{ alignItems: 'baseline', paddingTop: '10px' }}>
              <Text
                sx={{ fontFamily: 'heading', color: 'secondary', fontSize: 7 }}
              >
                $128.640,40
              </Text>
              <Text
                sx={{
                  fontFamily: 'heading',
                  color: 'secondary',
                  fontSize: 3,
                  ml: '10%'
                }}
              >
                376.85 ETH
              </Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </div>
  )
}

export default AccountPage
