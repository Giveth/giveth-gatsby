import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Flex,
  Grid,
  Box,
  Button,
  Checkbox,
  Label,
  Image,
  Text,
  Input,
  Textarea
} from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui/index'
import { useDropzone } from 'react-dropzone'
import { categoryList } from '../../../utils/constants'
import { toBase64 } from '../../../utils'

import ProjectImageGallery1 from '../../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../../images/svg/create/projectImageGallery4.svg'

function ProjectEdition(props) {
  const { project, goBack } = props
  const [displayImage, setDisplayImage] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async acceptedFile => {
      setDisplayImage(await toBase64(acceptedFile[0]))
    }
  })
  const { register, handleSubmit, errors } = useForm() // initialize the hook
  const onSubmit = data => {
    console.log(data)
  }

  const CustomLabel = ({ title, htmlFor, style, variant }) => {
    return (
      <Label
        sx={{
          my: 4,
          variant: variant || 'text.overline'
        }}
        style={style}
        htmlFor={htmlFor}
      >
        {title}
      </Label>
    )
  }

  return (
    <>
      <a onClick={goBack}>
        <h3>go back</h3>
      </a>
      <h3>{project?.title}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              p: '2.5%'
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
              <Flex sx={{ justifyContent: 'center' }}>
                {displayImage === '1' && (
                  <ProjectImageGallery1
                    style={{ width: '90%', height: '90%' }}
                  />
                )}
                {displayImage === '2' && (
                  <ProjectImageGallery2
                    style={{ width: '90%', height: '90%' }}
                  />
                )}
                {displayImage === '3' && (
                  <ProjectImageGallery3
                    style={{ width: '90%', height: '90%' }}
                  />
                )}
                {displayImage === '4' && (
                  <ProjectImageGallery4
                    style={{ width: '90%', height: '90%' }}
                  />
                )}
              </Flex>
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
          <Button
            type='button'
            onClick={() => {
              setDisplayImage('3')
            }}
            sx={{
              background: 'unset',
              cursor: 'pointer',
              width: '80px',
              height: '80px',
              padding: 0,
              mt: 4,
              border: '2px solid #DFDAE8',
              borderRadius: '8px'
            }}
          >
            <ProjectImageGallery3 style={{ width: '100%', height: '100%' }} />
          </Button>
          <Flex sx={{ width: '70%', flexDirection: 'column' }}>
            <CustomLabel title='Project Name' htmlFor='editName' />
            <Input name='editName' ref={register} />{' '}
            <CustomLabel title='Project Admin' htmlFor='editAdmin' />
            <Input name='editAdmin' ref={register} />
            <CustomLabel
              title='Project Description'
              htmlFor='editDescription'
            />
            <Textarea
              sx={{
                resize: 'none',
                fontFamily: 'body'
              }}
              id='editDescription'
              name='editDescription'
              ref={register}
              rows={12}
            />
            <CustomLabel title='Category' htmlFor='editCategory' />
            <Box>
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
                      // defaultChecked={
                      //   currentValue
                      //     ? currentValue[category.name][0] === 'on'
                      //       ? 1
                      //       : 0
                      //     : 0
                      // }
                    />
                    <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
                  </Label>
                )
              })}
            </Box>
            {/* <CustomLabel title='Impact' htmlFor='editImpactLocation' /> */}
            <CustomLabel title='Donation Address' htmlFoyyyr='editWalletAddress' />
            <Input name='editAdmin' ref={register} />
            <CustomLabel
              variant='text.caption'
              style={{ margin: '5px 0 0 5px', color: theme.colors.bodyLight }}
              title='Receiving Ethereum supported wallet address.'
              htmlFor={null}
            />
          </Flex>
        </>
      </form>
    </>
  )
}

export default ProjectEdition
