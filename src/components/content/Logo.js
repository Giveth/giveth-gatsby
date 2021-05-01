import React from 'react'
import Image from 'next/image'

const Logo = props => {
  let siteLogo
  const siteId = process.env.NEXT_PUBLIC_SITE_ID

  if (siteId === 'giveth') {
    siteLogo = '/images/giveth-logo-blue.svg'
  } else if (siteId === 'co2ken') {
    siteLogo = '/images/logos/co2ken-logo.png'
  }

  return <Image src={siteLogo} alt='logo' {...props} />
}

export default Logo
