import React from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import Modal from './modal'
import { useWallet } from '../contextProvider/WalletProvider'
import { PopupContext } from '../contextProvider/popupProvider'
import decoratorClouds from '../images/decorator-clouds.svg'
import signupBg from '../images/popup1.png'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

function WelcomePopup ({ close }) {
  const { isLoggedIn, login } = useWallet()

  if (isLoggedIn) {
    close()
    return null
  }
  return (
    <Flex sx={{ flexDirection: 'column', width: '645px' }}>
      <img
        src={decoratorClouds}
        alt='signup-clouds'
        style={{ position: 'absolute', left: '5%', padding: '2rem 0' }}
      />
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
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Text sx={{ variant: 'headings.h4', pt: 6 }}>Welcome to Giveth</Text>
        <Text sx={{ variant: 'text.default' }}>
          Please Sign in to your account and start using Giveth.
        </Text>
        <Button
          mt={4}
          sx={{
            width: '290px',
            variant: 'buttons.default'
          }}
          onClick={() => {
            try {
              close()
              login()
            } catch (error) {
              console.log({ error })
            }
          }}
        >
          SIGN IN
        </Button>
      </Box>
      <img src={signupBg} style={{ width: '100%' }} alt='signup-bg' />
    </Flex>
  )
}

function SharePopup () {
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
    </Flex>
  )
}

function Popup () {
  const usePopup = React.useContext(PopupContext)
  const { value, clearPopup } = usePopup
  const setView = () => {
    switch (value?.type) {
      case 'Welcome':
        return <WelcomePopup close={clearPopup} />
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
