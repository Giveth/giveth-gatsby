/** @jsx jsx */
import { jsx } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui/index'

import React, { useState, useEffect, Fragment } from 'react'
import { Button, Text } from 'theme-ui'
import styled from '@emotion/styled'

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 105;
  right: 0px;
  top: 60px;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0px 1rem;
  & :hover .balance {
    opacity: 1;
  }
`

const MenuItem = styled(Text)`
  padding: 0.2rem 16px;
  cursor: pointer;
`
const Divider = styled.div`
  height: 1px;
  background-color: ${theme.colors.secondary};
`

const Balance = styled.div`
  opacity: 0;
  padding: 0 0.5rem;
`

const UserDetails = props => {
  const { user, balance, logout } = props
  const [active, setActive] = useState(false)

  const address = user.publicAddress
  const truncAddress = `${address.substring(0, 5)} ... ${address.substring(
    address.length - 5,
    address.length
  )}`

  function handleMenu() {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          padding: '0.5rem'
        }}
        onClick={() => {
          handleMenu()
        }}
      >
        <img
          alt={'user avatar'}
          style={{ width: '30px', borderRadius: '15px' }}
          src={user.profileImage}
          className="avatarimage"
        />
        <Text p={1} sx={{ variant: 'text.default' }}>
          {user.name}
        </Text>
      </div>
      {active ? (
        <AccountDetails>
          <MenuItem sx={{ variant: 'text.overlineSmall', color: 'bodyDark' }}>
            WALLET ADDRESS
          </MenuItem>
          <MenuItem sx={{ variant: 'text.microbold', color: 'bodyDark' }}>
            {truncAddress}
          </MenuItem>
          <Balance className="balance">
            <MenuItem sx={{ variant: 'text.small' }} className="balance">
              Balance: {balance}
            </MenuItem>
          </Balance>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            My Account
          </MenuItem>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            Settings
          </MenuItem>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            My Projects
          </MenuItem>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            Report a bug
          </MenuItem>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            Support
          </MenuItem>
          <MenuItem
            sx={{ variant: 'text.medium', color: 'secondary' }}
            onClick={logout}
          >
            Sign out
          </MenuItem>
        </AccountDetails>
      ) : null}
    </Fragment>
  )
}

export default UserDetails
