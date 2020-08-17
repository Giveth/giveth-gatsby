import React, { useState } from 'react'
import { Label, Input, Text } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectAdminInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )
  return (
    <animated.section style={{ ...animationStyle, marginTop: '50px' }}>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectAdmin'
      >
        What's the name of the organization or administrator of the project?
      </Label>
      <Input
        sx={{
          width: '50%',
          mt: '40px',
          fontFamily: 'body'
        }}
        type='text'
        id='projectAdmin'
        name='projectAdmin'
        ref={register}
        defaultValue={currentValue}
        placeholder='Project Admin'
        onChange={e => setCharacterLength(e.target.value.length)}
      />
      <Text
        sx={{
          float: 'right',
          width: '40%',
          fontFamily: 'body',
          color: 'muted'
        }}
      >
        {characterLength}/55
      </Text>
    </animated.section>
  )
}
