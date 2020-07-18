/** @jsx jsx */
import { jsx } from 'theme-ui'

import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import styled from '@emotion/styled'

import imgPeopleHeader from '../images/people-header.png'

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  @media (max-width: '850px') {
    grid-template-columns: 1fr;
    min-height: 100vh;
  }
`

const HeroImage = styled.div`
  width: 50vw;
  height: 80vh;
  background: url(${imgPeopleHeader});
  background-position: left top;
  background-repeat: no-repeat;
`

const HeroText = styled(Box)`
  position: absolute;
  @media (max-width: '850px') {
    position: static;
  }
`

const Hero = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })
  return (
    <HeroSection>
      <div id="placeholder"></div>
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
          Sustainable fundraising for
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
          social impact
        </Heading>
        <Text
          pt={4}
          pb={2}
          sx={{
            variant: 'text.large',
            width: ['100%', null, '45%'],
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          Our mission is to connect people, ideas, and resources to facilitate
          and incentivize social impact with a transparent framework for
          distributing funds.
        </Text>
        <Grid
          rows={2}
          sx={{
            width: '290px'
          }}
        >
          <Link to="/donate">
            <Button
              mt={4}
              p={4}
              sx={{
                width: '290px',
                variant: 'buttons.default'
              }}
            >
              Donate
            </Button>
          </Link>
          <Link
            to="/create"
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
              Start raising funds for your project
            </Text>
          </Link>
        </Grid>
      </HeroText>
      <Box sx={{ minHeight: ['100vh', '50vh', '80vh'] }}>
        {isMobile ? null : <HeroImage alt={''} />}
      </Box>
    </HeroSection>
  )
}

export default Hero
