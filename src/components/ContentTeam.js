/** @jsx jsx */
import { jsx, Text } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'

import React from 'react'
import styled from '@emotion/styled'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const ContentContainer = styled.div`
  padding: 10vh 0;
  max-width: 960px;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 650px) {
    padding: 3rem 0;
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  grid-gap: 5rem;

  @media (max-width: 990px) {
    grid-template-columns: repeat(2, auto);
    grid-gap: 1rem 0.5rem;
    justify-items: center;
    padding-bottom: 1rem;
  }
`

const ContentItem = styled.div`
  max-width: 200px;
  margin: 1rem;
  display: grid;
  grid-template-rows: auto;

  :hover {
    .placeholder {
      opacity: 0.9;
    }
  }
`

const Headline1 = styled(Text)`
  justify-self: center;
  align-self: end;
  text-align: center;
  grid-row: 1;
  @media (max-width: 990px) {
    justify-self: center;
  }
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`
const Badge = styled(Text)`
  grid-row: 2;
  max-width: 70%;
  justify-self: center;
  padding: 3px 11.76px;
  margin: 0.3rem 0.2rem;
  text-align: center;
  border: 1px solid ${theme.colors.bodyLight};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
`

const Headline2 = styled.h5`
  justify-self: start;
  align-self: end;
  @media (max-width: 990px) {
    justify-self: center;
  }
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const ContentFooter = styled.div`
  bottom: 0;
  display: grid;
  grid-template-rows: repeat(3, auto);
  .social {
    filter: saturate(1);
    font-size: 2rem;
    & :hover {
      filter: saturate(0);
    }
  }
`

const Social1 = styled.a`
  grid-row: 4;
  grid-column: 1;
  justify-self: center;
  position: relative;
  right: 1.5rem;
  color: ${theme.colors.secondary};
`

const Social2 = styled.a`
  font-size: 24px;
  grid-row: 4;
  grid-column: 1;
  justify-self: center;
  position: relative;
  left: 1.5rem;
  color: ${theme.colors.secondary};
`
const PortraitHelper = styled.div`
  width: 135px;
  height: 135px;
  overflow: hidden;
  border-radius: 50%;
  justify-self: center;
`

const Portrait = styled.img`
  width: 100%;
`

const ContentTeam = ({ headerdata }) => (
  <ContentContainer>
    <Content>
      {headerdata.map(edges => (
        <ContentItem key={edges.node.id}>
          <PortraitHelper>
            <Portrait src={edges.node.portrait.file.url} />
          </PortraitHelper>
          <ContentFooter className='placeholder'>
            <Headline1 sx={{ variant: 'headings.h5', color: 'secondary' }}>
              {edges.node.headline1}
            </Headline1>

            <Badge sx={{ variant: 'text.overlineSmall' }}>
              {edges.node.headline2}
            </Badge>

            <Text
              sx={{
                variant: 'text.default',
                width: '260px',
                textAlign: 'center'
              }}
            >
              Kane conceived Batman in early 1939 to capitalize on the
              popularity of DC's Superman; although Kane frequently claimed sole
              creation credit, Finger substantially developed the concept from a
              generic superhero into something more bat-like.{' '}
            </Text>
            <Social1
              href={edges.node.socialTwitter}
              className='social'
              target='blank'
            >
              <FaTwitter size={'24px'} />
            </Social1>
            <Social2
              href={edges.node.socialMedium}
              className='social'
              target='blank'
            >
              <FaGithub size={'24px'} />
            </Social2>
          </ContentFooter>
        </ContentItem>
      ))}
    </Content>
  </ContentContainer>
)

export default ContentTeam
