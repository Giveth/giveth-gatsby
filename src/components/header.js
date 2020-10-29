/** @jsx jsx */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useMutation } from '@apollo/react-hooks'
import { DO_LOGIN } from '../apollo/gql/auth'
import Loadable from '@loadable/component'
import { IconButton, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import theme from '../gatsby-plugin-theme-ui/index'

// import graphics
import logo from '../images/giveth-logo-blue.svg'
import iconVerticalLine from '../images/icon-vertical-line.svg'
import iconSearch from '../images/icon-search.svg'
import decoratorCloud1 from '../images/decorator-cloud1.svg'
import decoratorCloud2 from '../images/decorator-cloud2.svg'

const HeaderContainer = styled.header`
  transition: 0.8s;

  &.HeaderPlaceholderNotScrolled {
    height: 240px;
    @media (max-width: 700) {
      height: 160px;
    }
  }

  &.HeaderPlaceholderScrolled {
    height: 112px;
  }
`

const HeaderSpan = styled.nav`
  position: fixed;
  margin: 0 auto;
  padding: 80px;
  max-width: 100vw;
  top: 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: ${theme.colors.background};
  width: 100%;
  transition: 0.8s;
  z-index: 200;
  backdrop-filter: blur(30px);
  .hide {
    transition: 0.8s;
    opacity: 1;
  }

  &.HeaderScrolled {
    background: ${theme.colors.headerbackground};
    padding: 1rem 80px;

    .hide {
      opacity: 0;
    }

    @media (max-width: 700px) {
      padding: 25px;
    }
  }

  @media (max-width: 1030px) {
    padding: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  @media (max-width: 700px) {
    padding: 25px;
    grid-template-columns: auto 1fr;
  }
`

const LogoSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: start;

  @media (max-width: 1030px) {
    grid-column: 1;
    grid-row: 1;
  }
`

const MiddleSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 1em;
  justify-self: center;
  max-width: 290px;
  @media (max-width: 1030px) {
    grid-column: 2;
    grid-row: 2;
  }
`

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

const NavLink = styled(Link)`
  text-decoration: none;
  font-family: 'Red Hat Display', sans-serif;
  color: ${theme.colors.primary};
  :hover {
    color: ${theme.colors.accent};
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

const Decorator = styled.div`
  position: absolute;
`

const Login = Loadable(() => import('./torus/login'))

const Header = ({ siteTitle, isHomePage }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const [hasScrolled, setScrollState] = useState(false)
  const [doLogin] = useMutation(DO_LOGIN)
  // const [doRegister] = useMutation(DO_REGISTER)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    function handleScroll () {
      const scrollTop = window.pageYOffset

      if (scrollTop > 50) {
        setScrollState(true)
      } else {
        setScrollState(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return function cleanup () {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const onLogin = async (signedMessage, userAddress, userEmail) => {
    console.log('onLogin > doinglogin')
    try {
      const loginResponse = await doLogin({
        variables: {
          walletAddress: userAddress,
          signature: signedMessage,
          email: userEmail
        }
      })

      console.log(`didlogin - loginResponse ---> : ${loginResponse}`)

      // const token = jwt.verify(
      //   loginResponse.data.loginWallet.token,
      //   process.env.GATSBY_JWT_SECRET
      // )
      // console.log(`token : ${JSON.stringify(token, null, 2)}`)
      // web3.eth.getBalance(user.publicAddress).then(setBalance)
      console.log('setting balance to zero')
      setBalance(0)
      window.location = process.env.GATSBY_BASE_URL
    } catch (error) {
      console.error(`error1  : ${JSON.stringify(error, null, 2)}`)
    }
  }

  return (
    <HeaderContainer
      className={
        hasScrolled || !isHomePage
          ? 'HeaderPlaceholderScrolled'
          : 'HeaderPlaceholderNotScrolled'
      }
      style={{
        marginBottom: '1.45rem'
      }}
    >
      <HeaderSpan
        className={hasScrolled || !isHomePage ? 'HeaderScrolled' : ''}
      >
        {!isMobile ? (
          <Decorator>
            <img
              src={decoratorCloud1}
              alt=''
              sx={{
                position: 'absolute',
                top: '-70px',
                left: '300px'
              }}
              className='hide'
            />
            <img
              src={decoratorCloud2}
              alt=''
              sx={{
                position: 'absolute',
                top: '-80px',
                left: '92vw'
              }}
              className='hide'
            />
          </Decorator>
        ) : null}
        <Link
          to='/'
          sx={{
            textDecoration: 'none'
          }}
        >
          {isMobile ? (
            <img src={logo} alt='logo' width='40px' height='40px' />
          ) : (
            <LogoSpan>
              {hasScrolled || !isHomePage ? (
                <img src={logo} alt='logo' width='50px' height='50px' />
              ) : (
                <img src={logo} alt='logo' width='80px' height='80px' />
              )}
              <Text
                pl={3}
                sx={{
                  variant: 'text.default',
                  color: 'secondary',
                  fontSize: 3,
                  fontWeight: 'medium',
                  textDecoration: 'none'
                }}
              >
                THE FUTURE OF GIVING
              </Text>
            </LogoSpan>
          )}
        </Link>

        <MiddleSpan>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/causes'>Causes</NavLink>
          <NavLink to='/projects'>Projects</NavLink>
        </MiddleSpan>

        <UserSpan>
          {isMobile ? null : (
            <span>
              <CreateLink to='/create'>Create a project</CreateLink>
              <IconButton>
                <img src={iconSearch} alt='' />
              </IconButton>
            </span>
          )}
          <img src={iconVerticalLine} alt='' />
          <Login onLogin={onLogin} balance={balance} />
        </UserSpan>
      </HeaderSpan>
    </HeaderContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
