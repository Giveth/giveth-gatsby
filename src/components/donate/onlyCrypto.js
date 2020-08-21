/** @jsx jsx */
import { useState, useEffect } from 'react'
import { Box, Button, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import QRCode from 'qrcode.react'

const Content = styled.div`
  max-width: 41.25rem;
  word-wrap: break-word;
`

const QRSection = styled.div`
  margin: 3rem 0 0 0;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`

const QRContainer = styled(Box)`
  max-width: 13rem;
  border-radius: 12px;
  margin: 1rem 0 0 0;
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
      <Text sx={{ variant: 'headings.h4' }}>Donate With</Text>
      <QRSection>
        <Text sx={{ variant: 'text.medium' }}>
          Send ETH or any ERC20 to this address.
        </Text>
        <Text sx={{ variant: 'text.medium' }}>
          100% of donations go directly to the project.
        </Text>
        <QRContainer p={4} color='white' bg='white'>
          <QRCode value={address} size={140} />
        </QRContainer>
      </QRSection>
      <AddressContainer>
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
