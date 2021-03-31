/** @jsx jsx */
import React from 'react'
import { Flex, Box, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui/index'
import OnlyFiat from './onlyFiat'
import Success from './success'
import ProjectListing from '../projectListing'

import { useApolloClient } from '@apollo/client'
import { FETCH_PROJECT } from '../../apollo/gql/projects'

import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const OnlyCrypto = React.lazy(() => import('./onlyCrypto'))

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

const ProjectContainer = styled.div`
  width: 25vw;
  margin: 0 3.125rem 0 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 80vw;
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

const DonateIndex = props => {
  const { location, project } = props
  const [hashSent, setHashSent] = React.useState(false)
  const [paymentType, setPaymentType] = React.useState(CRYPTO)
  const [isAfterPayment, setIsAfterPayment] = React.useState(null)
  const [paymentSessionId, setPaymentSessionId] = React.useState(null)
  const [isCancelled, setIsCancelled] = React.useState(null)
  const client = useApolloClient()

  React.useEffect(() => {
    const checkProject = async () => {
      // GET PROJECT -- mainly to check status client side
      const { data: projectReFetched } = await client.query({
        query: FETCH_PROJECT,
        variables: { id: project?.id },
        fetchPolicy: 'network-only'
      })
      if (
        projectReFetched?.project?.length > 0 &&
        projectReFetched.project[0].status?.id !== '5'
      ) {
        setIsCancelled(true)
      }
    }
    // Check type
    checkProject()
    const search = getUrlParams(props?.location?.search)
    setIsAfterPayment(search?.success === 'true')
    if (search?.sessionId) setPaymentSessionId(search?.sessionId)
  }, [])

  // TODO: Implement this on a utils file
  function getUrlParams(search) {
    const hashes = search.slice(search.indexOf('?') + 1).split('&')
    return hashes.reduce((params, hash) => {
      const [key, val] = hash.split('=')
      return Object.assign(params, { [key]: decodeURIComponent(val) })
    }, {})
  }

  function PaymentOptions() {
    const isSSR = typeof window === 'undefined'

    const ShowPaymentOption = () => {
      return paymentType === CRYPTO && !isSSR ? (
        <React.Suspense fallback={<div />}>
          <OnlyCrypto project={project} setHashSent={val => setHashSent(val)} />
        </React.Suspense>
      ) : (
        <OnlyFiat project={project} />
      )
    }

    const OptionType = ({ title, subtitle, style }) => {
      const isSelected = title === paymentType
      const textColor = isSelected ? theme.colors.secondary : 'white'

      return (
        <OptionTypesBox
          onClick={() => {
            setPaymentType(title)
          }}
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
        <Text sx={{ variant: 'headings.h5', color: 'white' }}>Donate With</Text>
        <Options>
          <OptionType
            title={CRYPTO}
            subtitle='Zero Fees'
            style={RIGHT_BOX_STYLE}
          />
          <OptionType
            title={CREDIT}
            subtitle='Bank Fees'
            style={LEFT_BOX_STYLE}
          />
        </Options>
        <ShowPaymentOption />
      </>
    )
  }

  const ShareIcons = ({ message, centered }) => {
    const shareTitle = `Make a donation today to ${project?.title}!`
    const url = location.href

    return (
      <Share
        style={{
          textAlign: centered && 'center'
        }}
      >
        <Text sx={{ variant: 'text.medium', color: 'white' }}>{message}</Text>
        <SocialIcons
          sx={{
            justifyContent: centered ? 'center' : 'flex-start',
            '*': {
              outline: 'none'
            }
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
            summary={project?.description}
            url={url}
          >
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <FacebookShareButton quote={shareTitle} url={url} hashtag='#giveth'>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </SocialIcons>
      </Share>
    )
  }

  if (isCancelled) {
    return (
      <Flex sx={{ justifyContent: 'center', pt: 5 }}>
        <Text variant='headings.h4' sx={{ color: 'background' }}>
          Project Not Available
        </Text>
      </Flex>
    )
  }

  if (isAfterPayment || hashSent) {
    return (
      <>
        <ProjectContainer>
          <ProjectListing
            wholeClickable
            project={project}
            name={project?.title}
            description={project?.description}
            image={
              project?.image ||
              'https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
            }
            raised={1223}
            category={project?.categories || 'Blockchain 4 Good'}
            listingId='key1'
            key='key1'
          />
        </ProjectContainer>
        <Payment>
          <Success sessionId={paymentSessionId} hash={hashSent} />
          <div style={{ margin: '3rem 0', zIndex: 2 }}>
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
          wholeClickable
          name={project?.title}
          project={project}
          description={project?.description}
          image={
            project?.image ||
            'https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
          }
          raised={1223}
          categories={project?.categories}
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

export default DonateIndex
