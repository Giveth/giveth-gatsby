import React from 'react'
import { Text, Button, Flex } from 'theme-ui'
import { FaCheckCircle } from 'react-icons/fa'

const EditButtonSection = ({ formData, setStep }) => {
  return (
    <Flex
      sx={{
        mt: '29px',
        // justifyContent: 'space-between',
        width: '65%'
      }}
      columns={[2, '3fr 1fr']}
    >
      {formData.projectName ? (
        <Flex>
          <Button
            type='button'
            aria-label='edit project name'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0
            }}
            onClick={() => setStep(0)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight'
              }}
            >
              Project Name
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
      {formData.projectAdmin ? (
        <Flex sx={{ ml: '7%' }}>
          <Button
            type='button'
            aria-label='edit project administrator'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setStep(1)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            >
              Admin
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
      {formData.projectDescription ? (
        <Flex sx={{ ml: '7%' }}>
          <Button
            type='button'
            aria-label='edit project description'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setStep(2)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight'
              }}
            >
              Description
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
      {formData.projectCategory ? (
        <Flex sx={{ ml: '7%' }}>
          <Button
            type='button'
            aria-label='edit project description'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setStep(3)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight'
              }}
            >
              Category
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
      {formData.projectImpactLocation ? (
        <Flex sx={{ ml: '7%' }}>
          <Button
            type='button'
            aria-label='edit project description'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setStep(4)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight'
              }}
            >
              Impact
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
      {formData.projectWalletAddress ? (
        <Flex sx={{ ml: '7%' }}>
          <Button
            type='button'
            aria-label='edit project address'
            sx={{
              color: 'primary',
              border: 0,
              background: 'unset',
              fontSize: 1,
              p: 0,
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setStep(6)}
          >
            <Text
              sx={{
                fontSize: 0,
                textTransform: 'uppercase',
                fontFamily: 'heading',
                color: 'bodyLight'
              }}
            >
              Eth Address
            </Text>
          </Button>

          <Text sx={{ ml: '10px' }}>
            <FaCheckCircle size='15px' color='green' />
          </Text>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default EditButtonSection
