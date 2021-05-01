/**
 * Decorative images
 */
import React from 'react'
import { jsx } from 'theme-ui'
import givethHeroSide from '../../images/decorator-leaf.svg'
// import co2kenHeroSide from ''

const siteId = process.env.GATSBY_SITE_ID

let heroSide
if (siteId === 'giveth') {
  heroSide = givethHeroSide
} else if (siteId === 'co2ken') {
  heroSide = givethHeroSide
}
const HeroSide = () => {
  //if (!heroSide) return null
  return (
    <img
      src={heroSide}
      alt=''
      sx={{ position: 'absolute', bottom: '10vh', left: '-70px' }}
    />
  )
}
export default HeroSide
