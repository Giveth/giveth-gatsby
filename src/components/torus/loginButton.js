/** @jsx jsx */
import styled from '@emotion/styled'
import { Text, jsx } from 'theme-ui'

const Container = styled.div`
  width: 70px;
  height: 48px;
  display: grid;
  place-content: center;
`

const LoginButton = props => (
  <Container>
    <Text
      p='10px'
      sx={{ variant: 'text.medium', color: 'primary', cursor: 'pointer' }}
      onClick={props.login}
    >
      Sign in
    </Text>
  </Container>
)

export default LoginButton
