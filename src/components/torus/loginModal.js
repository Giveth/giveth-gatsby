import React, { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import styled from '@emotion/styled'
import Modal from 'react-modal'
import { useWallet } from '../../contextProvider/WalletProvider'

import { FcGoogle } from 'react-icons/fc'
import { SiFacebook, SiTwitter, SiReddit, SiDiscord } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import decoratorClouds from '../../images/decorator-clouds.svg'
import metamaskLogo from '../../images/logos/metamask-fox.svg'
import poweredByTorus from '../../images/powered-by-torus.png'

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
  justify-content: center;
  width: 80%;
  padding: 15px;
  margin: 10px 0;
  align-items: center;

  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  ::after {
    transition: opacity 0.3s ease-in-out;
  }
  :hover {
    box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.4);
  }
`

const TinyBtn = styled(Box)`
  cursor: pointer;
  align-items: center;
  padding: 15px;
  margin: 20px 0;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.2);
  transition: box-shadow 0.3s ease-in-out;
  ::after {
    transition: opacity 0.3s ease-in-out;
  }
  :hover {
    box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.4);
  }
`

function LoginModal (props) {
  React.useEffect(() => {
    Modal.setAppElement('body')
  })
  const IconBtn = ({ icon, action }) => {
    return (
      <TinyBtn onClick={action} sx={{ p: 4 }}>
        {icon}
      </TinyBtn>
    )
  }

  const initLogin = (walletProvider, verifier) => {
    try {
      console.log({ walletProvider, verifier })
      login({ walletProvider, verifier })
      setModalOpen(false)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div>
      <Modal
        isOpen={!!modalOpen}
        onRequestClose={() => setModalOpen(false)}
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
              setModalOpen(false)
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
            <Text
              sx={{ variant: 'text.large', color: 'secondary', mt: 2, mb: 4 }}
            >
              Please sign in to your account and start using Giveth.
            </Text>

            <LongBtn onClick={() => initLogin('torus', 'google')}>
              <FcGoogle size={36} />
              <Text
                sx={{
                  variant: 'text.default',
                  color: 'secondary',
                  fontWeight: '500',
                  pl: 3
                }}
              >
                Sign in with Google
              </Text>
            </LongBtn>
            <Flex
              sx={{
                width: '100%',
                justifyContent: 'space-evenly',
                px: 4,
                flexDirection: 'row'
              }}
            >
              {[
                { name: 'email', logo: <MdEmail size={32} color='#AAAFCA' /> },
                {
                  name: 'facebook',
                  logo: <SiFacebook size={32} color='#AAAFCA' />
                },
                {
                  name: 'twitter',
                  logo: <SiTwitter size={32} color='#AAAFCA' />
                },
                {
                  name: 'reddit',
                  logo: <SiReddit size={32} color='#AAAFCA' />
                },
                {
                  name: 'discord',
                  logo: <SiDiscord size={32} color='#AAAFCA' />
                }
              ].map((i, index) => (
                <IconBtn
                  key={index}
                  icon={i.logo}
                  action={() =>
                    initLogin(
                      'torus',
                      i.name === 'email' || i.name === 'twitter' ? null : i.name
                    )
                  }
                />
              ))}
            </Flex>
            <img src={poweredByTorus} />
            <Text
              sx={{ variant: 'text.default', color: 'secondary', mt: 5, mb: 2 }}
            >
              Already have a crypto wallet?
            </Text>
            <LongBtn onClick={() => initLogin('metamask')}>
              <img
                src={metamaskLogo}
                style={{
                  width: '32px',
                  height: '32px'
                }}
              />
              <Text
                sx={{
                  variant: 'text.default',
                  fontWeight: '500',
                  color: 'secondary',
                  pl: 3
                }}
              >
                Sign in with Metamask
              </Text>
            </LongBtn>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default LoginModal
