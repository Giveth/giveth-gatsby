/**
 * Decorative images
 */
// import React from 'react'
// import givethHeroSide from '../../images/decorator-leaf.svg'
// import co2kenHeroSide from ''
import givethHeroMain from '../../images/people-header.svg'
import co2kenHeroMain from '../../images/tree-planting.jpg'
import styled from '@emotion/styled'

const siteId = process.env.GATSBY_SITE_ID

let heroMain
if (siteId === 'giveth') {
  heroMain = givethHeroMain
} else if (siteId === 'co2ken') {
  heroMain = co2kenHeroMain
}
const HeroImage = styled.div`
  width: 50vw;
  height: 80vh;
  background: url(${heroMain});
  background-position: left top;
  background-repeat: no-repeat;
`
export default HeroImage
