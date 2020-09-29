/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, Label, Text, jsx } from 'theme-ui'
import Tooltip from '../../components/tooltip'
import styled from '@emotion/styled'

const Content = styled.div`
  max-width: 41.25rem;
  word-wrap: break-word;
`

const Success = props => {
  const { project } = props
  const [amountSelect, setAmountSelect] = useState(null)

  useEffect(() => {}, [])

  return (
    <Content>
      <Text sx={{ variant: 'headings.h3', my: 3, textAlign: 'left' }}>
        You're a giver now
      </Text>
      <Text sx={{ variant: 'text.large', fontWeight: '700' }}>
        Thank you for supporting <strong> xxx </strong>.
      </Text>
      <Text sx={{ variant: 'text.large', fontWeight: '700' }}>
        Your <strong> $$$ </strong> contribution goes a long way!
      </Text>
    </Content>
  )
}

export default Success
