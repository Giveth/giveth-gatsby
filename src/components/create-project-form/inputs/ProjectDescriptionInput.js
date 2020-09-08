import React, { useState } from 'react'
import { Label, Textarea, Button, Text, Flex } from 'theme-ui'
import { animated } from 'react-spring'
import { DescriptionInstructionModal } from '../modals'

export const ProjectDescriptionInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const [showInstructions, setShowInstructions] = useState(false)
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
        htmlFor='projectDescription'
      >
        What is your project about?
      </Label>
      <Button
        type='button'
        aria-label='How to write a good project description'
        onClick={() => setShowInstructions(!showInstructions)}
        sx={{
          background: 'unset',
          cursor: 'pointer',
          p: 0
        }}
      >
        <Text
          sx={{
            fontSize: '2',
            fontFamily: 'heading',
            color: 'primary',
            mt: '8px',
            lineHeight: '19px'
          }}
        >
          How To Write A Good Project Description
        </Text>
      </Button>
      <Flex sx={{ width: '175%' }}>
        <Textarea
          sx={{
            width: '800px',
            mt: '40px',
            resize: 'none',
            fontFamily: 'body'
          }}
          id='projectDescription'
          name='projectDescription'
          ref={register}
          defaultValue={currentValue}
          rows={12}
          onChange={e => getLength(e)}
        />
        <Text
          sx={{
            marginTop: '40px',
            paddingLeft: '40px',
            fontFamily: 'body',
            color: 'muted'
          }}
        >
          {characterLength}/2000
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
            letterSpacing: '4%'
          }}
        >
          NEXT
        </Text>
      </Button>
      {showInstructions ? (
        <DescriptionInstructionModal
          showModal={showInstructions}
          setShowModal={setShowInstructions}
        />
      ) : null}
    </animated.section>
  )
}
