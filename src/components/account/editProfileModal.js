import React from 'react'
import { Avatar, Box, Button, Input, Text, Flex } from 'theme-ui'
import { IoMdClose } from 'react-icons/io'
import theme from '../../gatsby-plugin-theme-ui/index'
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)'
  }
}

function EditProfileModal(props) {
  const { user } = props

  const InputBox = ({ title, placeholderText }) => {
    return (
      <Box sx={{ mt: 3, mb: 2, width: '100%' }}>
        <Text
          variant='text.overlineSmall'
          sx={{ mb: 2, color: 'secondary', textTransform: 'uppercase' }}
        >
          {title}
        </Text>
        <Input
          sx={{
            width: '100%',
            fontFamily: 'body',
            py: 2,
            '::placeholder': {
              color: 'bodyLight',
              textTransform: 'capitalize'
            }
          }}
          type='text'
          defaultValue={''}
          placeholder={placeholderText}
          maxLength={100}
          // onChange={e => setCharacterLength(e.target.value.length)}
        />
      </Box>
    )
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      <Flex sx={{ flexDirection: 'column', p: 4, alignItems: 'center' }}>
        <Flex sx={{ mb: 2 }}>
          <Avatar src={user?.profileImage} sx={{ width: 100, height: 100 }} />
          <Box sx={{ ml: '27px' }}>
            <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
            <Text sx={{ color: 'bodyDark', fontSize: 3 }}>{user?.email}</Text>
          </Box>
        </Flex>
        <InputBox title='Full Name' placeholderText='Full Name' />
        <InputBox title='Location' placeholderText='Location' />
        <InputBox title='Website or URL' placeholderText='website' />
        <Button
          type='button'
          aria-label='edit profile'
          variant='small'
          sx={{
            mt: 4,
            py: 2,
            color: 'background',
            width: '50%',
            fontWeight: 'bold'
          }}
          onClick={() => alert('This is still a mockup, hold on!')}
        >
          SAVE
        </Button>
        <IoMdClose
          onClick={props.onRequestClose}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '12px',
            right: '12px'
          }}
          size='20px'
          color={theme.colors.bodyLight}
        />
      </Flex>
    </Modal>
  )
}

export default EditProfileModal
