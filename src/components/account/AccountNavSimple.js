/** @jsx jsx */
import React from 'react'
import { jsx, Text, Flex, Box } from 'theme-ui'
import { Link } from 'gatsby'
import { BsArrowLeft } from 'react-icons/bs'
import styled from '@emotion/styled'
import { useWallet } from '../../contextProvider/WalletProvider'

const UserSpan = styled.span`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-self: end;
  @media (max-width: 1030px) {
    grid-row: 1;
    grid-column: 3;
  }
`
const formatTitle = (title, projectsList, userDonations) => {
  switch (title) {
    case 'My Projects':
      // return `My Projects ${
      //   projectsList?.length ? `(${projectsList?.length})` : ''
      // }`
      return 3
    case 'My Donations':
      // return `My Donations ${
      //   userDonations?.length ? `(${userDonations?.length})` : ''
      // }`
      return 5
    default:
      return title
  }
}
const options = [
  { route: 'account', name: 'My Account' },
  { route: 'projects', name: 'My Projects' },
  { route: 'donations', name: 'My Donations' }
]
const AccountNav = props => {
  const { projectsList, userDonations, query } = props
  const { logout } = useWallet()
  const handleLogout = () => {
    logout()
  }
  return (
    <Box sx={{ width: ['100%', '30%', '30%'] }}>
      <Text
        sx={{
          fontFamily: 'heading',
          color: 'secondary',
          fontSize: 8,
          mt: '40px',
          mb: '68px',
          variant: 'links.secondary'
        }}
      >
        My Account
      </Text>
      <Box>
        {options.map((i, index) => {
          return (
            <Link
              key={index}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              href=''
            >
              <Text
                sx={{
                  mb: '8px',
                  color:
                    query?.view === i.route ||
                    (!query?.view && i.route === 'account')
                      ? 'primary'
                      : 'secondary'
                }}
              >
                {formatTitle(i.name, projectsList, userDonations)}
              </Text>
            </Link>
          )
        })}
      </Box>
      <Box sx={{ mt: ['35px', '70px', '70px'] }}>
        <Link
          href='https://app.tor.us'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Wallet Settings</Text>
        </Link>
        <Link
          href='https://github.com/Giveth/giveth-2/issues/new/choose'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Report A Bug</Text>
        </Link>
        <Link
          href='https://discord.gg/JYNBDuFUpG'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Support</Text>
        </Link>
        <Link to='/' sx={{ textDecoration: 'none' }} onClick={handleLogout}>
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Sign Out</Text>
        </Link>
      </Box>
    </Box>
  )
}
export default AccountNav
