import React from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import styled from '@emotion/styled'
import Modal from './modal'
import Link from 'next/link'
import Image from 'next/image'
import { useWallet } from '../contextProvider/WalletProvider'
import { PopupContext } from '../contextProvider/popupProvider'
import LoginModal from '../components/torus/loginModal'
import CopyToClipboard from '../components/copyToClipboard'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

function ChangeNetworkPopup({ close }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        py: 5,
        px: 4
      }}
    >
      <Text
        sx={{
          variant: 'text.default',
          cursor: 'pointer',
          position: 'absolute',
          right: '5%',
          top: '5%'
        }}
        onClick={close}
      >
        Close
      </Text>
      <Image
        src={'/images/decorator-exclamation.png'}
        style={{ alignSelf: 'center' }}
      />
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text color='secondary' variant='headings.h4' sx={{ mx: 4, pt: 4 }}>
          Please change the Network
        </Text>
        <Text
          color='secondary'
          variant='text.default'
          sx={{ mx: 4, width: '50%' }}
        >
          Please select the Ethereum Mainnet or xDAI network in your wallet and
          try again
        </Text>
      </Flex>
      <Button
        mt={4}
        sx={{
          width: '290px',
          variant: 'buttons.default',
          backgroundColor: 'secondary'
        }}
        onClick={() => {
          try {
            close()
          } catch (error) {
            console.log({ error })
          }
        }}
      >
        Ok, try again
      </Button>
      <Image
        src={'/images/worried_woman.png'}
        style={{ position: 'absolute', left: -4, bottom: 0 }}
      />
    </Flex>
  )
}

function WelcomeLoggedOutPopup({ close }) {
  const { isLoggedIn, login } = useWallet()

  if (isLoggedIn) {
    close()
    return null
  }
  return <LoginModal isOpen={true} close={close} login={login} />
}

function IncompleteProfilePopup({ close }) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        px: '36px',
        py: 5,
        textAlign: 'center'
      }}
    >
      <Image
        src={'/images/incomplete_profile.png'}
        style={{ width: '157px' }}
        alt='no-profile-bg'
      />
      <Text sx={{ variant: 'headings.h4', color: 'secondary', mt: 3 }}>
        Please complete your profile
      </Text>
      <Text
        sx={{
          variant: 'text.default',
          color: 'secondary',
          my: 3,
          width: '90%'
        }}
      >
        Please finish setting up your public profile before proceeding
      </Text>
      <Link href='/account'>
        <Button
          mt={4}
          sx={{
            width: '290px',
            variant: 'buttons.default',
            backgroundColor: 'secondary'
          }}
          onClick={() => {
            try {
            } catch (error) {
              console.log({ error })
            }
          }}
        >
          COMPLETE PROFILE
        </Button>
      </Link>
      <Text
        sx={{
          position: 'absolute',
          top: '15px',
          right: '32px',
          color: 'secondary',
          variant: 'text.default',
          cursor: 'pointer'
        }}
        onClick={close}
      >
        Close
      </Text>
    </Flex>
  )
}

function InsufficientFundsPopup({ close }) {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: '645px',
        height: '520px'
      }}
    >
      <Text
        sx={{
          variant: 'text.default',
          cursor: 'pointer',
          position: 'absolute',
          right: '5%',
          top: '5%'
        }}
        onClick={close}
      >
        Close
      </Text>
      <Box
        sx={{
          position: 'absolute',
          textAlign: 'center',
          top: '5%',
          py: 4,
          my: 4,
          ml: 4,
          mb: 6
        }}
      >
        <Image
          src={'/images/exclamation.png'}
          alt='exclamation'
          style={{
            width: '110px'
          }}
        />
        <Text sx={{ variant: 'headings.h4', color: 'secondary', py: 2 }}>
          Insufficient Funds
        </Text>
        <Text sx={{ variant: 'text.default', color: 'secondary' }}>
          Please add funds to your wallet or switch to a different wallet.
        </Text>
        <Button
          mt={4}
          sx={{
            width: '290px',
            variant: 'buttons.default',
            backgroundColor: 'secondary'
          }}
          onClick={close}
        >
          Ok
        </Button>
      </Box>
      <Image
        src={'/images/no_funds.png'}
        style={{
          width: '50%',
          position: 'absolute',
          right: -10,
          bottom: -10
        }}
        alt='signup-bg'
      />
    </Flex>
  )
}

function SharePopup() {
  const usePopup = React.useContext(PopupContext)
  const { value } = usePopup
  const { title, description, slug } = value?.extra
  const shareTitle = `Make a donation today to ${title}!`
  const url = `${window.location.origin}/project/${slug}`

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: 4,
        textAlign: 'center'
      }}
    >
      <Text sx={{ variant: 'text.large', color: 'secondary' }}>
        Share this project!
      </Text>
      <Flex
        sx={{
          pt: 4,
          justifyContent: 'space-around',
          '*': {
            outline: 'none'
          }
        }}
      >
        <TwitterShareButton title={shareTitle} url={url} hashtags={['giveth']}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton title={shareTitle} summary={description} url={url}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <FacebookShareButton quote={shareTitle} url={url} hashtag='#giveth'>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </Flex>
      <br />
      <CopyToClipboard size='18px' text={url}>
        <Text sx={{ variant: 'text.medium', color: 'bodyLight' }}>
          click to copy url
        </Text>
      </CopyToClipboard>
    </Flex>
  )
}

function Popup() {
  const usePopup = React.useContext(PopupContext)
  const { value, clearPopup } = usePopup
  const setView = () => {
    switch (value?.type) {
      case 'WelcomeLoggedOut':
        return <WelcomeLoggedOutPopup close={clearPopup} />
      case 'IncompleteProfile':
        return <IncompleteProfilePopup close={clearPopup} />
      case 'InsufficientFunds':
        return <InsufficientFundsPopup close={clearPopup} />
      case 'WrongNetwork':
        return <ChangeNetworkPopup close={clearPopup} />
      case 'share':
        return (
          <SharePopup
            title={value?.extra?.title}
            description={value?.extra?.description}
          />
        )
      default:
        return null
    }
  }
  return value ? (
    <Modal isOpen={value} onRequestClose={() => clearPopup()}>
      {setView()}
    </Modal>
  ) : null
}

export default Popup
