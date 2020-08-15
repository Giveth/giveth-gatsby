import React, { useState } from 'react'
import { Label, Textarea } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectDescriptionTextArea = ({
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
    <animated.section style={animationStyle}>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectDescription'
      >
        What is your project about?
      </Label>
      <Textarea
        sx={{
          width: '70%',
          mt: '40px',
          resize: 'none'
        }}
        id='projectDescription'
        name='projectDescription'
        ref={register}
        defaultValue={currentValue}
        rows={12}
        onChange={e => getLength(e)}
      />
      <span css={{ float: 'right', width: '35%' }}>{characterLength}/2000</span>
    </animated.section>
  )
}

export default ProjectDescriptionTextArea
