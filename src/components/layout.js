/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import Header from './header'
// import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        sx={{
          // applies width 100% to all viewport widths,
          // width 50% above the first breakpoint,
          // and 25% above the next breakpoint
          width: ['100%', '50%', '25%']
        }}
      >
        <main>{children}</main>
        <footer />
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
