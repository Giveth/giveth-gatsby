import React from 'react'
import { Avatar, Text, Box, Link, Flex } from 'theme-ui'

export const PublicProfileView = props => {
  const { user } = props
  console.log({ user })
  const etherscanPrefix =
    typeof process.env.ETHEREUM_NETWORK !== 'undefined'
      ? process.env.ETHEREUM_NETWORK === 'mainnet'
        ? ''
        : process.env.ETHEREUM_NETWORK + '.'
      : ''

  return (
    <Flex sx={{ my: 4, mx: 6 }}>
      <Flex>
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
                cursor: 'pointer'
              }}
            >
              {user?.walletAddress}
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}
