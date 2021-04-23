import React from 'react'
import { Flex, Text, Image } from 'theme-ui'
import GiverBadge from '../../images/giverBadge@40x40.png'

function FirstGiveBadge() {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        backgroundColor: 'lightBlue2',
        p: '16px',
        my: 2,
        borderRadius: '8px'
      }}
    >
      <Flex sx={{ flex: 0.2, mr: 2 }}>
        <Image src={GiverBadge} sx={{ objectFit: 'contain' }} />
      </Flex>
      <Flex sx={{ flexDirection: 'column', flex: 0.8 }}>
        <Text
          variant='text.default'
          color='secondary'
          sx={{ fontWeight: 'bold' }}
        >
          Be the first to give!
        </Text>
        <Text variant='text.small' color='secondary'>
          Your early support will go a long way and help inspire others to
          donate.
        </Text>
      </Flex>
    </Flex>
  )
}

export default FirstGiveBadge
