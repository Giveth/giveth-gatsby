import styled from '@emotion/styled'
import { Button, Image, Text, jsx } from 'theme-ui'
import theme from '../../utils/theme-ui'
import useComponentVisible from '../../utils/useComponentVisible'
import Jdenticon from 'react-jdenticon'
import Link from 'next/link'
import { useWallet } from '../../contextProvider/WalletProvider'

import { FiExternalLink } from 'react-icons/fi'

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  padding: 5px 0;
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
  color: ${theme.colors.secondary};
  :hover {
    color: ${theme.colors.primary};
  }
`

const MenuTitle = styled(Text)`
  align-self: center;
  padding-left: 16px;
  align-content: center;
  color: ${theme.colors.secondary};
`

const MenuLink = styled.a`
  text-decoration: none;
`

const Dot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px 0 0;
`
const StyledButton = styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  padding: 0.5rem;
`
const UserDetails = () => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)

  const {
    isLoggedIn,
    logout,
    user,
    balance,
    currentNetwork,
    currentChainId,
    wallet
  } = useWallet()
  const address = isLoggedIn ? user.getWalletAddress() : '?'
  const truncAddress = `${address.substring(0, 10)}...${address.substring(
    address.length - 4,
    address.length
  )}`

  const parseNetwork = () => {
    let dotColor
    switch (currentNetwork) {
      case 'main':
        dotColor = 'greenishBlue'
        break
      case 'ropsten':
        dotColor = 'ropstenPink'
        break
      case 'kovan':
        dotColor = 'kovanPurple'
        break
      case 'rinkeby':
        dotColor = 'rinkebyYellow'
        break
      case 'goerli':
        dotColor = 'goerliBlue'
        break
      default:
        dotColor = 'softGray'
    }
    // special for xDAI
    let isXDai = false
    if (currentChainId === 100) {
      dotColor = 'greenishBlue'
      isXDai = true
    }
    return (
      <MenuTitle
        sx={{
          variant: 'text.medium',
          pb: 2,
          color: 'secondary',
          textTransform: 'capitalize'
        }}
      >
        <Dot sx={{ backgroundColor: dotColor }} />
        {isXDai ? 'xDai' : currentNetwork}
      </MenuTitle>
    )
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div ref={ref}>
      <StyledButton
        sx={{ variant: 'buttons.nofill' }}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        {user?.avatar ? (
          <Image
            alt=''
            sx={{
              width: '30px',
              height: '30px',
              borderRadius: '15px'
            }}
            onerror={`this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqenVtmZ7dQULkiedSFuZ_YPmNonJGLDYGHA&usqp=CAU';`}
            src={user?.avatar}
            className='avatarimage'
          />
        ) : (
          <Jdenticon size='32' value={address} />
        )}

        <Text
          p={1}
          sx={{
            variant: 'text.default',
            fontWeight: 'normal',
            ml: 2,
            color: 'secondary',
            textTransform: 'capitalize'
          }}
        >
          {user.getName()}
        </Text>
      </StyledButton>
      {isComponentVisible ? (
        <AccountDetails>
          <MenuTitle
            sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}
          >
            Wallet Address
          </MenuTitle>
          <MenuTitle sx={{ variant: 'text.medium', color: 'secondary' }}>
            {truncAddress}
          </MenuTitle>
          {balance ? (
            <MenuTitle
              sx={{
                variant: 'text.small',
                pb: 2,
                '&:focus': { color: 'red' }
              }}
              className='balance'
            >
              Balance:{' '}
              {balance
                ? `${parseFloat(balance)?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6
                  })} ${currentChainId === 100 ? 'xDAI' : 'ETH'}`
                : ''}
            </MenuTitle>
          ) : null}
          <MenuTitle
            sx={{ variant: 'text.overlineSmall', pt: 2, color: 'bodyDark' }}
          >
            {wallet
              ? wallet.isTorus
                ? 'Torus Network'
                : 'Metamask Network'
              : 'No network'}
          </MenuTitle>
          {parseNetwork()}
          <Link
            href='/account'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Account
            </MenuItem>
          </Link>
          <a
            href={
              wallet?.isTorus
                ? wallet?.supportLink
                : `${wallet?.supportLink}${address}`
            }
            target='_blank'
            rel='noopener noreferrer'
            sx={{ textDecoration: 'none' }}
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Wallet <FiExternalLink size='18px' />
            </MenuItem>
          </a>
          <Link
            href='/account?data=all&view=projects'
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              My Projects
            </MenuItem>
          </Link>
          <MenuLink
            href='https://github.com/Giveth/giveth-2/issues/new/choose'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Report a bug
            </MenuItem>
          </MenuLink>
          <MenuLink
            href='https://discord.gg/JYNBDuFUpG'
            target='_blank'
            rel='noopener noreferrer'
          >
            <MenuItem
              sx={{
                variant: 'text.medium'
              }}
              className='shadow boxheight'
            >
              Support
            </MenuItem>
          </MenuLink>
          <MenuItem
            sx={{
              variant: 'text.medium'
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
