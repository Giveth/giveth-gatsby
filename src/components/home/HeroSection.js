/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'

// import decorative graphics
import decoratorLeaf from '../../images/decorator-leaf.svg'
import imgPeopleHeader from '../../images/people-header.svg'

//Dynamic import https://v8.dev/features/dynamic-import
// ;(async loadContent () => {
//   const contentFile = `../content/${process.env.GATSBY_SITE_ID}.js`
//   const content = await import(contentFile)
//   console.log(`content.mainHead ---> : ${content.mainHead}`)
// })()

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  position: relative;
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
let x = 0
const Hero = ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return (
    <HeroSection>
      <img
        src={decoratorLeaf}
        alt=''
        sx={{ position: 'absolute', bottom: '10vh', left: '-70px' }}
      />
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
                variant: 'buttons.default'
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
      <Box sx={{ minHeight: '80vh' }}>
        {isMobile ? null : <HeroImage alt='' />}
      </Box>
    </HeroSection>
  )
}

export default Hero
