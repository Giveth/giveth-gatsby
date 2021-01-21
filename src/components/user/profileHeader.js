import React from 'react'
import { Avatar, Text, Box, Link, Flex } from 'theme-ui'

export const ProfileHeader = props => {
  const { user, donations, projects } = props
  const etherscanPrefix =
    typeof process.env.ETHEREUM_NETWORK !== 'undefined'
      ? process.env.ETHEREUM_NETWORK === 'mainnet'
        ? ''
        : process.env.ETHEREUM_NETWORK + '.'
      : ''

  const TitleBox = ({ title, content }) => {
    return (
      <Box
        sx={{
          width: '100%',
          padding: '20px 24px',
          margin: '0 10px',
          backgroundColor: 'softGray',
          borderRadius: '12px'
        }}
      >
        <Text
          sx={{
            fontSize: 0,
            color: 'secondary',
            textTransform: 'uppercase'
          }}
        >
          {title}
        </Text>
        <Text sx={{ color: 'primary', fontSize: 7 }}>{content}</Text>
      </Box>
    )
  }

  return (
    <Flex
      sx={{
        flex: 1,
        m: 5,
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'space-between'
      }}
    >
      <Flex sx={{ flex: 0.5, mr: 4 }}>
        <Avatar src={user?.avatar} sx={{ width: 100, height: 100 }} />
        <Box sx={{ ml: '27px' }}>
          <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
          <Link
            sx={{ textDecoration: 'none' }}
            href={`https://${etherscanPrefix}etherscan.io/address/${user?.walletAddress}`}
          >
            <Text
              sx={{
                color: 'secondary',
                fontSize: 3,
                cursor: 'pointer',
                wordBreak: 'break-all'
              }}
            >
              {user?.walletAddress}
            </Text>
          </Link>
        </Box>
      </Flex>
      <Flex sx={{ flex: 0.5, mt: [4, 4, 0] }}>
        <TitleBox title='PROJECTS' content={projects?.length || 0} />
        <TitleBox title='DONATIONS' content={donations?.length || 0} />
      </Flex>
    </Flex>
  )
}
