import React from 'react'
import { Box, Button, Flex, Text } from 'theme-ui'
import Modal from './modal'
import { TorusContext } from '../contextProvider/torusProvider'
import { usePopup } from '../contextProvider/popupProvider'
import decoratorClouds from '../images/decorator-clouds.svg'
import signupBg from '../images/popup1.png'

function WelcomePopup({ close }) {
  const { login, isLoggedIn } = React.useContext(TorusContext)
  if (isLoggedIn) return null
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

function Popup() {
  const { value, clearPopup } = usePopup()
  const setView = () => {
    switch (value) {
      case 'Welcome':
        return <WelcomePopup close={clearPopup} />
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
