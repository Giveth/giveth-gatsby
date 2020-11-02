import React from 'react'
import styled from '@emotion/styled'
import { FaMediumM, FaTwitter } from 'react-icons/fa'

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
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  position: relative;

  @media (max-width: 990px) {
    grid-template-columns: repeat(2, auto);
    grid-gap: 1rem 0.5rem;
    justify-items: center;
    padding-bottom: 1rem;
  }
`

const ContentItem = styled.div`
  max-width: 400px;
  margin: 1rem;
  display: grid;
  grid-template-rows: auto;
  position: sticky;

  .placeholder {
    opacity: 0;
    transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  :hover {
    .placeholder {
      opacity: 0.9;
    }

    .saturate {
      filter: saturate(1);
      transform: translateY(-140px);
      transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  }
`

const Headline1 = styled.h2`
  justify-self: start;
  align-self: end;
  grid-row: 1;
  @media (max-width: 990px) {
    justify-self: center;
  }
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`
const Headline2 = styled.h5`
  justify-self: start;
  align-self: end;
  grid-row: 1;
  @media (max-width: 990px) {
    justify-self: center;
  }
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const ContentFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: grid;
  grid-row: 1;
  grid-template-rows: repeat(2, auto);
  grid-gap: 0 0.5rem;
  grid-template-columns: 1fr 2rem 2rem;
  .social {
    filter: saturate(0);
    font-size: 2rem;
    & :hover {
      filter: saturate(1);
    }
  }
`

const Social1 = styled.a`
  grid-row: 2;
  grid-column: 2;
  color: green;
`

const Social2 = styled.a`
  grid-row: 2;
  grid-column: 3;
  color: lightblue;
`

const Portrait = styled.img`
  filter: saturate(0);
  border-radius: 1rem;
`

const ContentTeam = ({ headerdata }) => (
  <ContentContainer>
    <Content>
      {headerdata.map(edges => (
        <ContentItem key={edges.node.id}>
          <Portrait src={edges.node.portrait.file.url} className='saturate' />
          <ContentFooter className='placeholder'>
            <Headline1>{edges.node.headline1}</Headline1>
            <Headline2>{edges.node.headline2}</Headline2>
            <Social1
              href={edges.node.socialMedium}
              className='social'
              target='blank'
            >
              <FaMediumM />
            </Social1>
            <Social2
              href={edges.node.socialTwitter}
              className='social'
              target='blank'
            >
              <FaTwitter />
            </Social2>
          </ContentFooter>
        </ContentItem>
      ))}
    </Content>
  </ContentContainer>
)

export default ContentTeam
