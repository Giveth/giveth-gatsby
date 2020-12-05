import React, { useState } from 'react'
import { Label, Input, Button, Text, Flex } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectEthAddressInput = ({
  register,
  currentValue,
  walletUsed,
  animationStyle
}) => {
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )
  const [address, setAddress] = useState(null)

  const onChangeAddress = e => {
    e.preventDefault()
    setCharacterLength(e.target.value.length)
    setAddress(true)
  }
  return (
    <animated.section style={{ ...animationStyle, marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading',
          lineHeight: '61px'
        }}
        htmlFor='projectWalletAddress'
      >
        Set your eth address
      </Label>
      <Text
        sx={{
          fontSize: '3',
          fontFamily: 'heading',
          color: 'secondary',
          mt: '8px',
          lineHeight: '19px'
        }}
      >
        You can set a custom ethereum address to receive donations
      </Text>
      <Flex sx={{ width: '175%' }}>
        <Input
          sx={{
            width: '100%',
            mt: '40px',
            fontFamily: 'body'
          }}
          type='text'
          id='projectWalletAddress'
          name='projectWalletAddress'
          ref={register()}
          defaultValue={currentValue}
          placeholder='0x00000...'
          onChange={e => onChangeAddress(e)}
        />
        <Text
          sx={{
            marginTop: '40px',
            paddingLeft: '40px',
            fontFamily: 'body',
            color: 'muted'
          }}
        >
          {characterLength}/42
        </Text>
      </Flex>
      {walletUsed !== true && !address && (
        <Text
          sx={{
            fontSize: '3',
            fontFamily: 'heading',
            color: 'attention',
            mt: '8px',
            lineHeight: '19px'
          }}
        >
          This is your torus wallet address, you can choose another one if
          desired*
        </Text>
      )}

      <Button
        aria-label='Next'
        sx={{
          mt: '100px',
          width: '180px',
          height: '52px',
          borderRadius: '48px'
        }}
        type='submit'
      >
        <Text
          sx={{
            color: 'background',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 2,
            letterSpacing: '4%',
            cursor: 'pointer'
          }}
        >
          NEXT
        </Text>
      </Button>
    </animated.section>
  )
}
