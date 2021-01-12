import React from 'react'
import styled from '@emotion/styled'
import {
  FaMedium,
  FaComments,
  FaTwitter,
  FaGithub,
  FaReddit,
  FaFacebook,
  FaYoutube,
  FaWikipediaW,
  FaLinkedin
} from 'react-icons/fa'

import theme from '../../gatsby-plugin-theme-ui/index'

const SocialContainer = styled.div``

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24px, 1fr));
  justify-content: space-evenly;
  width: 344px;
`

const SocialLink = styled.a`
  width: 24px;
  justify-self: start;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  color: ${theme.colors.bodyDark};

  :hover {
    transform: scale(1.2) translateY(-3px);
    color: ${theme.colors.accent};
  }

  @media (max-width: 850px) {
    justify-self: center;
  }
`

const SocialNetworks = ({ compressed }) => {
  if (compressed) {
    return (
      <>
        <SocialLink href='https://twitter.com/givethio'>
          <FaTwitter size='30px' />
        </SocialLink>
        <SocialLink href='https://www.linkedin.com/company/givethio/about/'>
          <FaLinkedin size='30px' />
        </SocialLink>
        <SocialLink href='https://medium.com/giveth/'>
          <FaMedium size='30px' />
        </SocialLink>
        <SocialLink href='https://github.com/giveth'>
          <FaGithub size='30px' />
        </SocialLink>
      </>
    )
  }
  return (
    <SocialContainer>
      <LinkContainer>
        <SocialLink href='https://medium.com/giveth/'>
          <FaMedium size='24px' />
        </SocialLink>
        <SocialLink href='/join'>
          <FaComments size='24px' />
        </SocialLink>
        <SocialLink href='https://twitter.com/givethio'>
          <FaTwitter size='24px' />
        </SocialLink>
        <SocialLink href='https://github.com/giveth'>
          <FaGithub size='24px' />
        </SocialLink>
        <SocialLink href='https://reddit.com/r/giveth'>
          <FaReddit size='24px' />
        </SocialLink>
        <SocialLink href='https://facebook.com/givethio'>
          <FaFacebook size='24px' />
        </SocialLink>
        <SocialLink href='https://www.youtube.com/channel/UClfutpRoY0WTVnq0oB0E0wQ'>
          <FaYoutube size='24px' />
        </SocialLink>
        <SocialLink href='https://wiki.giveth.io'>
          <FaWikipediaW size='24px' />
        </SocialLink>
      </LinkContainer>
    </SocialContainer>
  )
}

export default SocialNetworks
