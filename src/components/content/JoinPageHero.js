import Link from 'next/link'
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
          Giveth is first and foremost a community. We are people working to
          build and give well the future we made together. Our project is
          open-source, decentralized, altruistic, and community-led. As you've
          made it this far, you are probably a Giver and a Maker too.
          <br />
          <br />
          Join one of our platforms below and introduce yourself, so we can
          welcome you!
        </Text>
      </HeroText>
      {isMobile ? null : <HeroImage src={heroImage} alt='' />}
    </HeroSection>
  )
}

export default Hero
