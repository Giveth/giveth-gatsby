/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { Box, Button, Checkbox, Label, Text, jsx } from 'theme-ui'
import Tooltip from '../../components/tooltip'
import styled from '@emotion/styled'

import BillIcon from '../../images/svg/donation/bill-icon.svg'

const Content = styled.div`
  min-width: 32vw;
  word-wrap: break-word;
`

const Receipt = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DownloadReceipt = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0.5;
  border: 2px solid #aaafca;
  border-radius: 6px;
  padding: 20px 14px;
  align-items: center;
  cursor: pointer;
`

const Success = props => {
  const { project } = props
  const [amountSelect, setAmountSelect] = useState(null)

  useEffect(() => {}, [])

  return (
    <Content>
      <Text sx={{ variant: 'headings.h3', my: 3, textAlign: 'left' }}>
        You're a giver now!
      </Text>
      <Text sx={{ variant: 'headings.h5' }}>
        Thank you for supporting <strong> xxx </strong>.
      </Text>
      <Text sx={{ variant: 'headings.h5', pt: -1 }}>
        Your <strong> $$$ </strong> contribution goes a long way!
      </Text>
      <Receipt sx={{ my: 4 }}>
        <DownloadReceipt>
          <Text
            sx={{
              variant: 'text.paragraph',
              pt: -1,
              color: 'bodyLight'
            }}
          >
            Download receipt
          </Text>
          <BillIcon />
        </DownloadReceipt>
        <div style={{ flex: 0.4 }}>
          <Text
            sx={{
              variant: 'text.paragraph',
              color: 'yellow',
              cursor: 'pointer'
            }}
          >
            View transaction details
          </Text>
        </div>
      </Receipt>
      <Text
        sx={{ variant: 'headings.h5', pt: 4 }}
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        Stay a Giver?{' '}
        <Text sx={{ color: 'yellow', ml: 2 }}> Register an account.</Text>
      </Text>
    </Content>
  )
}

export default Success
