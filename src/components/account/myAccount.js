/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { useWallet } from '../../contextProvider/WalletProvider'
import { Avatar, Button, Box, Flex, Text, jsx } from 'theme-ui'

const MyAccount = ({ info }) => {
  const [ethPrice, setEthPrice] = useState(1)
  const { balance, user } = useWallet()

  useEffect(() => {
    const init = async () => {
      fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,CNY,JPY,GBP'
      )
        .then(response => response.json())
        .then(data => setEthPrice(data.USD))
    }
    init()
  })
  return (
    <>
      <Flex>
        <Avatar src={user?.profileImage} sx={{ width: 100, height: 100 }} />
        <Box sx={{ ml: '27px' }}>
          <Text sx={{ color: 'secondary', fontSize: 7 }}>{user?.name}</Text>
          <Text sx={{ color: 'bodyDark', fontSize: 3 }}>{user?.email}</Text>
        </Box>
      </Flex>
      <Flex sx={{ mt: '40px', alignItems: 'center' }}>
        <Text sx={{ textTransform: 'uppercase', fontSize: 0 }}>
          Wallet Address
        </Text>
        {/* <Button
          type='button'
          sx={{
            color: 'primary',
            border: 0,
            background: 'unset',
            fontSize: 1
          }}
        >
          Change
        </Button> */}
      </Flex>
      <Text sx={{ mt: '14px', variant: 'text.medium', color: 'secondary' }}>
        {user?.addresses?.length > 0 && user?.addresses[0]}
      </Text>
      <Flex sx={{ mt: '40px' }}>
        <Box
          sx={{
            width: ['50%', '30%', '30%'],
            height: '100px',
            paddingTop: '20px',
            paddingLeft: '24px',
            backgroundColor: '#F4F6FC',
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
            My donations
          </Text>
          <Text sx={{ color: 'primary', fontSize: 7 }}>
            {info?.myDonations}
          </Text>
        </Box>
        <Box
          sx={{
            width: ['50%', '30%', '30%'],
            height: '100px',
            paddingTop: '20px',
            paddingLeft: '24px',
            backgroundColor: '#F4F6FC',
            borderRadius: '12px',
            ml: '5%'
          }}
        >
          <Text
            sx={{
              fontSize: 0,
              color: 'secondary',
              textTransform: 'uppercase'
            }}
          >
            My projects
          </Text>
          <Text sx={{ color: 'primary', fontSize: 7 }}>
            {info?.myProjects || 0}
          </Text>
        </Box>
      </Flex>
      <Box
        sx={{
          width: ['100%', '65%', '65%'],
          height: '100px',
          paddingTop: '20px',
          paddingLeft: '24px',
          backgroundColor: '#F4F6FC',
          borderRadius: '12px',
          mt: '24px',
          mb: ['24px', 0, 0]
        }}
      >
        <Text
          sx={{
            fontSize: 0,
            color: 'secondary',
            textTransform: 'uppercase'
          }}
        >
          Total value of assets in wallet
        </Text>
        <Flex sx={{ alignItems: 'baseline', paddingTop: '10px' }}>
          <Text sx={{ fontFamily: 'heading', color: 'secondary', fontSize: 7 }}>
            {balance && ethPrice && `$${(ethPrice * balance).toFixed(2)}`}
          </Text>
          <Text
            sx={{
              fontFamily: 'heading',
              color: 'secondary',
              fontSize: 3,
              ml: '10%'
            }}
          >
            {balance ? `${balance} ETH` : null}
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default MyAccount
