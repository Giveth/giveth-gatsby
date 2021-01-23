/** @jsx jsx */
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import HeroImage from '../content/HeroImage'
import HeroSideImage from '../content/HeroSideImage'
import givethHeroMain from '../../images/people-header.svg'
import co2kenHeroMain from '../../images/tree-planting.jpg'
// const siteId = process.env.GATSBY_SITE_ID

// console.log(`HeroImages : ${JSON.stringify(HeroImages, null, 2)}`)
// let heroMain
// if (siteId === 'giveth') {
//   heroMain = givethHeroMain
// } else if (siteId === 'co2ken') {
//   heroMain = co2kenHeroMain
// }
// import decorative graphics
import decoratorLeaf from '../../images/decorator-leaf.svg'
// import imgPeopleHeader from '../../images/people-header.svg'

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  position: relative;
  @media (max-width: '850px') {
    grid-template-columns: 1fr;
    min-height: 100vh;
  }
`

const HeroText = styled(Box)`
  position: absolute;
  @media (max-width: '850px') {
    position: static;
  }
`
const Hero = ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return (
    <HeroSection>
      <HeroSideImage></HeroSideImage>
      <div id='placeholder' />
      <HeroText p={['10px', null, '80px']}>
        {' '}
        <Heading
          sx={{
            variant: 'headings.h1',
            width: ['100%', null, null],
            fontWeight: 'regular',
            fontSize: ['8', '11', '11'],
            color: 'secondaryDark'
          }}
        >
          {content.mainHead}
        </Heading>
        <Heading
          sx={{
            variant: 'headings.h1',
            width: ['100%', null, '45%'],
            fontWeight: 'bold',
            fontSize: ['8', '11', '11'],
            color: 'secondaryDark'
          }}
        >
          {content.headBold}
        </Heading>
        <Text
          pt={4}
          pb={2}
          sx={{
            variant: 'text.large',
            width: ['95%', '50%', '45%'],
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          {content.mainText}
        </Text>
        <Grid
          rows={2}
          sx={{
            width: '290px'
          }}
        >
          <Link to='/projects'>
            <Button
              mt={4}
              p={4}
              sx={{
                width: '290px',
                variant: 'buttons.big'
              }}
            >
              {content.mainButton}
            </Button>
          </Link>
          <Link
            to='/create'
            sx={{
              variant: 'links.nav',
              justifySelf: 'center'
            }}
          >
            <Text
              sx={{
                justifySelf: 'center'
              }}
            >
              {content.mainButtonText}
            </Text>
          </Link>
        </Grid>
      </HeroText>
      <Box sx={{ minHeight: '100vh' }}>
        {isMobile ? null : <HeroImage alt='' />}
      </Box>
    </HeroSection>
  )
}

export default Hero
