import React, { useState } from 'react'
import { Label, Input, Text, Button } from 'theme-ui'
import { GET_LINK_BANK_CREATION } from '../../../apollo/gql/projects'
import { useQuery } from '@apollo/react-hooks'
import { animated } from 'react-spring'

export const ProjectBankAccountInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const { data, loading, error } = useQuery(GET_LINK_BANK_CREATION, {
    variables: { projectId: 16 }
  })

  const setBankAccount = async () => {
    try {
      window.location.replace(data?.setProjectBankAccount)
    } catch (error) {
      console.log({ error })
    }
  }

  console.log({ data, error })

  return (
    <animated.section style={{ ...animationStyle, marginTop: '50px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading',
          color: 'secondary'
        }}
      >
        Connect Bank account to accept donations
      </Label>
      <ul>
        <li>
          <Text mt={3} sx={{ variant: 'text.paragraph', color: 'secondary' }}>
            Receive donations in both crypto and FIAT
          </Text>
        </li>
        <li>
          <Text sx={{ variant: 'text.paragraph', color: 'secondary' }}>
            Transfer all FIAT donations directly to your bank account
          </Text>
        </li>
      </ul>
      <Text
        mt={3}
        sx={{ variant: 'text.paragraph', color: 'secondary', width: '70%' }}
      >
        If you don't connect your bank account you will receive donations in
        crypto to your Giveth account. You an transfer your crypto funds or
        convert them to FIAT outside the Giveth platform. By connecting a bank
        account in addition to crypto donations, your project will be accepting
        donations in FIAT.
      </Text>
      <Button
        aria-label='Next'
        sx={{
          mt: '200px',
          width: '250px',
          height: '52px',
          borderRadius: '48px'
        }}
        onClick={e => {
          e.preventDefault()
          setBankAccount()
        }}
      >
        <Text
          sx={{
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 2,
            letterSpacing: '4%'
          }}
        >
          CONNECT BANK ACCOUNT
        </Text>
      </Button>
      <Button
        // aria-label='Next'
        sx={{
          mt: '200px',
          borderRadius: '48px',
          backgroundColor: 'transparent'
        }}
        type='submit'
      >
        <Text
          sx={{
            color: 'darkgray',
            cursor: 'pointer',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 2,
            letterSpacing: '4%'
          }}
        >
          SKIP
        </Text>
      </Button>
    </animated.section>
  )
}
