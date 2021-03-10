/** @jsx jsx */
import { Link } from 'gatsby'
import { Box, Grid, Text, jsx } from 'theme-ui'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import theme from '../gatsby-plugin-theme-ui/index'

// import graphics
import logo from '../images/giveth-logo-blue.svg'
import SocialNetworks from './content/SocialNetworks'

import { FiExternalLink } from 'react-icons/fi'

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 1440px;
`

const LinkBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 150px;
  line-height: 2;
  @media (max-width: 850px) {
    font-size: 12px;
    width: 100px;
  }
`

const FooterLink = styled(Link)`
  text-decoration: none;
  font-family: ${theme.fonts.heading}, sans-serif;
  color: ${theme.colors.bodyDark};
  :hover {
    color: ${theme.colors.accent};
  }
`

const FooterExternalLink = styled.a`
  text-decoration: none;
  font-family: ${theme.fonts.heading}, sans-serif;
  color: ${theme.colors.bodyDark};
  cursor: pointer;
  :hover {
    color: ${theme.colors.accent};
  }
`

const SiteLinks = styled(Grid)`
  grid-template-columns: auto 1fr auto;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    background-color: ${theme.colors.lightestBlue};
  }
`

const InnerGrid = styled(Grid)`
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  padding: 0 100px 0 100px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 100px);
    justify-content: center;
    padding: 0.5rem;
  }
`

const DonateSection = styled(Grid)``

const CreditsSection = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  padding-left: 140px;
  justify-content: space-around;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    justify-content: center;
    padding-left: 0;
    padding: 0.5rem;
  }
`

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  function romanize (num) {
    if (!+num) return false
    let digits = String(+num).split(''),
      key = [
        '',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX'
      ],
      roman = '',
      i = 3
    while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman
    return Array(+digits.join('') + 1).join('M') + roman
  }

  let currentTime = new Date()

  let strRomanDate = romanize(currentTime.getFullYear())

  return (
    <Container p={[0, 3, 5]} sx={{ position: 'relative' }}>
      <SiteLinks gap={0} pt={[1, 4, 6]}>
        {isMobile ? null : (
          <Link to='/'>
            <img src={logo} alt='logo' width='40px' height='40px' />
          </Link>
        )}
        <InnerGrid>
          <LinkBox>
            <FooterLink to='/'>Home</FooterLink>
            {/* <FooterLink to='/causes'>Causes</FooterLink> */}
            <FooterLink to='/projects'>Projects</FooterLink>
          </LinkBox>
          <LinkBox>
            <FooterLink to='/about'>About Us</FooterLink>
            <FooterLink to='/faq'>FAQ</FooterLink>
            <FooterLink to='/partnerships'>Partnerships</FooterLink>
            <FooterExternalLink
              href='https://docs.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Docs <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://wiki.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Wiki <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://medium.com/giveth'
              target='_blank'
              rel='noopener noreferrer'
            >
              Blog <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterLink to='/contact'>Contact</FooterLink>
            <FooterLink to='/tos'>Terms of Use</FooterLink>
          </LinkBox>
          <LinkBox>
            <FooterExternalLink
              href='https://beta.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Giveth TRACE <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://commonsstack.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              Commons Stack <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://wiki.giveth.io/governance/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Governance <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://galaxy.giveth.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Galaxy Projects <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://galaxy.giveth.io/#socialcoding'
              target='_blank'
              rel='noopener noreferrer'
            >
              Social Coding <FiExternalLink size='18px' />
            </FooterExternalLink>
            <FooterLink to='/join'>Join Our Community</FooterLink>
          </LinkBox>
        </InnerGrid>
        <DonateSection
          p={[1, 0, 0]}
          rows={2}
          sx={{
            justifyItems: ['center', 'center', 'start']
          }}
        >
          <SocialNetworks />
          <Text
            sx={{
              variant: 'text.medium',
              fontWeight: 'bold'
            }}
          >
            Support us{' '}
            <FooterLink
              to={`/donate/${theme.donationSlug}`}
              sx={{ variant: 'links.nav' }}
            >
              with your donation
            </FooterLink>
          </Text>
        </DonateSection>
      </SiteLinks>

      <CreditsSection
        pt={[1, 3, 6]}
        mb={[4, null, null]}
        sx={{
          alignContent: 'center'
        }}
      >
        <Text sx={{ justifySelf: ['center', 'start', 'start'] }}>
          {strRomanDate} - No Rights Reserved -{' '}
          <a
            href='https://wiki.giveth.io/dac/'
            sx={{ variant: 'links.light', justifySelf: 'center' }}
          >
            The Giveth DAC
          </a>
        </Text>
      </CreditsSection>
    </Container>
  )
}

export default Footer
