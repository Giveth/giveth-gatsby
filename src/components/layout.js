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
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import theme from '../gatsby-plugin-theme-ui/index'
import Header from './header'
import TorusProvider from '../contextProvider/torusProvider'
import GlobalProvider from '../contextProvider/globalProvider'

import Dialog from './dialog'
import Footer from './footer'
import { Helmet } from 'react-helmet'
import ProveWalletProvider from '../contextProvider/proveWalletProvider'

const AlertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
}

const Layout = ({ isHomePage, children, asDialog, noHeader, noFooter }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const Template = () => {
    if (asDialog) {
      return <Dialog>{children}</Dialog>
    } else {
      return (
        <>
          {!noHeader ? (
            <Header
              siteTitle={data.site.siteMetadata.title}
              isHomePage={isHomePage}
            />
          ) : null}
          <div
            sx={{
              // applies width 100% to all viewport widths,
              // width 50% above the first breakpoint,
              // and 25% above the next breakpoint
              width: ['100%', '50%', '25%'],
              overflow: 'hidden'
            }}
          >
            <main>{children}</main>
            {!noFooter && <Footer />}
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Helmet>
        <script
          src='https://cdn.jsdelivr.net/npm/@toruslabs/torus-embed'
          crossOrigin='anonymous'
        />
      </Helmet>
      <TorusProvider>
        <ProveWalletProvider>
          <GlobalProvider>
            <ThemeProvider theme={theme}>
              <Provider template={AlertTemplate} {...AlertOptions}>
                <Template />
              </Provider>
            </ThemeProvider>
          </GlobalProvider>
        </ProveWalletProvider>
      </TorusProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
