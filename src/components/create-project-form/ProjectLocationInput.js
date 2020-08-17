import React from 'react'
import { Flex, Label, Input, Checkbox, Button } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectLocationInput = ({ register, currentValue, animationStyle }) => {
  return (
    <animated.section style={{ ...animationStyle, marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectLocation'
      >
        Where will your project have the most impact?
      </Label>
      <Flex>
        <Input
          sx={{
            width: '70%',
            mt: '40px'
          }}
          type='text'
          id='projectLocation'
          name='projectLocation'
          ref={register}
          defaultValue={currentValue}
        />
        <Label
          sx={{
            mt: '80px',
            ml: '15px'
          }}
        >
          <Checkbox />
          This project has a global impact
        </Label>
      </Flex>
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

export default ProjectLocationInput
