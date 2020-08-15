import React from 'react'
import { Flex, Label, Input, Checkbox } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectLocationInput = ({ register, currentValue, style }) => {
  return (
    <section css={{ ...style }}>
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
    </section>
  )
}

export default ProjectLocationInput
