/** @jsx jsx */
import { useState, useEffect } from 'react'
import { Box, Button, Grid, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import QRCode from 'qrcode.react'

const Content = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const QRContainer = styled(Box)`
  align-self: flex-start;
  border-radius: 12px;
  margin: 3rem 0 0 0;
  @media (max-width: 800px) {
    align-self: center;
  }
`

const AddressContainer = styled.div`
  margin: 2rem 0;
  @media (max-width: 800px) {
    align-self: center;
    text-align: center;
  }
`

const CopyButton = styled(Button)`
  width: 100%;
  @media (max-width: 800px) {
    width: 70%;
  }
`

const OnlyCrypto = props => {
  const { project, address } = props
  const [copyMsg, setCopyMsg] = useState('Copy Address')

  function copyAddress () {
    navigator.clipboard.writeText(address)
    setCopyMsg('Address Copied!')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopyMsg('Copy Address')
    }, 5000)
    // Clear timeout if the component is unmounted
    return () => timer
  }, [copyMsg])

  return (
    <Content>
      <Text sx={{ variant: 'headings.h2' }}>Be a Giver</Text>
      <Text sx={{ variant: 'headings.h6' }}>
        Donate to support {project.toUpperCase()} Project
      </Text>
      <QRContainer p={4} color='white' bg='white'>
        <QRCode value={address} size={120} />
      </QRContainer>
      <AddressContainer>
        <Text sx={{ variant: 'text.medium', mt: 2 }}>
          Ethereum and all ERC20 tokens supported.
        </Text>
        <Text
          sx={{ variant: 'text.overlineSmall' }}
          style={{ fontSize: '16px' }}
        >
          {address}
        </Text>
        <CopyButton
          sx={{ variant: 'buttons.default', mt: 2 }}
          onClick={copyAddress}
          type='submit'
        >
          {copyMsg}
        </CopyButton>
      </AddressContainer>
    </Content>
  )
}

export default OnlyCrypto
