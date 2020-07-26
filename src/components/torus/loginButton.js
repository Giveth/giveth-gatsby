import React from 'react'
import styled from '@emotion/styled'

import iconUser from '../../images/icon-user.svg'

const Container = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-content: center;
`

const UserDefaultIcon = styled.img`
  align-self: center;
  cursor: pointer;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  & :hover {
    transform: scale(1.2);
  }
`

const LoginButton = props => (
  <Container>
    <UserDefaultIcon src={iconUser} alt={'Log In'} onClick={props.login} />
  </Container>
)

export default LoginButton
