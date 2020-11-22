/** @jsx jsx */
import { Button, Text, jsx } from 'theme-ui'
import { useContext, useState } from 'react'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui/index'
import { Link } from 'gatsby'
import { TorusContext } from '../../contextProvider/torusProvider'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'

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
  .shadow {
    box-shadow: 0px 1px 0px #f5f5f5;
  }
  .boxheight {
    display: flex;
    align-self: center;
    padding-top: 11px;
    padding-bottom: 11px;
  }
  & :hover .balance {
    opacity: 1;
  }
`

const MenuItem = styled(Text)`
  align-self: center;
  padding-left: 16px;
  cursor: pointer;
  align-content: center;
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

const UserDetails = () => {
  const [active, setActive] = useState(false)

  const { logout, user, balance } = useContext(TorusContext)
  const { proveWallet, isWalletProved } = useContext(ProveWalletContext)

  const address = (user?.addresses && user.addresses[0]) || ''
  const truncAddress = `${address.substring(0, 5)} ... ${address.substring(
    address.length - 5,
    address.length
  )}`

  const handleMenu = e => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

  const handleLogout = () => {
    logout()
  }
  return (
    <div>
      <Button
        sx={{ variant: 'buttons.nofill' }}
        style={{
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          padding: '0.5rem',
          border: '0'
        }}
        onClick={() => {
          handleMenu()
        }}
      >
        <img
          alt=''
          style={{ width: '30px', borderRadius: '15px' }}
          src={user?.profileImage}
          className='avatarimage'
        />

        <Text p={1} sx={{ variant: 'text.default', fontWeight: 'normal' }}>
          {user?.name}
        </Text>
      </Button>
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
          <Link
            to='/account'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
          >
            <a>
              <MenuItem
                sx={{
                  variant: 'text.medium',
                  color: 'secondary',
                  fontWeight: 'bold'
                }}
                className='shadow boxheight'
              >
                My Account
              </MenuItem>
            </a>
          </Link>
          {!isWalletProved && (
            <MenuItem
              sx={{
                variant: 'text.medium',
                color: 'secondary',
                fontWeight: 'bold'
              }}
              onClick={proveWallet}
              className='boxheight'
            >
              Verify Your Wallet
            </MenuItem>
          )}
          <MenuItem
            sx={{
              variant: 'text.medium',
              color: 'secondary',
              fontWeight: 'bold'
            }}
            className='shadow boxheight'
          >
            Settings
          </MenuItem>
          <MenuItem
            sx={{
              variant: 'text.medium',
              color: 'secondary',
              fontWeight: 'bold'
            }}
            className='shadow boxheight'
          >
            My Projects
          </MenuItem>
          <MenuLink
            href='https://github.com/Giveth/giveth-2/issues/new/choose'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem
              sx={{
                variant: 'text.medium',
                color: 'secondary',
                fontWeight: 'bold'
              }}
              className='shadow boxheight'
            >
              Report a bug
            </MenuItem>
          </MenuLink>
          <MenuItem
            sx={{
              variant: 'text.medium',
              color: 'secondary',
              fontWeight: 'bold'
            }}
            className='shadow boxheight'
          >
            Support
          </MenuItem>
          <MenuItem
            sx={{
              variant: 'text.medium',
              color: 'secondary',
              fontWeight: 'bold'
            }}
            onClick={handleLogout}
            className='boxheight'
          >
            Sign out
          </MenuItem>
        </AccountDetails>
      ) : null}
    </div>
  )
}

export default UserDetails
