import React from 'react'
import { Flex, Text, Spinner } from 'theme-ui'
import { Slide, toast } from 'react-toastify'
import {
  IoMdWarning,
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
  IoIosAlert
} from 'react-icons/io'
import 'react-toastify/dist/ReactToastify.css'
import theme from '../gatsby-plugin-theme-ui/index'
import styled from '@emotion/styled'

export default function Toast({
  content = 'default msg',
  type,
  noAutoClose,
  isLoading,
  customPosition
}) {
  const config = {
    position: customPosition || 'top-right',
    autoClose: noAutoClose ? false : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Slide
  }
  const Content = () => {
    let icon = null
    const size = '32px'
    switch (type) {
      case 'error':
        icon = <IoIosAlert size={size} color={theme.colors.red} />
        break
      case 'success':
        icon = <IoIosCheckmarkCircle size={size} color={theme.colors.green} />
        break
      case 'warn':
        icon = <IoMdWarning size={size} color={theme.colors.warnYellow} />
        break
      default:
        icon = (
          <IoIosInformationCircle
            size={size}
            color={
              type === 'dark' ? theme.colors.background : theme.colors.blue
            }
          />
        )
    }
    if (isLoading) {
      icon = (
        <Spinner
          size={24}
          color={
            type === 'dark' ? theme.colors.background : theme.colors.secondary
          }
        />
      )
    }
    return (
      <Flex sx={{ alignItems: 'center' }}>
        <div style={{ marginRight: '10px' }}>{icon}</div>
        <Text
          sx={{
            wordBreak: 'break-word',
            color: type === 'dark' ? 'background' : 'bodyDark'
          }}
        >
          {content}
        </Text>
      </Flex>
    )
  }
  if (type) {
    return toast[type](<Content />, config)
  }
  return toast.info(<Content />, config)
}
