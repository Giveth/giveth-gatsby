import React, { useState, useEffect } from 'react'
import { Label, Grid, Image, Text, Flex, Button } from 'theme-ui'
import { animated } from 'react-spring'
import { useDropzone } from 'react-dropzone'

import ProjectImageGallery1 from '../../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../../images/svg/create/projectImageGallery4.svg'
import placeHolder from '../../../images/placeholder.png'

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export const ProjectImageInput = ({
  register,
  currentValue,
  animationStyle
}) => {
  const [image, setImage] = useState(currentValue)
  const [displayImage, setDisplayImage] = useState()
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async acceptedFile => {
      setImage(acceptedFile[0])
    }
  })
  useEffect(() => {
    const getBase64 = async image => {
      const base64Imagedata = await toBase64(image)
      setDisplayImage(base64Imagedata)
    }
    if (image !== undefined) {
      if (image instanceof File) {
        getBase64(image)
      } else if (image.type === 'svg') {
        setDisplayImage(image)
      }
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
            value={image}
            ref={register}
          />
          {displayImage === undefined ? (
            <Image
              src={placeHolder}
              sx={{ objectFit: 'cover', maxHeight: '150px' }}
            />
          ) : typeof displayImage === 'string' ? (
            <Image
              src={displayImage}
              sx={{ objectFit: 'cover', maxHeight: '150px' }}
            />
          ) : (
            <div>render the preview of the svg</div>
          )}

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
        <Button
          type='button'
          onClick={() => {
            setImage(ProjectImageGallery1)
          }}
          sx={{
            background: 'unset',
            cursor: 'pointer',
            width: '80px',
            height: '80px',
            padding: 0,
            border: '2px solid #DFDAE8',
            borderRadius: '8px'
          }}
        >
          <ProjectImageGallery1 style={{ width: '100%', height: '100%' }} />
        </Button>
        <Button
          type='button'
          sx={{
            background: 'unset',
            cursor: 'pointer',
            width: '80px',
            height: '80px',
            padding: 0,
            border: '2px solid #DFDAE8',
            borderRadius: '8px'
          }}
        >
          <ProjectImageGallery2 style={{ width: '100%', height: '100%' }} />
        </Button>
        <Button
          type='button'
          sx={{
            background: 'unset',
            cursor: 'pointer',
            width: '80px',
            height: '80px',
            padding: 0,
            border: '2px solid #DFDAE8',
            borderRadius: '8px'
          }}
        >
          <ProjectImageGallery3 style={{ width: '100%', height: '100%' }} />
        </Button>
        <Button
          type='button'
          sx={{
            background: 'unset',
            cursor: 'pointer',
            width: '80px',
            height: '80px',
            padding: 0,
            border: '2px solid #DFDAE8',
            borderRadius: '8px'
          }}
        >
          <ProjectImageGallery4 style={{ width: '100%', height: '100%' }} />
        </Button>
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
