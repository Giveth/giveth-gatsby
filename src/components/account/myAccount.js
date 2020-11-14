/** @jsx jsx */
import React from 'react'
import { TorusContext } from '../../contextProvider/torusProvider'
import { ProjectContext } from '../../contextProvider/projectProvider'
import Pagination from 'react-js-pagination'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import {
  Avatar,
  Badge,
  Button,
  Box,
  Input,
  Flex,
  Spinner,
  Text,
  jsx
} from 'theme-ui'

export const MyAccount = () => {
  const { user } = React.useContext(TorusContext)
  console.log({ user })
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
        <Button
          type='button'
          sx={{
            color: 'primary',
            border: 0,
            background: 'unset',
            fontSize: 1
          }}
        >
          Change
        </Button>
      </Flex>
      <Text sx={{ mt: '14px', variant: 'text.medium' }}>
        {user?.addresses[0]}
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
          <Text sx={{ color: 'primary', fontSize: 7 }}>24</Text>
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
          <Text sx={{ color: 'primary', fontSize: 7 }}>3</Text>
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
            $128.640,40
          </Text>
          <Text
            sx={{
              fontFamily: 'heading',
              color: 'secondary',
              fontSize: 3,
              ml: '10%'
            }}
          >
            376.85 ETH
          </Text>
        </Flex>
      </Box>
    </>
  )
}
