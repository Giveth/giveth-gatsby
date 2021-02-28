/** @jsx jsx */
//import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'

// import decorative graphics
import heroImage from '../../images/people-highfive.svg'

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  align-items: end;
  @media (max-width: '850px') {
    grid-template-columns: 1fr;
  }
`

const HeroImage = styled.img`
  padding-right: 3rem;
`

const HeroText = styled(Grid)`
  grid-template-rows: auto;
  justify-self: center;
  @media (max-width: '850px') {
  }
`

const Hero = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })
  return (
    <HeroSection>
      <HeroText
        p={['10px', null, '80px']}
        sx={{ width: ['95%', '50%', '80%'] }}
      >
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
          Join our Community{' '}
        </Heading>
        <Text
          pt={1}
          sx={{
            variant: 'text.large',
            color: 'secondary',
            lineHeight: 'taller'
          }}
        >
          Community of Makers, Building the Future of Giving
        </Text>
        <Text pt={4} sx={{ variant: 'text.default' }}>
          We are first and foremost a Community, and we need you, because we
          believe you are a Maker. We are an open-source decentralized and
          community-led project, so join us today, become a part of our
          ever-growing comunity.
        </Text>
      </HeroText>
      {isMobile ? null : <HeroImage src={heroImage} alt='' />}
    </HeroSection>
  )
}

export default Hero
