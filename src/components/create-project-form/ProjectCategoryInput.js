import React from 'react'
import { Checkbox, Label, Box } from 'theme-ui'
import { animated } from 'react-spring'

const ProjectCategoryInput = ({ register, currentValue, categoryList }) => {
  return (
    <section>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectDescription'
      >
        Please select a category
      </Label>
      <Box sx={{ mt: '50px' }}>
        {categoryList.map(category => {
          return (
            <Label sx={{ mb: '10px' }} key={`${category.name}-label`}>
              <Checkbox
                key={`${category.name}-checkbox`}
                id={category.name}
                name={category.name}
                ref={register}
                defaultChecked={
                  currentValue ? currentValue[category.name] : false
                }
              />
              {category.value}
            </Label>
          )
        })}
      </Box>
    </section>
  )
}

export default ProjectCategoryInput
