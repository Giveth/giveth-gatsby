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
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`

const HeroText = styled(Box)`
  position: absolute;
  @media (max-width: 850px) {
    position: static;
    justify-content: center;
    padding: 1rem;
    text-align: center;
  }
`
const Hero = ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return (
    <HeroSection>
      {isMobile ? null : <HeroSideImage />}
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
            width: ['100%', null, '100%'],
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
            width: ['100%', '60%', '70%'],
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          {content.mainText}
        </Text>
        <Grid
          rows={2}
          sx={{
            justifyContent: ['center', 'start', 'start']
          }}
        >
          <Link
            to='/projects'
          >
            <Button
              mt={[4, 5, 5]}
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
              justifySelf: ['center']
            }}
          >
            <Text>
              {content.mainButtonText}
            </Text>
          </Link>
        </Grid>
      </HeroText>
      <Box sx={{ minHeight: [null, null, '100vh'] }}>
        {isMobile ? null : <HeroImage alt='' />}
      </Box>
    </HeroSection>
  )
}

export default Hero
