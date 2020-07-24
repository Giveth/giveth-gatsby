/** @jsx jsx */
import { Text, jsx } from 'theme-ui'
import React, { useState } from 'react'
import styled from '@emotion/styled'

import theme from '../../gatsby-plugin-theme-ui/index'

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
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
  :hover {
    color: ${theme.colors.primary};
  }
`

const MenuLink = styled.a`
  text-decoration: none;
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

  function handleMenu () {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  return (
    <>
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
          alt='user avatar'
          style={{ width: '30px', borderRadius: '15px' }}
          src={user.profileImage}
          className='avatarimage'
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
          <Balance className='balance'>
            <MenuItem sx={{ variant: 'text.small' }} className='balance'>
              Balance: {balance}
            </MenuItem>
          </Balance>
          <MenuItem sx={{ variant: 'text.medium', color: 'secondary' }}>
            My Account
          </MenuItem>
          <MenuItem sx={{ variant: 'text.medium', color: 'secondary' }}>
            Settings
          </MenuItem>
          <MenuItem sx={{ variant: 'text.medium', color: 'secondary' }}>
            My Projects
          </MenuItem>
          <MenuLink
            href='https://github.com/Giveth/giveth-2/issues/new/choose'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem sx={{ variant: 'text.medium', color: 'secondary' }}>
              Report a bug
            </MenuItem>
          </MenuLink>
          <MenuItem sx={{ variant: 'text.medium', color: 'secondary' }}>
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
    </>
  )
}

export default UserDetails
