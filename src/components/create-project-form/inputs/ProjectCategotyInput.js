import React from 'react'
import { Checkbox, Label, Box, Text } from 'theme-ui'
import { animated } from 'react-spring'

export const ProjectCategoryInput = ({
  register,
  currentValue,
  categoryList,
  animationStyle
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
      <Box sx={{ mt: '50px' }}>
        {categoryList.map(category => {
          return (
            <Label
              sx={{ mb: '10px', display: 'flex', alignItems: 'center' }}
              key={`${category.name}-label`}
            >
              {console.log(currentValue)}
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
    </animated.section>
  )
}
