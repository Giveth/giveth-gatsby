import React from 'react'
import { Button, Heading, Text } from 'theme-ui'
import styled from '@emotion/styled'

const AccountDetails = styled.main`
  display: grid;
  grid-template-columns: 60px auto auto;
  align-items: center;
  grid-gap: 0px 1rem;
  & .avatarimage {
    grid-row: 1 / span 2;
  }
  & .balance {
    grid-column: 2;
    grid-row: 2;
    align-self: flex-end;
  }
  & .logoutbutton {
    grid-column: 3;
    grid-row: 2;
    justify-self: end;
  }
`

const UserDetails = props => {
  const { user, balance, logout } = props
  return (
    <AccountDetails>
      <img
        style={{ width: '60px' }}
        src={user.profileImage}
        className="avatarimage"
      />
      <Text sx={{ variant: 'text.small' }}>{user.publicAddress}</Text>
      <Text sx={{ variant: 'text.small' }} className="balance">
        Your balance:
        <Text sx={{ variant: 'headings.h6' }}>{balance}</Text>
      </Text>

      <Button
        style={{}}
        sx={{ variant: 'buttons.tiny' }}
        onClick={logout}
        className="logoutbutton"
      >
        logout
      </Button>
    </AccountDetails>
  )
}

export default UserDetails
