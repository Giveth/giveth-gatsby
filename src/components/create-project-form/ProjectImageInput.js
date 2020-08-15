import React from 'react'
import { Label, Flex, Grid, Image, Text } from 'theme-ui'
import decoratorCloud1 from '../../images/decorator-cloud1.png'
import { animated } from 'react-spring'

const ProjectImageInput = ({ register, currentValue, style }) => {
  //   const { action, state } = useStateMachine(updateAction)
  return (
    <section css={{ ...style }}>
      <Label
        sx={{
          fontSize: 9,
          fontFamily: 'heading'
        }}
        htmlFor='projectImage'
      >
        Add an image to your project
      </Label>
      <Grid
        sx={{
          justifyContent: 'center',
          border: '2px dashed #DFDAE8',
          width: '616px',
          mt: '32px',
          p: '5%',
          gap: '20px'
        }}
      >
        <Image src={decoratorCloud1} />
        <Text>
          Drag & drop an image here or{' '}
          <Text sx={{ display: 'inline-block' }}>Upload from computer</Text>
        </Text>
        <Text>
          Suggested image size min. 1200px width. Image size up to 16mb.
        </Text>
      </Grid>
      <Text sx={{ mt: '20px' }}>Select an image from our gallery.</Text>
      <Grid
        sx={{
          justifyContent: 'center',
          width: '500px',
          gridTemplateColumns: 'repeat(5, 1fr)',
          mt: '16px'
        }}
      >
        <Image src={decoratorCloud1} />
        <Image src={decoratorCloud1} />
        <Image src={decoratorCloud1} />
        <Image src={decoratorCloud1} />
        <Image src={decoratorCloud1} />
      </Grid>
    </section>
  )
}

export default ProjectImageInput
