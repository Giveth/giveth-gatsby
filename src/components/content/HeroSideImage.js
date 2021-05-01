/**
 * Decorative images
 */
import React from 'react'
import Image from 'next/image'
// import co2kenHeroSide from ''

const siteId = process.env.NEXT_PUBLIC_SITE_ID

let heroSide
if (siteId === 'giveth') {
  heroSide = '/images/decorator-leaf.svg'
} else if (siteId === 'co2ken') {
  heroSide = '/images/decorator-leaf.svg'
}
const HeroSide = () => {
  //if (!heroSide) return null
  // return null
  return (
    <Image
      src={heroSide}
      alt=''
      width='100%'
      height='100%'
      // sx={{ position: 'absolute', bottom: '10vh', left: '-70px' }}
    />
  )
}
export default HeroSide
