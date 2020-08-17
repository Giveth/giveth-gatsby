import React from 'react'
import { Link } from 'gatsby'
import { Button, Flex, Text } from 'theme-ui'
import { animated, useSpring } from 'react-spring'

const getAnimationStyles = showModal => {
  return {
    opacity: showModal ? 0 : 0,
    transform: showModal ? 'translateY(0)' : 'translateY(-200%)'
  }
}

const CloseModal = ({ showModal, setShowModal }) => {
  const animationStyles = useSpring(getAnimationStyles(showModal))
  console.log(animationStyles)
  return (
    <animated.div
      css={{
        ...animationStyles,
        position: 'absolute',
        right: '25%',
        top: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        width: '600px',
        height: '308px',
        backgroundColor: 'white',
        boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
        borderRadius: '2px'
      }}
    >
      <Button
        type='button'
        onClick={() => setShowModal(false)}
        sx={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          fontSize: '3',
          fontFamily: 'body',
          color: 'secondary',
          background: 'unset',
          cursor: 'pointer'
        }}
      >
        Close
      </Button>
      <Text
        sx={{
          mt: '100px',
          fontSize: 7,
          textAlign: 'center',
          fontFamily: 'body'
        }}
      >
        Are you sure?
      </Text>
      <Flex
        sx={{
          width: '304px',
          justifyContent: 'space-between',
          mt: '52px',
          ml: '148px',
          fontFamily: 'body'
        }}
      >
        <Button
          type='button'
          variant='nofill'
          sx={{
            color: 'secondary',
            width: '140px',
            border: '2px solid #AAAFCA'
          }}
        >
          <Link to='/' style={{ textDecoration: 'none' }}>
            Yes
          </Link>
        </Button>
        <Button
          type='button'
          onClick={() => setShowModal(false)}
          variant='nofill'
          sx={{
            color: 'secondary',
            width: '140px',
            border: '2px solid #AAAFCA'
          }}
        >
          No
        </Button>
      </Flex>
    </animated.div>
  )
}

export default CloseModal
