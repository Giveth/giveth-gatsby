/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider, Flex, Image, Text } from 'theme-ui'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import InfoIcon from '../images/info_outline.png'
import theme from '../gatsby-plugin-theme-ui/index'
import Header from './header'
import TorusProvider from '../contextProvider/torusProvider'
import GlobalProvider from '../contextProvider/globalProvider'
import { PopupProvider } from '../contextProvider/popupProvider'

import Dialog from './dialog'
import Footer from './footer'
import Popup from './popup'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProveWalletProvider from '../contextProvider/proveWalletProvider'
import styled from '@emotion/styled'

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__close-button {
    color: ${theme.colors.bodyDark};
  }
  .Toastify__toast {
    border-radius: 4px 0px 0px 4px;
    background-color: white;
  }
  .Toastify__toast--info {
    border-left: 6px solid ${theme.colors.blue};
  }
  .Toastify__toast--error {
    border-left: 6px solid ${theme.colors.red};
  }
  .Toastify__toast--success {
    border-left: 6px solid ${theme.colors.green};
  }
  .Toastify__toast--warning {
    border-left: 6px solid ${theme.colors.warnYellow};
  }
`

const AlertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
}

const CookieBanner = styled(Flex)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;
  text-align: center;
  align-self: center;
  background-color: ${theme.colors.lightBlue};
  border: 1px solid ${theme.colors.blue};
  box-sizing: border-box;
  border-radius: 8px;
  justify-content: space-between;
`

const CookiesBanner = () => {
  const [cookiesAccepted, setCookiesAccepted] = React.useState(
    typeof window !== 'undefined' &&
      window.localStorage.getItem('cookiesAccepted')
  )
  if (cookiesAccepted) return null
  // TODO: We may build this reusable for possible future banners on the app
  return (
    <CookieBanner
      sx={{
        flexDirection: ['column', 'row', 'row'],
        width: '100%'
      }}
    >
      <Flex
        sx={{ alignItems: 'center', flexDirection: ['column', 'row', 'row'] }}
      >
        <Image src={InfoIcon} sx={{ mb: [2, 0, 0] }} />
        <Text sx={{ color: 'blue', ml: 2, mb: [2, 0, 0] }}>
          This site uses cookies to provide you with an awesome user experience.
          By using it, you accept our <a>cookies policy</a>.
        </Text>
      </Flex>
      <Text
        onClick={() => {
          window.localStorage.setItem('cookiesAccepted', true)
          setCookiesAccepted(true)
        }}
        sx={{ cursor: 'pointer', variant: 'headings.h6', color: 'blue' }}
      >
        Ok
      </Text>
    </CookieBanner>
  )
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
      return (
        <Dialog>
          {children}
          <CookiesBanner />
        </Dialog>
      )
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
          <CookiesBanner />
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
                <PopupProvider>
                  <Template />
                  <Popup />
                </PopupProvider>
              </Provider>
            </ThemeProvider>
          </GlobalProvider>
        </ProveWalletProvider>
        <StyledToastContainer />
      </TorusProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
