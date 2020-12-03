import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Flex,
  Box,
  Button,
  Checkbox,
  Label,
  Text,
  Input,
  Textarea
} from 'theme-ui'
import Web3 from 'web3'
import theme from '../../../gatsby-plugin-theme-ui/index'
import { useApolloClient } from '@apollo/react-hooks'
import {
  GET_LINK_BANK_CREATION,
  EDIT_PROJECT
} from '../../../apollo/gql/projects'
import { useDropzone } from 'react-dropzone'
import { getImageFile } from '../../../utils/index'
import { categoryList } from '../../../utils/constants'
import { toBase64 } from '../../../utils'
import ImageSection from './imageSection'
import styled from '@emotion/styled'

const CustomInput = styled(Input)`
  color: ${theme.colors.secondary};
`

function ProjectEdition(props) {
  const { project, goBack } = props

  const { title, admin, description, walletAddress } = project
  const [categories, setCategories] = useState(project?.categories)

  const client = useApolloClient()
  const { register, handleSubmit, errors } = useForm() // initialize the hook

  const onSubmit = async data => {
    console.log({ project, data })
    // Validate eth address
    if (project?.walletAddress !== data.editWalletAddress) {
      if (
        data?.editWalletAddress?.length !== 42 ||
        !Web3.utils.isAddress(data?.editWalletAddress)
      ) {
        return alert('eth address not valid')
      }
    }

    const projectCategories = []
    for (const category in categoryList) {
      const name = categoryList[category]?.name
      if (data[name]) {
        projectCategories.push(categoryList[category].name)
      }
    }

    const projectData = {
      title: data.editTitle,
      description: data.editDescription,
      admin: project.admin,
      // impactLocation: project.,
      categories: projectCategories,
      walletAddress: Web3.utils.toChecksumAddress(data.editWalletAddress)
    }

    // Validate Image
    if (project?.image !== data?.editImage) {
      if (data?.editImage.length === 1) {
        projectData.imageStatic = data.editImage
      } else {
        //download image to send
        const imageFile = await getImageFile(data.editImage, data?.editTitle)
        projectData.imageUpload = imageFile
      }
    }
    console.log({ projectData })
    try {
      const edit = await client.mutate({
        mutation: EDIT_PROJECT,
        variables: {
          newProjectData: projectData,
          projectId: parseFloat(project?.id)
        }
      })
      console.log({ edit })
    } catch (error) {
      console.log({ error })
    }
  }

  const connectBankAccount = async () => {
    try {
      const projectId = project?.id
      if (!projectId) return alert('no project here')
      const connectLink = await client.query({
        query: GET_LINK_BANK_CREATION,
        variables: {
          projectId: parseInt(projectId),
          returnUrl: `${window.location.origin}/account?projectId=${projectId}`,
          refreshUrl: `${window.location.origin}/account?projectId=${projectId}`
        }
      })
      if (connectLink?.data?.setProjectBankAccount) {
        window.location.href = connectLink.data.setProjectBankAccount
      } else {
        alert('error')
      }
    } catch (error) {
      console.log({ error })
    }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <ImageSection image={project?.image} register={register} />
          <Flex sx={{ width: '70%', flexDirection: 'column' }}>
            <CustomLabel title='Project Name' htmlFor='editTitle' />
            <CustomInput
              name='editTitle'
              ref={register}
              defaultValue={title}
            />{' '}
            {/* <CustomLabel title='Project Admin' htmlFor='editAdmin' />
            <CustomInput name='editAdmin' ref={register} defaultValue={admin} /> */}
            <CustomLabel
              title='Project Description'
              htmlFor='editDescription'
            />
            <Textarea
              sx={{
                resize: 'none',
                fontFamily: 'body',
                color: 'secondary'
              }}
              id='editDescription'
              name='editDescription'
              defaultValue={description}
              ref={register}
              rows={12}
            />
            <CustomLabel title='Category' htmlFor='editCategory' />
            <Box>
              {categoryList.map(category => {
                const categoryFound = categories?.find(
                  i => i.name === category.name
                )
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
                      onClick={() => {
                        const update = categories
                        categoryFound
                          ? setCategories(
                              // remove
                              categories?.filter(i => i.name !== category.name)
                            )
                          : setCategories([
                              // add
                              ...categories,
                              { name: category.name }
                            ])
                      }}
                      defaultChecked={categoryFound ? 1 : 0}
                    />
                    <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
                  </Label>
                )
              })}
            </Box>
            {/* <CustomLabel title='Impact' htmlFor='editImpactLocation' /> */}
            <CustomLabel title='Bank Account' htmlFor='addBankAccount' />
            <Text
              onClick={connectBankAccount}
              sx={{
                fontFamily: 'body',
                mt: '-5%',
                color: 'primary',
                cursor: 'pointer'
              }}
            >
              Connect your bank account
            </Text>
            <CustomLabel title='Donation Address' htmlFor='editWalletAddress' />
            <CustomInput
              name='editWalletAddress'
              ref={register}
              defaultValue={walletAddress}
            />
            <CustomLabel
              variant='text.caption'
              style={{ margin: '5px 0 0 5px', color: theme.colors.bodyLight }}
              title='Receiving Ethereum supported wallet address.'
              htmlFor={null}
            />
          </Flex>
          <Button
            aria-label='Next'
            sx={{
              mt: '39px',
              width: '240px',
              height: '52px',
              borderRadius: '48px',
              cursor: 'pointer'
            }}
            type='submit'
          >
            <Text
              sx={{
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: 2,
                letterSpacing: '4%',
                textTransform: 'uppercase',
                textAlign: 'center',
                color: 'white'
              }}
            >
              Save
            </Text>
          </Button>
          <Button
            type='button'
            aria-label='Cancel'
            onClick={goBack}
            sx={{
              fontSize: '3',
              fontFamily: 'body',
              color: 'secondary',
              background: 'unset',
              cursor: 'pointer'
            }}
          >
            Cancel
          </Button>
        </>
      </form>
    </>
  )
}

export default ProjectEdition
