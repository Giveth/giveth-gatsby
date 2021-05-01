import React from 'react'
import { Flex, Text } from 'theme-ui'
import { Slide, toast } from 'react-toastify'
import {
  IoMdWarning,
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
  IoIosAlert
} from 'react-icons/io'
import 'react-toastify/dist/ReactToastify.css'
import theme from '../utils/theme-ui/index'
import styled from '@emotion/styled'

export default function Toast({ content = 'default msg', type, action }) {
  const Content = () => {
    let icon, bgColor, borderColor
    const size = '32px'
    switch (type) {
      case 'error':
        bgColor = theme.colors.red
        borderColor = 'secondary'
        icon = <IoIosAlert size={size} color={borderColor} />
        break
      case 'success':
        bgColor = theme.colors.green
        borderColor = 'secondary'
        icon = <IoIosCheckmarkCircle size={size} color={borderColor} />
        break
      case 'warn':
        bgColor = theme.colors.yellow
        borderColor = theme.colors.warnYellow
        icon = <IoMdWarning size={size} color={theme.colors.warnYellow} />
        break
      default:
        bgColor = theme.colors.blue
        borderColor = 'secondary'
        icon = <IoIosInformationCircle size={size} color={borderColor} />
    }
    return (
      <Flex
        sx={{
          my: '20px',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '8px',
          padding: '16px'
        }}
      >
        <Flex sx={{ flex: action ? 0.8 : 1, alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>{icon}</div>
          <Text sx={{ wordBreak: 'break-word', color: borderColor }}>
            {content}
          </Text>
        </Flex>
        {action && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text
              onClick={() => action?.do()}
              sx={{
                cursor: 'pointer',
                wordBreak: 'break-word',
                fontWeight: 'bold',
                color: borderColor
              }}
            >
              {action?.title}
            </Text>
          </Flex>
        )}
      </Flex>
    )
  }
  return <Content />
}
