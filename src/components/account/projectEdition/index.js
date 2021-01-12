import React, { useState, useContext, useEffect } from 'react'
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
import { BiArrowBack } from 'react-icons/bi'
import theme from '../../../gatsby-plugin-theme-ui/index'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import {
  GET_LINK_BANK_CREATION,
  EDIT_PROJECT,
  GET_PROJECT_BY_ADDRESS,
  FETCH_PROJECT_BY_SLUG
} from '../../../apollo/gql/projects'
import LoadingModal from '../../loadingModal'
import ConfirmationModal from './confirmationModal'
import { getImageFile } from '../../../utils/index'
import { categoryList } from '../../../utils/constants'
import { TorusContext } from '../../../contextProvider/torusProvider'
import useIsClient from '../../../utils/useIsClient'
import ImageSection from './imageSection'
import styled from '@emotion/styled'
import Toast from '../../toast'

const CustomInput = styled(Input)`
  color: ${theme.colors.secondary};
`

function ProjectEditionForm(props) {
  const { goBack, setCancelModal, setShowModal } = props
  const { web3 } = useContext(TorusContext)
  const [loading, setLoading] = useState(false)
  const [mapLocation, setMapLocation] = useState(null)
  const [categories, setCategories] = useState(props?.loadedProject?.categories)
  const client = useApolloClient()
  const { register, handleSubmit, errors } = useForm() // initialize the hook
  const project = props?.loadedProject

  console.log({ categories })

  useEffect(() => {
    window?.google && window.initMap(setMapLocation)
  }, [])

  const onSubmit = async data => {
    try {
      // Validate eth address
      let ethAddress = data.editWalletAddress
      if (project?.walletAddress !== data.editWalletAddress) {
        // CHECK IF STRING IS ENS AND VALID
        const ens = await web3.eth.ens.getOwner(ethAddress)
        if (ens !== '0x0000000000000000000000000000000000000000') {
          ethAddress = ens
        }
        if (ethAddress.length !== 42 || !Web3.utils.isAddress(ethAddress)) {
          return Toast({ content: 'Eth address not valid', type: 'error' })
        }
        // CHECK IF WALLET IS ALREADY TAKEN FOR A PROJECT
        const res = await client.query({
          query: GET_PROJECT_BY_ADDRESS,
          variables: {
            address: ethAddress
          }
        })
        console.log({ res })
        if (res?.data?.projectByAddress) {
          return Toast({
            content: 'this eth address is already being used for a project',
            type: 'error'
          })
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
        impactLocation: mapLocation || project?.impactLocation,
        categories: projectCategories,
        walletAddress: Web3.utils.toChecksumAddress(ethAddress)
      }

      // Validate Image
      console.log({ data })
      if (data?.editImage && project?.image !== data?.editImage) {
        if (data?.editImage.length === 1) {
          projectData.imageStatic = data.editImage
        } else {
          //download image to send
          const imageFile = await getImageFile(data.editImage, data?.editTitle)
          projectData.imageUpload = imageFile
        }
      }
      const edit = await client.mutate({
        mutation: EDIT_PROJECT,
        variables: {
          newProjectData: projectData,
          projectId: parseFloat(project?.id)
        }
      })
      // setLoading(false)
      setShowModal(true)
      console.log({ edit })
    } catch (error) {
      setLoading(false)
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
      {loading && <LoadingModal isOpen={loading} />}
      <Flex sx={{ alignItems: 'center' }}>
        <BiArrowBack
          color={theme.colors.secondary}
          style={{ marginRight: 2 }}
        />
        <Text
          onClick={goBack}
          sx={{ fontFamily: 'body', color: 'secondary', cursor: 'pointer' }}
        >
          My Projects
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <ImageSection image={project?.image} register={register} />
          <Flex sx={{ width: '70%', flexDirection: 'column' }}>
            <CustomLabel title='Project Name' htmlFor='editTitle' />
            <CustomInput
              name='editTitle'
              ref={register}
              defaultValue={project?.title}
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
              defaultValue={project?.description}
              ref={register}
              rows={12}
            />
            <CustomLabel title='Category' htmlFor='editCategory' />
            <Box sx={{ height: '320px', overflow: 'scroll' }}>
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
                        categoryFound
                          ? setCategories(
                              // remove
                              categories?.filter(i => i.name !== category.name)
                            )
                          : setCategories(
                              categories?.length > 0
                                ? [
                                    // add
                                    ...categories,
                                    { name: category.name }
                                  ]
                                : [{ name: category.name }]
                            )
                      }}
                      checked={categoryFound ? 1 : 0}
                    />
                    <Text sx={{ fontFamily: 'body' }}>{category.value}</Text>
                  </Label>
                )
              })}
            </Box>
            <CustomLabel title='Impact Location' htmlFor='editImpactLocation' />
            {mapLocation || project?.impactLocation ? (
              <Text sx={{ fontFamily: 'body', color: 'muted', fontSize: 8 }}>
                {mapLocation || project?.impactLocation}
              </Text>
            ) : null}
            <div id='locationField'>
              <Input
                id='autocomplete'
                placeholder='Search a Location'
                type='text'
                sx={{ fontFamily: 'body', width: '400px', mr: '35px', mt: 4 }}
                onChange={e => setMapLocation(e.target.value)}
              />
            </div>
            <Label
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                mt: 4
              }}
            >
              <Checkbox
                defaultChecked={
                  mapLocation === 'Global' ||
                  project?.impactLocation === 'Global'
                }
                onChange={() => {
                  mapLocation === 'Global'
                    ? setMapLocation('')
                    : setMapLocation('Global')
                }}
              />
              <Text sx={{ fontFamily: 'body', fontSize: 2 }}>
                This project has a global impact
              </Text>
            </Label>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                width: '600px',
                backgroundColor: 'white',
                borderRadius: '2px',
                margin: '2rem 0 0 0'
              }}
            >
              <div id='map' style={{ height: '250px' }} />
            </div>
            {/* <CustomLabel title='Bank Account' htmlFor='addBankAccount' />
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
            </Text> */}
            <CustomLabel title='Donation Address' htmlFor='editWalletAddress' />
            <CustomInput
              name='editWalletAddress'
              ref={register}
              defaultValue={project?.walletAddress}
            />
            <CustomLabel
              variant='text.caption'
              style={{ margin: '5px 0 0 5px', color: theme.colors.bodyLight }}
              title='Receiving Ethereum supported wallet address or ENS domain.'
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
            onClick={() => setCancelModal(true)}
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

function ProjectEdition(props) {
  const [showModal, setShowModal] = useState(false)
  const [showCancelModal, setCancelModal] = useState(false)

  const { data: fetchedProject, loading } = useQuery(FETCH_PROJECT_BY_SLUG, {
    variables: { slug: props?.project }
  })
  if (loading) return <LoadingModal isOpen={loading} />
  return (
    <>
      <ProjectEditionForm
        {...props}
        setShowModal={setShowModal}
        setCancelModal={setCancelModal}
        loadedProject={fetchedProject?.projectBySlug}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title='Saved!'
        confirmation={{
          do: () =>
            window.location.replace(
              `/project/${fetchedProject?.projectBySlug?.slug}`
            ),
          title: 'View Project'
        }}
        secondary={{
          do: () => window.location.replace('/account'),
          title: 'My Account'
        }}
      />
      <ConfirmationModal
        showModal={showCancelModal}
        setShowModal={setCancelModal}
        title='Close without saving?'
        confirmation={{
          do: () => props?.goBack(),
          title: 'Yes'
        }}
        secondary={{
          do: () => setCancelModal(false),
          title: 'No'
        }}
      />
    </>
  )
}

export default ProjectEdition
