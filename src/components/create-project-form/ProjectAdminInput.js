import React, { useState } from 'react'
import { Label, Input, Button } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectAdminInput = ({ register, currentValue, animationStyle }) => {
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
        htmlFor='projectAdmin'
      >
        What's the name of the organization or administrator the project?
      </Label>
      <Input
        sx={{
          width: '50%',
          mt: '40px'
        }}
        type='text'
        id='projectAdmin'
        name='projectAdmin'
        ref={register}
        defaultValue={currentValue}
        onChange={e => getLength(e)}
      />
      <span css={{ float: 'right', width: '45%' }}>{characterLength}/55</span>
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

export default ProjectAdminInput
