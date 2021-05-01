/**
 * Decorative images
 */
import Image from 'next/image'
import givethHeroSide from '../../images/decorator-leaf.svg'
// import co2kenHeroSide from ''
import givethHeroMain from '../../images/people-header.svg'
import styled from '@emotion/styled'

const siteId = process.env.GATSBY_SITE_ID

let heroMain
if (siteId === 'giveth') {
  heroMain = <Image alt='tree planting' src='/images/tree-planting.jpg' />
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
