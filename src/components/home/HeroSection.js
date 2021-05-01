import { Grid, Box, Button, Heading, Text, jsx } from 'theme-ui'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import HeroImage from '../content/HeroImage'
import HeroSideImage from '../content/HeroSideImage'
// import givethHeroMain from '../../images/people-header.svg'
// import co2kenHeroMain from '../../images/tree-planting.jpg'
// const siteId = process.env.NEXT_PUBLIC_SITE_ID

// console.log(`HeroImages : ${JSON.stringify(HeroImages, null, 2)}`)
// let heroMain
// if (siteId === 'giveth') {
//   heroMain = givethHeroMain
// } else if (siteId === 'co2ken') {
//   heroMain = co2kenHeroMain
// }
// import decorative graphics
// import decoratorLeaf from '../../images/decorator-leaf.svg'
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
      {/* <HeroSideImage /> */}
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
          {content?.mainHead || 'Waiting for content'}
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
          {content?.headBold || 'Waiting for content'}
        </Heading>
        <Text
          pt={4}
          pb={2}
          sx={{
            variant: 'text.large',
            width: ['95%', '60%', '70%'],
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          {content?.mainText || 'Waiting for content'}
        </Text>
        <Grid
          rows={2}
          sx={{
            width: '290px'
          }}
        >
          <Link href='/projects'>
            <Button
              mt={4}
              p={4}
              sx={{
                width: '290px',
                variant: 'buttons.big'
              }}
            >
              {content?.mainButton || 'Waiting for content'}
            </Button>
          </Link>
          <Link
            href='/create'
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
              {content?.mainButtonText || 'Waiting for content'}
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
