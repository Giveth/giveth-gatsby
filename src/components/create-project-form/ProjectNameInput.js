import React, { useState } from 'react'
import { Label, Input, Button } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectNameInput = ({ register, currentValue, animationStyle }) => {
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )
  const getLength = e => {
    setCharacterLength(e.target.value.length)
  }
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
          mt: '40px'
        }}
        type='text'
        id='projectName'
        name='projectName'
        ref={register}
        defaultValue={currentValue}
        onChange={e => getLength(e)}
      />
      <span css={{ float: 'right', width: '35%' }}>{characterLength}/55</span>
      <Button
        sx={{
          mt: '70px'
        }}
        type='submit'
      >
        NEXT
      </Button>
    </animated.section>
  )
}

export default ProjectNameInput
