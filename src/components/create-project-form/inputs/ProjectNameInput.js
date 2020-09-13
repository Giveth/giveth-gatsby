import React, { useState } from 'react'
import { Label, Input, Text, Button } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectNameInput = ({
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
        htmlFor='projectName'
      >
        What's the name of your project?
      </Label>
      <Input
        sx={{
          width: '70%',
          mt: '40px',
          fontFamily: 'body'
        }}
        type='text'
        id='projectName'
        name='projectName'
        ref={register({ required: true })}
        defaultValue={currentValue}
        placeholder='Project Name'
        onChange={e => setCharacterLength(e.target.value.length)}
      />
      <Text sx={{ float: 'right', fontFamily: 'body', color: 'muted' }}>
        {characterLength}/55
      </Text>
      <Button
        aria-label='Next'
        sx={{
          mt: '200px',
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
            letterSpacing: '4%'
          }}
        >
          NEXT
        </Text>
      </Button>
    </animated.section>
  )
}
