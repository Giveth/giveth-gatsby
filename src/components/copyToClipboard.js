import React from 'react'
import { Flex, Text } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui'
import { FiCopy } from 'react-icons/fi'

const CopyToClipboard = ({ text, size = '18px' }) => {
  const [quickMsg, setQuickMsg] = React.useState(false)

  const copyEvent = () => {
    setQuickMsg(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => setQuickMsg(false), 3000)
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
