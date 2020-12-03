import React from 'react'
import logo from '../images/giveth-logo-blue.svg'
import coTookenLogo from '../images/co2ken-logo.png'

const Logo = props => {
  let siteLogo
  const siteId = process.env.GATSBY_SITE_ID

  if (siteId === 'giveth') {
    siteLogo = logo
  } else if (siteId === 'co2ken') {
    siteLogo = coTookenLogo
  }
  return <img src={siteLogo} alt='logo' />
}

export default Logo
