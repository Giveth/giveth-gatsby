import React, { useState } from 'react'
import { Label, Input, Text, Button } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectAdminInput = ({
  register,
  currentValue,
  animationStyle,
  goBack
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
        maxLength={55}
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
      <Button
        aria-label='Next'
        sx={{
          mt: '200px',
          width: '180px',
          height: '52px',
          borderRadius: '48px',
          cursor: 'pointer'
        }}
        type='submit'
      >
        <Text
          sx={{
            color: 'background',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 2,
            letterSpacing: '4%'
          }}
        >
          NEXT
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
