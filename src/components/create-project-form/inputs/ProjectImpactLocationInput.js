import React, { useState, useEffect } from 'react'
import { Flex, Label, Button, Checkbox, Text } from 'theme-ui'
import { animated } from 'react-spring'

import { LocationInputModal } from '../modals'

export const ProjectImpactLocationInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [location, setLocation] = useState(
    currentValue === 'Global' ? 'Global' : currentValue
  )
  useEffect(() => {
    if (showLocationInput === true) window.initMap(setLocation)
  }, [showLocationInput])

  return (
    <animated.section style={{ ...animationStyle, marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading'
        }}
        htmlFor='projectLocation'
      >
        Where will your project have the most impact?
      </Label>
      <Text
        sx={{
          fontSize: 3,
          fontFamily: 'body',
          mt: '8px',
          lineHeight: '19px'
        }}
      >
        Donors will easier find the project based on the location you provide
      </Text>
      <Flex sx={{ mt: '75px' }}>
        <Button
          type='button'
          onClick={() => setShowLocationInput(!showLocationInput)}
          sx={{
            width: '700px',
            padding: 0,
            mr: '50px',
            background: 'unset',
            cursor: 'pointer'
          }}
        >
          <Text sx={{ fontFamily: 'body', color: 'muted', fontSize: 8 }}>
            {location || 'x Select Location'}
          </Text>
        </Button>
        <input
          id='projectImpactLocation'
          name='projectImpactLocation'
          type='hidden'
          value={location}
          ref={register}
        />
        <Label
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Checkbox
            defaultChecked={location === 'Global'}
            onChange={() => {
              location === 'Global' ? setLocation('') : setLocation('Global')
            }}
          />
          <Text sx={{ fontFamily: 'body', fontSize: 2 }}>
            This project has a global impact
          </Text>
        </Label>
      </Flex>
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
      {showLocationInput ? (
        <LocationInputModal
          showModal={showLocationInput}
          setShowModal={setShowLocationInput}
          setLocation={setLocation}
        />
      ) : null}
    </animated.section>
  )
}
