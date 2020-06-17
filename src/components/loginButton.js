import React from 'react'
import styled from '@emotion/styled'

import iconUser from '../images/icon-user.svg'

const UserDefaultIcon = styled.img`
  padding-left: 1rem;
  align-self: center;
  cursor: pointer;
  & :hover {
    transform: scale(2);
  }
`

const LoginButton = props => (
  <UserDefaultIcon src={iconUser} alt={'Log In'} onClick={props.login} />
)

export default LoginButton
