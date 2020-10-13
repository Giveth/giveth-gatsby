/** @jsx jsx */
import React from 'react'
import { Box, Grid, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../gatsby-plugin-theme-ui/index'
import { useQuery } from '@apollo/react-hooks'

import OnlyCrypto from '../components/donate/onlyCrypto'
import OnlyFiat from '../components/donate/onlyFiat'
import Success from '../components/donate/success'
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

// CONSTANTS

const CRYPTO = 'Cryptocurrency'
const CREDIT = 'Credit Card'

const LEFT_BOX_STYLE = {
  borderTopLeftRadius: '0.2rem',
  borderBottomLeftRadius: '0.2rem'
}
const RIGHT_BOX_STYLE = {
  borderTopRightRadius: '0.2rem',
  borderBottomRightRadius: '0.2rem'
}

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

const Share = styled.div``

const SocialIcons = styled.div`
  display: flex;
  margin: 1rem 0;
  * {
    margin: 0 0.3rem;
  }
`

const Options = styled.div`
  display: flex;
  width: 100%;
  min-width: 29.25rem;
  flex-direction: row;
  border: 0.125rem solid white;
  box-sizing: border-box;
  border-radius: 0.375rem;
  margin: 2.063rem 0 0 0;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    min-width: 20rem;
  }

  @media (max-width: 800px) {
    width: 100%;
    align-self: center;
    margin: 2.063rem 0;
  }
`

const OptionTypesBox = styled(Box)`
  cursor: pointer;
  width: 50%;
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

const ShowProject = props => {
  const { location, project } = props
  const [paymentType, setPaymentType] = React.useState(CREDIT)
  const [isAfterPayment, setIsAfterPayment] = React.useState(null)
  const [paymentSessionId, setPaymentSessionId] = React.useState(null)

  const url =
    location.href && location.href && location.protocol === 'https:'
      ? location.href
      : 'http://v2.giveth.io/'
  const shareTitle = 'Make a donation today!'
  const address = '0x000000000000000000000000000'

  React.useEffect(() => {
    // Check type
    const search = getUrlParams(props?.location?.search)
    console.log({ search }, props.location)
    setIsAfterPayment(search?.success === 'true')
    if (search?.sessionId) setPaymentSessionId(search?.sessionId)
  }, [])

  // TODO: Implement this on a utils file
  function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    return hashes.reduce((params, hash) => {
      let [key, val] = hash.split('=')
      return Object.assign(params, { [key]: decodeURIComponent(val) })
    }, {})
  }

  function PaymentOptions() {
    const ShowPaymentOption = () => {
      return paymentType === CRYPTO ? (
        <OnlyCrypto project={project} address={address} />
      ) : (
        <OnlyFiat project={project} />
      )
    }

    const OptionType = ({ title, subtitle, style }) => {
      const isSelected = title === paymentType
      const textColor = isSelected ? theme.colors.secondary : 'white'
      return (
        <OptionTypesBox
          onClick={() => setPaymentType(title)}
          style={{
            backgroundColor: isSelected ? 'white' : theme.colors.secondary,
            ...style
          }}
        >
          <Text
            sx={{
              variant: 'text.medium',
              color: textColor,
              fontWeight: 'bold'
            }}
          >
            {title}
          </Text>
          <Text sx={{ variant: 'text.small', color: textColor }}>
            {subtitle}
          </Text>
        </OptionTypesBox>
      )
    }

    return (
      <>
        <Text sx={{ variant: 'headings.h5' }}>Donate With</Text>
        <Options>
          <OptionType
            title={CREDIT}
            subtitle='2.9% + 0.30 USD'
            style={RIGHT_BOX_STYLE}
          />
          <OptionType
            title={CRYPTO}
            subtitle='Zero Fee'
            style={LEFT_BOX_STYLE}
          />
        </Options>
        <ShowPaymentOption />
      </>
    )
  }

  const ShareIcons = ({ message, centered }) => {
    return (
      <Share
        style={{
          textAlign: centered && 'center'
        }}
      >
        <Text sx={{ variant: 'text.medium' }}>{message}</Text>
        <SocialIcons
          style={{
            justifyContent: centered ? 'center' : 'flex-start'
          }}
        >
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
    )
  }

  if (isAfterPayment) {
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
        </ProjectContainer>
        <Payment>
          <Success sessionId={paymentSessionId} />
          <div style={{ margin: '3rem 0' }}>
            <ShareIcons message='Share this with your friends!' />
          </div>
        </Payment>
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
        <ShareIcons message="Can't donate? Share this page instead." centered />
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
        {error ? (
          <Text>Error</Text>
        ) : loading ? (
          <Text>loading</Text>
        ) : data?.project?.length > 0 ? (
          <ShowProject {...props} project={data.project[0]} />
        ) : (
          <ProjectNotFound />
        )}
      </Content>
    </Layout>
  )
}

export default Donate
