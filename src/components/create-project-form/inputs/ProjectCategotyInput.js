import React from 'react'
import { Checkbox, Label, Box, Text, Button } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectCategoryInput = ({
  register,
  currentValue,
  categoryList,
  animationStyle,
  goBack
}) => {
  return (
    <animated.section style={{ ...animationStyle, marginTop: '30px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading'
        }}
        htmlFor='projectDescription'
      >
        Please select a category
      </Label>
      <Text
        sx={{
          fontSize: '3',
          fontFamily: 'heading',
          color: 'secondary',
          mt: '8px',
          lineHeight: '19px'
        }}
      >
        You can select multiple categories
      </Text>
      <Box
        sx={{
          my: '50px'
          // height: '320px',
          // overflow: 'scroll'
        }}
      >
        {categoryList.map(category => {
          return (
            <Label
              sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}
              key={`${category.name}-label`}
            >
              <Checkbox
                key={`${category.name}-checkbox`}
                id={category.name}
                name={category.name}
                ref={register}
                defaultChecked={
                  currentValue
                    ? currentValue[category.name][0] === 'on'
                      ? 1
                      : 0
                    : 0
                }
              />
              <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
            </Label>
          )
        })}
      </Box>
      <Button
        aria-label='Back'
        variant='nofill'
        sx={{
          width: '180px',
          height: '52px',
          borderRadius: '48px',
          cursor: 'pointer',
          mb: 5
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
      <Button
        aria-label='Next'
        sx={{
          mt: '20px',
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
    </animated.section>
  )
}
