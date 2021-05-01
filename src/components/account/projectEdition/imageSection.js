import React, { useState, useEffect } from 'react'
import { Flex, Grid, Box, Image, Text } from 'theme-ui'
import { useDropzone } from 'react-dropzone'
import { toBase64 } from '../../../utils'
import styled from '@emotion/styled'
import theme from '../../../utils/theme-ui'

import ProjectImageGallery1 from '../../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../../images/svg/create/projectImageGallery4.svg'
import placeHolder from '../../../images/placeholder.png'

const Selection = styled(Box)`
  cursor: pointer;
  width: 80px;
  height: 80px;
  padding: 0;
  margin: 4% 2% 0 0;
  border: 2px solid #dfdae8;
  border-radius: 8px;
  background-color: ${theme.colors.background};
`

function ImageSection({ image, register }) {
  const [displayImage, setDisplayImage] = useState(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async acceptedFile => {
      try {
        setDisplayImage(await toBase64(acceptedFile[0]))
      } catch (error) {
        console.log({ error })
      }
    }
  })

  useEffect(() => {
    setDisplayImage(image)
  }, [image])

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
  return (
    <>
      <Grid
        sx={{
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          border: '2px dashed #DFDAE8',
          width: '100%',
          minHeight: '270px',
          maxHeight: '270px',
          mt: '12px',
          p: '20% 0',
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
            id='editImage'
            name='editImage'
            type='hidden'
            value={displayImage}
            ref={register}
          />
          {displayImage === undefined ? (
            <Image
              src={placeHolder}
              sx={{ objectFit: 'cover', maxHeight: '150px' }}
            />
          ) : displayImage?.startsWith('data:') ||
            displayImage?.startsWith('http') ? (
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
      <Flex sx={{ flexDirection: 'row' }}>
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
      </Flex>
    </>
  )
}

export default ImageSection
