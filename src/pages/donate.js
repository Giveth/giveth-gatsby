/** @jsx jsx */
import { Grid, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'

import OnlyCrypto from '../components/donate/onlyCrypto'
import Layout from '../components/layout'
import ProjectListing from '../components/projectListing'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const Content = styled(Grid)`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`

const ProjectContainer = styled.div`
  width: 25rem;
  margin: 0 3.125rem 0 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3.125rem;
  @media (max-width: 800px) {
    width: 100%;
    margin: 3rem 0;
    padding: 0;
  }
`

const Share = styled.div`
  text-align: center;
`

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  * {
    margin: 0 0.7rem;
  }
`

const Donate = props => {
  const { location, project } = props

  const url =
    location.href && location.href && location.protocol === 'https:'
      ? location.href
      : 'http://v2.giveth.io/'
  const shareTitle = 'Make a donation today!'
  const address = '0x000000000000000000000000000'

  return (
    <Layout asDialog>
      <Content style={{ justifyItems: 'center' }}>
        <ProjectContainer>
          <ProjectListing
            disabled
            name='Giveth DAC'
            image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
            raised={1223}
            category='Blockchain 4 Good'
            listingId='key1'
            key='key1'
          />
          <Share>
            <Text sx={{ variant: 'text.medium' }}>
              Can't donate? Share this page instead.
            </Text>
            <SocialIcons>
              <TwitterShareButton
                title={shareTitle}
                url={url}
                hashtags={['giveth']}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <LinkedinShareButton
                title={shareTitle}
                summary='this is the summary'
                url={url}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <FacebookShareButton quote={shareTitle} url={url}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            </SocialIcons>
          </Share>
        </ProjectContainer>
        <Payment>
          <OnlyCrypto project={project} address={address} />
        </Payment>
      </Content>
    </Layout>
  )
}

export default Donate
