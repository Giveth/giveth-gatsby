import React from 'react'
import { Flex, Text } from 'theme-ui'
import Modal from 'react-modal'

import decoratorClouds from '../images/decorator-clouds.svg'
import metamaskLogo from '../images/logos/metamask-fox.svg'

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(2px)',
    '-webkit-backdrop-filter': 'blur(2px)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '12px',
    borderColor: 'transparent',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

function LoginModal (props) {
  React.useEffect(() => {
    Modal.setAppElement('body')
  })
  return (
    <div>
      <Modal
        isOpen={!!props.isOpen}
        onRequestClose={() => props.close()}
        style={customStyles}
        contentLabel='Sign In Metamask Modal'
      >
        <Flex
          sx={{
            flexDirection: 'column',
            width: '645px',
            minHeight: '420px'
          }}
        >
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
            onClick={e => {
              e.preventDefault()
              props.close()
            }}
          >
            Close
          </Text>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: 4
            }}
          >
            <Text sx={{ variant: 'headings.h4', color: 'secondary', pt: 5 }}>
              Connecting to Metamask
            </Text>
            <Text sx={{ variant: 'text.large', color: 'secondary', my: 4 }}>
              Please confirm sign in through your MetaMask popup window.
            </Text>
            <img
              src={metamaskLogo}
              alt='Metamask logo'
              style={{
                flex: 0.2,
                width: '96px',
                height: '96px'
              }}
            />
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default LoginModal
