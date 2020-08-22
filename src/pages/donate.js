/** @jsx jsx */
import React from 'react'
import { Box, Grid, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../gatsby-plugin-theme-ui/index'
import { useQuery } from '@apollo/react-hooks'

import OnlyCrypto from '../components/donate/onlyCrypto'
import Layout from '../components/layout'
import ProjectListing from '../components/projectListing'

import { FETCH_PROJECT } from '../apollo/gql/projects'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const CRYPTO = 'Cryptocurrency'
const CREDIT = 'Credit Card'

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

const Options = styled.div`
  display: flex;
  min-width: 20rem;
  flex-direction: row;
  border: 2px solid white;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 2.063rem 0 0 0;

  @media (max-width: 800px) {
    width: 100%;
    align-self: center;
    margin: 2.063rem 0;
  }
`

const OptionTypesBox = styled(Box)`
  cursor: pointer;
  width: 10rem;
  align-items: center;
  text-align: center;
  padding: 0.875rem 1.938rem;

  @media (max-width: 800px) {
    width: 50%;
  }
`

const ProjectNotFound = () => {
  return <Text>Project Not Found</Text>
}

const ShowProject = (props) => {
  const { location, project } = props
  const [paymentType, setPaymentType] = React.useState(CRYPTO)
  const url =
    location.href && location.href && location.protocol === 'https:'
      ? location.href
      : 'http://v2.giveth.io/'
  const shareTitle = 'Make a donation today!'
  const address = '0x000000000000000000000000000'

  function PaymentOptions () {
    const ShowPaymentOption = () => {
      return paymentType === CRYPTO ? (
        <OnlyCrypto project={project} address={address} />
      ) : (
        <Text sx={{ variant: 'text.large', mt: 4 }}>We are working on it :)</Text>
      )
    }

    const OptionType = ({ title, subtitle }) => {
      const isSelected = title === paymentType
      const textColor = isSelected ? theme.colors.secondary : 'white'
      return (
        <OptionTypesBox
          onClick={() => setPaymentType(title)} style={{ backgroundColor: isSelected ? 'white' : theme.colors.secondary }}
        >
          <Text sx={{ variant: 'text.medium', color: textColor, fontWeight: 'bold' }}>{title}</Text>
          <Text sx={{ variant: 'text.small', color: textColor }}>{subtitle}</Text>
        </OptionTypesBox>
      )
    }

    return (
      <>
        <Text sx={{ variant: 'headings.h5' }}>Donate With</Text>
        <Options>
          <OptionType title={CRYPTO} subtitle='Zero Fee' />
          <OptionType title={CREDIT} subtitle='3.5% Fee' />
        </Options>
        <ShowPaymentOption />
      </>
    )
  }

  return (
    <>
      <ProjectContainer>
        <ProjectListing
          disabled
          name={project?.title}
          description={project?.description}
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
        <PaymentOptions />
      </Payment>
    </>
  )
}

const Donate = props => {
  const { projectId } = props

  const { loading, error, data } = useQuery(FETCH_PROJECT, {
    variables: { id: projectId }
  })

  return (
    <Layout asDialog>
      <Content style={{ justifyItems: 'center' }}>
        {
          error ? <Text>Error</Text> : loading ? <Text>loading</Text>
            : data?.project?.length > 0 ? <ShowProject {...props} project={data.project[0]} /> : <ProjectNotFound />
        }
      </Content>
    </Layout>
  )
}

export default Donate
