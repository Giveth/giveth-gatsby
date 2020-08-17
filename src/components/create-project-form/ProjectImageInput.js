import React from 'react'
import { Label, Flex, Button, Grid, Image, Text } from 'theme-ui'
import decoratorCloud1 from '../../images/decorator-cloud1.png'
import { animated } from 'react-spring'

const ProjectImageInput = ({ register, currentValue, animationStyle }) => {
  return (
    <animated.section style={{ ...animationStyle, marginTop: '20px' }}>
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
        <Image src='https://via.placeholder.com/500x200' />
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

export default ProjectImageInput
