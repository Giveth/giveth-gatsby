import Link from 'next/link'
import Image from 'next/image'
import { Box, Grid, Text, jsx } from 'theme-ui'
import { useMediaQuery } from 'react-responsive'
import styled from '@emotion/styled'
import theme from '../utils/theme-ui'

// import graphics
import SocialNetworks from './content/SocialNetworks'

import { FiExternalLink } from 'react-icons/fi'

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width: 850) {
    margin-bottom: 0;
  }
`

const LinkBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 150px;
  line-height: 2;
  @media (max-width: 850px) {
    font-size: 10px;
    width: 100px;
  }
`

const FooterLink = styled.a`
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

const ExtIcon = styled(FiExternalLink)`
  size: 16px;
  @media (max-width: 850) {
    size: 8px;
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
    grid-template-columns: repeat(3, 80px);
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
    padding: 1rem;
    background-color: ${theme.colors.lightestBlue};
    text-align: center;
  }
`

const Footer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  function romanize(num) {
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
      <SiteLinks gap={0} p={[1, null, null]} pt={[1, 4, 6]}>
        {!isMobile && (
          <Link href='/'>
            <Image
              src={'/images/giveth-logo-blue.svg'}
              width='40px'
              height='40px'
            />
          </Link>
        )}
        <InnerGrid>
          <LinkBox>
            <FooterLink href='/'>Home</FooterLink>
            {/* <FooterLink href='/causes'>Causes</FooterLink> */}
            <FooterLink href='/projects'>Projects</FooterLink>
          </LinkBox>
          <LinkBox>
            <FooterLink href='/about'>About Us</FooterLink>
            <FooterLink href='/faq'>FAQ</FooterLink>
            <FooterLink href='/partnerships'>Partnerships</FooterLink>
            <FooterExternalLink
              href='https://docs.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Docs <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://wiki.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Wiki <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://medium.com/giveth'
              target='_blank'
              rel='noopener noreferrer'
            >
              Blog <ExtIcon />
            </FooterExternalLink>
            <FooterLink href='/contact'>Contact</FooterLink>
            <FooterLink href='/tos'>Terms of Use</FooterLink>
          </LinkBox>
          <LinkBox>
            <FooterExternalLink
              href='https://beta.giveth.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Giveth TRACE <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://commonsstack.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              Commons Stack <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://wiki.giveth.io/governance/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Governance <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://galaxy.giveth.io/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Galaxy Projects <ExtIcon />
            </FooterExternalLink>
            <FooterExternalLink
              href='https://galaxy.giveth.io/#socialcoding'
              target='_blank'
              rel='noopener noreferrer'
            >
              Social Coding <ExtIcon />
            </FooterExternalLink>
            <FooterLink href='/join'>Join Our Community</FooterLink>
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
              href={`/donate/${theme.donationSlug}`}
              sx={{ variant: 'links.nav' }}
            >
              with your donation
            </FooterLink>
          </Text>
        </DonateSection>
      </SiteLinks>

      <CreditsSection
        pt={[1, 3, 6]}
        pt={[3, 3, 6]}
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
