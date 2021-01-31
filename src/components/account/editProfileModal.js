import React from 'react'
import { Avatar, Box, Button, Input, Text, Flex } from 'theme-ui'
import { useWallet } from '../../contextProvider/WalletProvider'
import * as Auth from '../../services/auth'
import { useMutation } from '@apollo/client'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { UPDATE_USER } from '../../apollo/gql/auth'
import theme from '../../gatsby-plugin-theme-ui/index'
import Modal from 'react-modal'
import Toast from '../../components/toast'

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

function EditProfileModal (props) {
  const { user } = props
  const wallet = useWallet()
  const { register, handleSubmit, watch, errors } = useForm()
  const [updateUser] = useMutation(UPDATE_USER)

  const InputBox = props => {
    const { title, placeholderText, defaultValue, name } = props
    return (
      <Box sx={{ mt: 3, mb: 2, width: '100%' }}>
        <Text
          variant='text.overlineSmall'
          sx={{ mb: 2, color: 'secondary', textTransform: 'uppercase' }}
        >
          {title}
        </Text>
        <Input
          name={name}
          ref={register}
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
          placeholder={placeholderText}
          maxLength={100}
          defaultValue={defaultValue}
          // onChange={e => setCharacterLength(e.target.value.length)}
        />
      </Box>
    )
  }

  const onSubmit = async data => {
    try {
      const { firstName, lastName, location, url } = data
      const newProfile = {
        firstName: firstName || user?.profile?.firstName,
        lastName: lastName || user?.profile?.lastName,
        location: location || user?.profile?.location,
        url: url || user?.profile?.url
      }
      const { data: response } = await updateUser({
        variables: newProfile
      })
      if (response?.updateUser === true) {
        props.onRequestClose()
        wallet?.updateUser && wallet.updateUser(user?.walletAddresses)
        return Toast({
          content: 'Profile updated successfully',
          type: 'success'
        })
      } else {
        return Toast({ content: 'There was an error', type: 'error' })
      }
    } catch (error) {
      console.log({ error })
      return Toast({ content: JSON.stringify(error), type: 'error' })
    }
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex sx={{ flexDirection: 'column', p: 4, alignItems: 'center' }}>
          <Flex sx={{ mb: 2 }}>
            <Avatar src={user?.profileImage} sx={{ width: 100, height: 100 }} />
            <Box sx={{ ml: '27px' }}>
              <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
              <Text sx={{ color: 'bodyDark', fontSize: 3 }}>{user?.email}</Text>
            </Box>
          </Flex>
          <InputBox
            title='First Name'
            name='firstName'
            placeholderText='First Name'
            defaultValue={user?.profile?.firstName}
          />
          <InputBox
            title='Last Name'
            placeholderText='Last Name'
            name='lastName'
            defaultValue={user?.profile?.lastName}
          />
          <InputBox
            title='Location'
            placeholderText='Location'
            name='location'
            defaultValue={user?.profile?.location}
          />
          <InputBox
            title='Website or URL'
            placeholderText='website'
            name='url'
            defaultValue={user?.profile?.url}
          />
          <Button
            type='button'
            aria-label='edit profile'
            variant='small'
            sx={{
              mt: 4,
              mx: 'auto',
              py: 2,
              color: 'background',
              width: '50%',
              fontWeight: 'bold'
            }}
            type='submit'
            // onClick={() => alert('This is still a mockup, hold on!')}
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
      </form>
    </Modal>
  )
}

export default EditProfileModal
