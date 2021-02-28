import React from 'react'
import { Label, Text, Button } from 'theme-ui'
import { GET_LINK_BANK_CREATION } from '../../../apollo/gql/projects'
import { useQuery } from '@apollo/client'
import { animated } from 'react-spring'

export const ProjectBankAccountInput = ({
  register,
  currentValue,
  animationStyle,
  projectId,
  finalize,
  goBack
}) => {
  const { data, loading, error } = useQuery(GET_LINK_BANK_CREATION, {
    variables: {
      projectId: parseInt(projectId),
      returnUrl: `${window.location.origin}/create?projectId=${projectId}`,
      refreshUrl: `${window.location.origin}/create?projectId=${projectId}`
    }
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
    <animated.section style={{ ...animationStyle, margin: '8.75rem' }}>
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
        disabled={loading}
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
          {loading ? '...' : 'CONNECT BANK ACCOUNT'}
        </Text>
      </Button>
      <Button
        // aria-label='Next'
        sx={{
          mt: '200px',
          borderRadius: '48px',
          backgroundColor: 'transparent'
        }}
        onClick={e => {
          e.preventDefault()
          finalize()
        }}
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
      <Button
        aria-label='Back'
        variant='nofill'
        sx={{
          width: '180px',
          height: '52px',
          borderRadius: '48px',
          cursor: 'pointer'
        }}
        onClick={goBack}
      >
        <Text
          sx={{
            color: 'secondary',
            fontFamily: 'body',
            fontSize: 2,
            letterSpacing: '4%'
          }}
        >
          Back
        </Text>
      </Button>
    </animated.section>
  )
}
