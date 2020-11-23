import React, { useState } from 'react'
import { Label, Input, Button, Text, Flex } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectEthAddressInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )
  const getLength = e => {
    setCharacterLength(e.target.value.length)
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
          ref={register({ required: true })}
          defaultValue={currentValue}
          placeholder='0x00000...'
          onChange={e => setCharacterLength(e.target.value.length)}
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
