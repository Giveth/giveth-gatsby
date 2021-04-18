import React from 'react'
import Avatar from '../avatar'
import { Text, Box, Link, Flex } from 'theme-ui'
import { getEtherscanPrefix } from '../../utils'

export const ProfileHeader = props => {
  const { user, donations, projects } = props
  const etherscanPrefix = getEtherscanPrefix()
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
            fontSize: 1,
            fontWeight: 500,
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
        m: [3, 5, 5],
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'space-between'
      }}
    >
      <Flex
        sx={{
          flex: [1, 0.5, 0.5],
          mr: 4,
          flexDirection: ['column', 'row', 'row'],
          alignItems: ['center', null, null],
          width: ['100%', null, null],
          alignItems: ['left', null, null]
        }}
      >
        <Avatar
          img={user?.profileImage || user?.avatar}
          size={100}
          address={user?.walletAddress}
        />
        <Box sx={{ ml: [0, '27px', '27px'] }}>
          <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
          <Link
            sx={{ textDecoration: 'none' }}
            href={`https://${etherscanPrefix}etherscan.io/address/${user?.walletAddress}`}
          >
            <Text
              sx={{
                color: 'bodyLight',
                fontSize: 3,
                cursor: 'pointer',
                wordBreak: 'break-all'
              }}
            >
              {user?.walletAddress}
            </Text>
          </Link>
          <Link
            sx={{ textDecoration: 'none' }}
            href={
              /^(?:f|ht)tps?\:\/\//.test(user?.url)
                ? user?.url
                : `//${user?.url}`
            }
            target='_blank'
          >
            <Text
              sx={{
                color: 'secondary',
                fontSize: 3,
                cursor: 'pointer',
                wordBreak: 'break-all'
              }}
            >
              {user?.url}
            </Text>
          </Link>
        </Box>
      </Flex>
      <Flex
        sx={{
          flex: 0.5,
          mt: [4, 4, 0]
        }}
      >
        <TitleBox title='PROJECTS' content={projects?.length || 0} />
        <TitleBox title='DONATIONS' content={donations?.length || 0} />
      </Flex>
    </Flex>
  )
}
