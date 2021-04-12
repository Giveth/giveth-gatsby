import React from 'react'
import { Flex, Text, Box } from 'theme-ui'
import styled from '@emotion/styled'
import Modal from 'react-modal'

import decoratorClouds from '../../images/decorator-clouds.svg'
import metamaskLogo from '../../images/logos/metamask-fox.svg'
import torusLogo from '../../images/logos/torus.svg'

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

const LongBtn = styled(Flex)`
  flex-direction: row;
  cursor: pointer;
  justify-content: space-evenly;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  align-items: center;
  width: 80%;
  padding: 15px;
  margin: 20px 0;
`

function LoginModal(props) {
  React.useEffect(() => {
    Modal.setAppElement('body')
  })
  return (
    <div>
      <Modal
        isOpen={!!props.isOpen}
        onRequestClose={() => props.close()}
        style={customStyles}
        contentLabel='Login Modal'
      >
        <Flex
          sx={{
            flexDirection: 'column',
            width: '645px',
            minHeight: '520px'
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
              Welcome to Giveth
            </Text>
            <Text sx={{ variant: 'text.large', color: 'secondary', my: 4 }}>
              Please Sign in to your account and start using Giveth.
            </Text>
            <LongBtn onClick={() => props.login('metamask')}>
              <img
                src={metamaskLogo}
                style={{
                  flex: 0.2,
                  width: '48px',
                  height: '48px'
                }}
              />
              <Text
                sx={{ flex: 0.8, variant: 'text.default', color: 'secondary' }}
              >
                Sign in with Metamask
              </Text>
            </LongBtn>
            <Text sx={{ variant: 'text.default', color: 'secondary', mt: 4 }}>
              Or continue with your e-mail or social media
            </Text>
            <LongBtn onClick={() => props.login('torus')}>
              <img
                src={torusLogo}
                style={{ flex: 0.2, width: '48px', height: '48px' }}
              />
              <Text
                sx={{ flex: 0.8, variant: 'text.default', color: 'secondary' }}
              >
                Sign in with Torus
              </Text>
            </LongBtn>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default LoginModal
