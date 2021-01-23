/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import './global.css'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider, Box, Button, Flex, Image, Text } from 'theme-ui'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-mui'
import InfoIcon from '../images/info_outline.png'
import CornerLeave from '../images/corner-leave.png'
import theme from '../gatsby-plugin-theme-ui/index'
import Header from './header'
import { FaGithub } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
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
  z-index: 4;
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
  const [cookiesAccepted, setCookiesAccepted] = React.useState('none')

  React.useEffect(() => {
    const accepted =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('cookiesAccepted')
    console.log({ accepted })
    setCookiesAccepted(accepted)
  }, [])
  if (cookiesAccepted || cookiesAccepted === 'none') return null
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

const GithubIssue = () => {
  const [showIssuePopup, setShowIssuePopup] = React.useState(true)
  if (!showIssuePopup) return null
  return (
    <Flex
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 4,
        m: 4,
        borderRadius: '12px',
        backgroundColor: 'background',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)'
      }}
    >
      <Flex
        sx={{
          padding: ['25px 18px', '25px 10px', '25px 10px'],
          width: ['100%', '80%', '80%'],
          textAlign: 'center',
          flexDirection: 'column'
        }}
      >
        <Text variant='headings.h5' mb={1} color='secondary'>
          Give feedback
        </Text>
        <Text variant='text.default' color='secondary' mb={2}>
          Share your feedback or report an issue
        </Text>
        <Button
          type='button'
          aria-label='edit project name'
          variant='nofill'
          onClick={() =>
            (window.location.href =
              'https://github.com/Giveth/giveth-2/issues/new/choose')
          }
          sx={{
            variant: 'buttons.secondary',
            alignItems: 'center'
          }}
        >
          <Flex
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2
            }}
          >
            <FaGithub size='23.43px' color={theme.colors.background} />
            <Text
              variant='text.default'
              color='background'
              pl={2}
              sx={{ fontSize: '14px', fontWeight: 700 }}
            >
              GIVE FEEDBACK
            </Text>
          </Flex>
        </Button>
      </Flex>
      <Image
        src={CornerLeave}
        width={[60, 80, 80]}
        sx={{
          position: 'absolute',
          mb: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          borderBottomRightRadius: '12px'
        }}
      />
      <MdCancel
        onClick={() => setShowIssuePopup(false)}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px'
        }}
        size='20px'
        color={theme.colors.bodyLight}
      />
    </Flex>
  )
}

const Layout = ({ isHomePage, children, asDialog, noHeader, noFooter }) => {
  const APIKEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY
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
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places&v=weekly`}
          defer
        />
        <script type='text/javascript'>
          {`
          let map;
          function initMap(setLocation) {
              map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 0, lng: 0 },
                  zoom: 1,
                  mapTypeControl: false,
                  panControl: false,
                  zoomControl: false,
                  streetViewControl: false
              });
              // Create the autocomplete object and associate it with the UI input control.
              autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                {
                  types: ["geocode"],
                }  
              );
              places = new google.maps.places.PlacesService(map);
              autocomplete.addListener("place_changed",function(e){
                onPlaceChanged(setLocation);
              });
          }
          function onPlaceChanged(setLocation) {
            const place = autocomplete.getPlace();
            if (place) {
              if (place.geometry) {
                map.panTo(place.geometry.location);
                var marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.formatted_address
                });
                map.setZoom(13);
                setLocation(place.formatted_address)
              } else {
                document.getElementById("autocomplete").placeholder = "Search a Location";
              }
            }
          }
        `}
        </script>
      </Helmet>
      <TorusProvider>
        <ProveWalletProvider>
          <GlobalProvider>
            <ThemeProvider theme={theme}>
              <Provider template={AlertTemplate} {...AlertOptions}>
                <PopupProvider>
                  <GithubIssue />
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
