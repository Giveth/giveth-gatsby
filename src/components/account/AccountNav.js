/** @jsx jsx */
import { jsx, Text, Box } from 'theme-ui'
import Link from 'next/link'
import { useWallet } from '../../contextProvider/WalletProvider'

import { FiExternalLink } from 'react-icons/fi'

const formatTitle = (title, projectsList, userDonations) => {
  switch (title) {
    case 'My Projects':
      return `My Projects ${
        projectsList?.length ? `(${projectsList?.length})` : ''
      }`
    case 'My Donations':
      return `My Donations ${
        userDonations?.length ? `(${userDonations?.length})` : ''
      }`
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
  const { setQuery, query, projectsList, userDonations } = props
  const { logout, wallet, user } = useWallet()
  const handleLogout = () => {
    logout()
  }
  return (
    <Box sx={{ pr: '8%' }}>
      <Text
        sx={{
          fontFamily: 'heading',
          color: 'secondary',
          fontSize: 8,
          mt: '40px',
          mb: '68px'
        }}
      >
        My Account
      </Text>
      <Box sx={{ maxWidth: '80%' }}>
        {options.map((i, index) => {
          return (
            <a
              key={index}
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => {
                switch (i.route) {
                  case 'projects':
                    return setQuery({ view: 'projects', data: 'all' })
                  case 'account':
                    return setQuery({ view: undefined, data: undefined })
                  default:
                    return setQuery({ view: i.route, data: undefined })
                }
              }}
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
            </a>
          )
        })}
      </Box>
      <Box sx={{ mt: ['35px', '70px', '70px'], maxWidth: '60%' }}>
        <Link
          href={`${wallet?.supportLink}/${user.getWalletAddress()}`}
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text
            sx={{
              mb: '8px',
              variant: 'links.grey'
            }}
          >
            My Wallet <FiExternalLink size='18px' />
          </Text>
        </Link>
        <Link
          href='https://github.com/Giveth/giveth-2/issues/new/choose'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text
            sx={{
              mb: '8px',
              variant: 'links.grey'
            }}
          >
            Report A Bug
          </Text>
        </Link>
        <Link
          href='https://discord.gg/JYNBDuFUpG'
          target='_blank'
          rel='noopener noreferrer'
          sx={{ textDecoration: 'none' }}
        >
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Support</Text>
        </Link>
        <Link href='/' sx={{ textDecoration: 'none' }} onClick={handleLogout}>
          <Text sx={{ mb: '8px', variant: 'links.grey' }}>Sign Out</Text>
        </Link>
      </Box>
    </Box>
  )
}
export default AccountNav
