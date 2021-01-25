/** @jsx jsx */
import styled from '@emotion/styled'
import { useWallet } from '../../contextProvider/WalletProvider'
import { Text, jsx } from 'theme-ui'
import { useContext } from 'react'
import { TorusContext } from '../../contextProvider/torusProvider'

const Container = styled.div`
  width: 70px;
  height: 48px;
  display: grid;
  place-content: center;
`

const LoginButton = props => {
  // const { login } = useContext(TorusContext)
  const { login } = useWallet()
  return (
    <Container>
      <Text
        p='10px'
        sx={{ variant: 'text.medium', color: 'primary', cursor: 'pointer' }}
        onClick={login}
      >
        Sign in
      </Text>
    </Container>
  )
}

export default LoginButton
