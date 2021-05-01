import React from 'react'
import { Flex, Text } from 'theme-ui'
import theme from '../utils/theme-ui'
import { FiCopy } from 'react-icons/fi'

const CopyToClipboard = ({ text, size = '18px', children }) => {
  const [quickMsg, setQuickMsg] = React.useState(false)

  const copyEvent = () => {
    setQuickMsg(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => setQuickMsg(false), 3000)
  }

  if (children) {
    return (
      <Flex
        sx={{ flexDirection: 'column', mx: 2, cursor: 'pointer' }}
        onClick={copyEvent}
      >
        {quickMsg && (
          <Flex
            sx={{
              position: 'absolute',
              mt: '-20px',
              right: 4,
              mr: '5px',
              zIndex: 4
            }}
          >
            <Text sx={{ variant: 'text.default', color: 'primary' }}>
              copied!
            </Text>
          </Flex>
        )}
        {children}
      </Flex>
    )
  }

  return (
    <Flex sx={{ flexDirection: 'column', mx: 2 }}>
      {quickMsg && (
        <Flex
          sx={{
            position: 'absolute',
            mt: '-20px',
            ml: '10px',
            zIndex: 4
          }}
        >
          <Text sx={{ variant: 'text.default', color: 'primary' }}>
            copied!
          </Text>
        </Flex>
      )}
      <FiCopy
        size={size}
        color={theme.colors.secondary}
        style={{ cursor: 'pointer' }}
        onClick={copyEvent}
      />
    </Flex>
  )
}

export default CopyToClipboard
