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
import { useMutation } from '@apollo/react-hooks'
import { DO_LOGIN } from '../apollo/gql/auth'

import Dialog from './dialog'
import Footer from './footer'

const AlertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
}

const Layout = ({ children, asDialog }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [doLogin] = useMutation(DO_LOGIN)

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
      // console.log(`setting balance to zero`)
      // setBalance(0)
      window.location = process.env.GATSBY_BASE_URL
    } catch (error) {
      console.error(`error1  : ${JSON.stringify(error, null, 2)}`)
    }
  }

  const Template = () => {
    if (asDialog) {
      return <Dialog>{children}</Dialog>
    } else {
      return (
        <>
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
            <Footer />
          </div>
        </>
      )
    }
  }

  return (
    <TorusProvider onLogin={onLogin}>
      <ThemeProvider theme={theme}>
        <Provider template={AlertTemplate} {...AlertOptions}>
          <Template />
        </Provider>
      </ThemeProvider>
    </TorusProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
