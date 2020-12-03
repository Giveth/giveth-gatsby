/** @jsx jsx */
import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { navigate, Link } from 'gatsby'
import Loadable from '@loadable/component'
import { IconButton, Text, jsx, Flex } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import theme from '../gatsby-plugin-theme-ui/index'
import Logo from './Logo'
// import graphics
import iconVerticalLine from '../images/icon-vertical-line.svg'
import iconSearch from '../images/icon-search.svg'
import decoratorCloud1 from '../images/decorator-cloud1.svg'
import decoratorCloud2 from '../images/decorator-cloud2.svg'

const HeaderContainer = styled.header`
  transition: max-height 0.8s ease;
  height: 140px;
  @media (max-width: 700) {
    height: 160px;
  }
`

const HeaderSpan = styled.nav`
  position: fixed;
  margin: 0 auto;
  padding: 80px 80px 0 80px;
  max-width: 100vw;
  top: 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: ${theme.colors.background};
  width: 100%;
  transition: padding 0.8s ease-out;
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

  img {
    width: 80px;
    height: 80px;
    transform: scale(1);
    transition: 0.8s all ease;
  }

  &.HeaderLogoScrolled img {
    transform: scale(0.7);
  }

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

const CreateLink = styled.div`
  cursor: pointer;
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
const siteId = process.env.SITE_ID
const Header = ({ siteTitle, isHomePage }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  const [hasScrolled, setScrollState] = useState(false)

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
  }, [])

  const goCreate = async () => {
    navigate('/create')
  }

  return (
    <HeaderContainer
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
            <Logo
              siteId={process.env.GATSBY_SITE_ID}
              alt=''
              width='40px'
              height='40px'
            />
          ) : (
            <LogoSpan
              className={hasScrolled || !isHomePage ? 'HeaderLogoScrolled' : ''}
            >
              <Logo alt='' width='auto' height='auto' />
              {siteId === 'giveth' ? (
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
              ) : (
                ''
              )}
            </LogoSpan>
          )}
        </Link>

        <MiddleSpan>
          <NavLink to='/'>Home</NavLink>
          {/* <NavLink to='/causes'>Causes</NavLink> */}
          <NavLink to='/projects'>Projects</NavLink>
        </MiddleSpan>

        <UserSpan>
          {isMobile ? null : (
            <Flex>
              <CreateLink onClick={goCreate}>Create a project</CreateLink>
              <IconButton>
                <img src={iconSearch} alt='' />
              </IconButton>
            </Flex>
          )}
          <img src={iconVerticalLine} alt='' />
          <Login />
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
