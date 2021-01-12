import React from 'react'
import { Button, Flex, Text } from 'theme-ui'

const ConfirmationModal = ({
  showModal,
  setShowModal,
  title,
  confirmation,
  secondary,
  noMsg
}) => (
  <div
    css={{
      zIndex: 2,
      display: showModal ? 'flex' : 'none',
      position: 'fixed',
      right: '25%',
      top: '20%',
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
      aria-label='close'
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
      sx={{ mt: '80px', fontSize: 7, textAlign: 'center', fontFamily: 'body' }}
    >
      {title}
    </Text>
    <Flex
      sx={{
        width: '304px',
        justifyContent: 'space-between',
        mt: '70px',
        fontFamily: 'body'
      }}
    >
      <Button
        type='button'
        aria-label='edit project name'
        variant='nofill'
        sx={{
          color: 'secondary',
          width: '140px',
          height: '52px',
          border: '2px solid #AAAFCA'
        }}
        onClick={() => confirmation?.do()}
      >
        {confirmation?.title}
      </Button>
      <Button
        type='button'
        aria-label='edit project name'
        onClick={() => secondary?.do()}
        variant='nofill'
        sx={{
          color: 'secondary',
          width: '140px',
          height: '52px',
          border: '2px solid #AAAFCA'
        }}
      >
        {secondary?.title}
      </Button>
    </Flex>
  </div>
)

export default ConfirmationModal
