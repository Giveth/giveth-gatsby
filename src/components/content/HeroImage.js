/**
 * Decorative images
 */

import styled from '@emotion/styled'

const siteId = process.env.NEXT_PUBLIC_SITE_ID

let heroMain
if (siteId === 'giveth') {
  heroMain = '/images/people-header.svg'
} else if (siteId === 'co2ken') {
  heroMain = '../../images/decorator-leaf.svg'
}

const HeroImage = styled.div`
  position: absolute;
  right: 0;
  width: 50vw;
  height: 80vh;
  background: url('${heroMain}');
  background-position: left top;
  background-repeat: no-repeat;
`
export default HeroImage
