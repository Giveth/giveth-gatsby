import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Loadable from '@loadable/component'
import {
  Grid,
  Box,
  Button,
  Heading,
  IconButton,
  Text,
  ThemeProvider
} from 'theme-ui'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'
import logo from '../images/giveth-logo-blue.svg'

import iconUser from '../images/icon-user.svg'
import iconVerticalLine from '../images/icon-vertical-line.svg'
import iconSearch from '../images/icon-search.svg'

const HeaderSpan = styled.nav`
  margin: 0 auto;
  padding: 80px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  background-color: ${theme.colors.background};
  @media (max-width: 850px) {
    padding: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
`

const LogoSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(2, auto);
  max-width: 290px;
  align-items: center;
`

const MiddleSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 1em;
  justify-self: center;
  max-width: 290px;
`

const UserSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(4, auto);
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  & :hover {
    transform: scale(1.2);
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
    transform: scale(1);
  }
`

const Login = Loadable(() => import('../components/login'))

const Header = ({ siteTitle }) => (
  <ThemeProvider theme={theme}>
    <header
      style={{
        marginBottom: `1.45rem`
      }}
    >
      <HeaderSpan>
        <LogoSpan>
          <img src={logo} alt="logo" width="80px" height="80px" />
          <Text sx={{ variant: 'text.large', color: 'secondary', fontSize: 4 }}>
            The future of giving
          </Text>
        </LogoSpan>
        <MiddleSpan>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/causes">Causes</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </MiddleSpan>
        <UserSpan>
          <CreateLink to="/">Create a project</CreateLink>
          <IconButton>
            <img src={iconSearch} alt={''} />
          </IconButton>
          <img src={iconVerticalLine} alt={''} />
          <Login />
        </UserSpan>
      </HeaderSpan>
    </header>
  </ThemeProvider>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
