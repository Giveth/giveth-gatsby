import React, { useState, useEffect } from 'react'
import { Label, Grid, Image, Text, Flex, Button } from 'theme-ui'
import { animated } from 'react-spring'
import { useDropzone } from 'react-dropzone'

import decoratorCloud from '../../../images/decorator-cloud1.png'
import decoratorLeaf from '../../../images/decorator-leaf.png'
import gatsbyIcon from '../../../images/gatsby-icon.png'
import avatar from '../../../images/avatar.jpg'
import peoplePuzzle from '../../../images/people-puzzle2.png'
import placeHolder from '../../../images/placeholder.png'

export const ProjectImageInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  currentValue = window.localStorage.getItem('projectImage')
    ? window.localStorage.getItem('projectImage')
    : {}
  const [image, setImage] = useState(currentValue)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFile => {
      setImage(URL.createObjectURL(acceptedFile[0]))
    }
  })
  useEffect(() => {
    if (Object.keys(image).length === 0 && image.constructor === Object) {
      console.log('empty')
    } else {
      console.log('notempty')
      window.localStorage.setItem('projectImage', image)
    }
  }, [image])
  return (
    <animated.section style={{ ...animationStyle, marginTop: '10px' }}>
      <Label
        sx={{
          fontSize: 8,
          fontFamily: 'heading'
        }}
        htmlFor='projectImage'
      >
        Add an image to your project
      </Label>
      <Grid
        sx={{
          justifyContent: 'center',
          alignContent: 'center',
          border: '2px dashed #DFDAE8',
          width: '650px',
          minHeight: '270px',
          maxHeight: '270px',
          mt: '12px',
          p: '2.5%',
          gap: '20px'
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            fontFamily: 'body',
            fontSize: 3
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <input
            id='projectImage'
            name='projectImage'
            type='hidden'
            value={image.preview}
            ref={register}
          />
          <Image
            src={
              Object.keys(image).length === 0 && image.constructor === Object
                ? placeHolder
                : image
            }
            sx={{ objectFit: 'cover', maxHeight: '150px' }}
          />
          <Text sx={{ marginTop: '30px' }}>
            Drag & drop an image here or{' '}
            <Text sx={{ display: 'inline-block', color: 'primary' }}>
              Upload from computer
            </Text>
          </Text>
          <Text sx={{ marginTop: '8px' }}>
            Suggested image size min. 1200px width. Image size up to 16mb.
          </Text>
        </Flex>
      </Grid>
      <Text sx={{ mt: '32px', fontFamily: 'body', fontSize: 3 }}>
        Select an image from our gallery.
      </Text>
      <Grid
        sx={{
          justifyContent: 'center',
          width: '500px',
          gridTemplateColumns: 'repeat(5, 1fr)',
          mt: '16px'
        }}
      >
        {[decoratorCloud, decoratorLeaf, gatsbyIcon, avatar, peoplePuzzle].map(
          galleryImage => {
            return (
              <Button
                key={galleryImage}
                type='button'
                onClick={() => setImage(galleryImage)}
                sx={{
                  background: 'unset',
                  cursor: 'pointer',
                  width: '80px',
                  height: '80px',
                  padding: 0
                }}
              >
                <Image
                  sx={{
                    border: '2px solid #DFDAE8',
                    borderRadius: '8px',
                    width: '100%',
                    height: '100%'
                  }}
                  src={galleryImage}
                />
              </Button>
            )
          }
        )}
      </Grid>
      <Button
        aria-label='Next'
        sx={{
          mt: '50px',
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
    </animated.section>
  )
}
