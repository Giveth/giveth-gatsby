import React from 'react'
import { Box, Button, Input, Text, Flex } from 'theme-ui'
import { useWallet } from '../../contextProvider/WalletProvider'
import * as Auth from '../../services/auth'
import { useMutation } from '@apollo/client'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { UPDATE_USER } from '../../apollo/gql/auth'
import theme from '../../gatsby-plugin-theme-ui/index'
import Modal from 'react-modal'
import Avatar from '../avatar'
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

const InputBox = props => {
  const { title, placeholderText, name, register, errors, refExtras } = props
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
        ref={register(refExtras)}
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
        // defaultValue={defaultValue}
        // onChange={e => setCharacterLength(e.target.value.length)}
      />
      {errors && errors[name] && (
        <Text sx={{ mt: 1, color: 'red' }}>{errors[name].message}</Text>
      )}
    </Box>
  )
}

function EditProfileModal(props) {
  const [user, setUser] = React.useState(props?.user)
  const wallet = useWallet()
  const { register, handleSubmit, reset, errors } = useForm({
    // defaultValues: user
    defaultValues: React.useMemo(() => {
      return user
    }, [user])
  })
  const [updateUser] = useMutation(UPDATE_USER)

  const onSubmit = async data => {
    try {
      const { firstName, lastName, location, email, url } = data
      if (!firstName && !lastName && !location && !url)
        return Toast({
          content: 'Please fill at least one field',
          type: 'error'
        })
      const newProfile = {
        firstName: firstName || '',
        lastName: lastName || '',
        location: location || '',
        email: email || '',
        url: url || ''
      }
      const { data: response, error } = await updateUser({
        variables: newProfile
      })
      if (response?.updateUser === true) {
        props.onRequestClose()
        wallet?.updateUser && wallet.updateUserInfoOnly()
        reset(data)
        return Toast({
          content: 'Profile updated successfully',
          type: 'success'
        })
      } else {
        console.log({ error })
        return Toast({ content: 'There was an error', type: 'error' })
      }
    } catch (error) {
      console.log({ error })
      return Toast({
        content: error?.message || JSON.stringify(error),
        type: 'error'
      })
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
        <Flex
          sx={{
            flexDirection: 'column',
            minWidth: '350px',
            p: 4,
            alignItems: 'center'
          }}
        >
          <Flex sx={{ mb: 2 }}>
            <Avatar
              img={user?.profileImage || user?.avatar}
              size={100}
              address={user.getWalletAddress()}
            />
            <Box sx={{ ml: '27px' }}>
              <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
              <Text sx={{ color: 'bodyDark', fontSize: 3 }}>{user?.email}</Text>
            </Box>
          </Flex>
          <InputBox
            title='First Name'
            name='firstName'
            placeholderText='First Name'
            register={register}
            errors={errors}
          />
          <InputBox
            title='Last Name'
            placeholderText='Last Name'
            name='lastName'
            register={register}
            errors={errors}
          />
          <InputBox
            title='Email'
            placeholderText='Email address'
            name='email'
            register={register}
            errors={errors}
            refExtras={{
              // required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
          />
          <InputBox
            title='Location'
            placeholderText='Location'
            name='location'
            register={register}
            errors={errors}
          />
          <InputBox
            title='Website or URL'
            placeholderText='website'
            name='url'
            register={register}
            errors={errors}
          />
          <Flex
            sx={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
          >
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
            <Button
              type='button'
              aria-label='Cancel'
              onClick={props.onRequestClose}
              sx={{
                mt: 4,
                fontSize: '3',
                width: '50%',
                fontFamily: 'body',
                color: 'secondary',
                background: 'unset',
                cursor: 'pointer'
              }}
            >
              Cancel
            </Button>
          </Flex>
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
