import React, { useState, useEffect } from 'react'
import { Label, Grid, Image, Text, Flex, Button } from 'theme-ui'
import { animated } from 'react-spring'
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'

import ProjectImageGallery1 from '../../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../../images/svg/create/projectImageGallery4.svg'
import placeHolder from '../../../images/placeholder.png'
import { toBase64 } from '../../../utils'

const Selection = styled(Button)`
  background: unset;
  cursor: pointer;
  width: 80px;
  height: 80px;
  padding: 0;
  margin: 4% 2% 0 0;
  border: 2px solid #dfdae8;
  border-radius: 8px;
`

export const ProjectImageInput = ({
  register,
  currentValue,
  animationStyle,
  goBack
}) => {
  const [image, setImage] = useState()
  const [displayImage, setDisplayImage] = useState(currentValue)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async acceptedFile => {
      setDisplayImage(await toBase64(acceptedFile[0]))
    }
  })

  const ProjectImage = type => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundImage: `url('/assets/create/projectImageGallery${type.toString()}.svg')`
        }}
      />
    )
  }

  useEffect(() => {
    setImage(displayImage)
  }, [displayImage])

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
          gap: '20px',
          '&:hover': {
            cursor: 'pointer'
          }
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
            value={image}
            ref={register}
          />
          {displayImage === undefined ? (
            <Image
              src={placeHolder}
              sx={{ objectFit: 'cover', maxHeight: '150px' }}
            />
          ) : displayImage.startsWith('data:') ? (
            <Image
              src={displayImage}
              sx={{ objectFit: 'cover', maxHeight: '150px' }}
            />
          ) : (
            <Flex sx={{ justifyContent: 'center' }}>
              {displayImage === '1' && (
                <ProjectImageGallery1 style={{ width: '90%', height: '90%' }} />
              )}
              {displayImage === '2' && (
                <ProjectImageGallery2 style={{ width: '90%', height: '90%' }} />
              )}
              {displayImage === '3' && (
                <ProjectImageGallery3 style={{ width: '90%', height: '90%' }} />
              )}
              {displayImage === '4' && (
                <ProjectImageGallery4 style={{ width: '90%', height: '90%' }} />
              )}
            </Flex>
          )}

          <Text sx={{ marginTop: '30px' }}>
            Drag & drop an image here or{' '}
            <Text sx={{ display: 'inline-block', color: 'primary' }}>
              Upload from computer
            </Text>
          </Text>
          <Text
            sx={{
              marginTop: '8px'
            }}
          >
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
        {[1, 2, 3, 4].map((i, index) => {
          return (
            <Selection
              key={index}
              type='button'
              onClick={() => {
                setDisplayImage(i?.toString())
              }}
            >
              {ProjectImage(i)}
            </Selection>
          )
        })}
      </Grid>
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
            mt: '50px',
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
    </animated.section>
  )
}
