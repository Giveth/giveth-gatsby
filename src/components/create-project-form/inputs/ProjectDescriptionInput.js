// --------------------------------------------------
// THIS IS A WIP TO CHECKOUT RICH TEXT IMPLEMENTATION
// --------------------------------------------------

import React, { useEffect, useState } from 'react'
import { Label, Textarea, Button, Text, Flex } from 'theme-ui'
import { animated } from 'react-spring'
import { DescriptionInstructionModal } from '../modals'

const RichTextInput = React.lazy(() => import('../../richTextInput'))

export const ProjectDescriptionInput = ({
  register,
  currentValue,
  setValue,
  animationStyle,
  goBack
}) => {
  const [showInstructions, setShowInstructions] = useState(false)
  const [characterLength, setCharacterLength] = useState(
    currentValue ? currentValue.length : 0
  )

  useEffect(() => {
    register('projectDescription')
  })

  const getLength = e => {
    console.log({ e })
  }

  const isSSR = typeof window === 'undefined'

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
        aria-label='How to write a great project description'
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
          How To Write A Great Project Description
        </Text>
      </Button>
      <Flex sx={{ width: '175%' }}>
        {/* <Textarea
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
          maxLength={2000}
          onChange={e => getLength(e)}
        /> */}
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <RichTextInput
              style={{
                width: '800px',
                height: '250px',
                marginTop: '40px',
                resize: 'none',
                fontFamily: 'body'
              }}
              defaultValue={currentValue}
              rows={12}
              onChange={(newValue, delta, source) => {
                try {
                  // console.log({ setValue, newValue, delta, source })
                  setValue('projectDescription', newValue)
                } catch (error) {
                  console.log({ error })
                }
              }}
              // onChange={e => getLength(e)}
              // maxLength={2000}
            />
          </React.Suspense>
        )}
        {/* <Text
          sx={{
            marginTop: '40px',
            paddingLeft: '40px',
            fontFamily: 'body',
            color: 'muted'
          }}
        >
          {characterLength}/2000
        </Text> */}
      </Flex>
      <Flex
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse'
        }}
      >
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
              color: 'background',
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
      </Flex>
      {showInstructions ? (
        <DescriptionInstructionModal
          showModal={showInstructions}
          setShowModal={setShowInstructions}
        />
      ) : null}
    </animated.section>
  )
}
