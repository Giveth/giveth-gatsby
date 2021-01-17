import React, { useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import PropTypes from 'prop-types'
import {
  Box,
  Heading,
  Flex,
  Button,
  Spinner,
  Progress,
  Link,
  Text
} from 'theme-ui'
import { navigate } from 'gatsby'
import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
import { useApolloClient } from '@apollo/react-hooks'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'
import { TorusContext } from '../../contextProvider/torusProvider'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react-spring'

import {
  ProjectNameInput,
  ProjectAdminInput,
  ProjectDescriptionInput,
  ProjectCategoryInput,
  ProjectImpactLocationInput,
  ProjectImageInput,
  ProjectEthAddressInput
} from './inputs'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'
import ConfirmationModal from '../confirmationModal'
import Toast from '../toast'

const CreateProjectForm = props => {
  const [loading, setLoading] = useState(true)
  const { isWalletProved, proveWallet } = useContext(ProveWalletContext)
  const { user, isLoggedIn, web3 } = useContext(TorusContext)
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const [walletUsed, setWalletUsed] = useState(false)
  const client = useApolloClient()

  const [currentStep, setCurrentStep] = useState(0)
  const nextStep = () => setCurrentStep(currentStep + 1)
  const goBack = () => setCurrentStep(currentStep - 1)

  const steps = [
    ({ animationStyle }) => (
      <ProjectNameInput
        animationStyle={animationStyle}
        currentValue={formData?.projectName}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectAdminInput
        animationStyle={animationStyle}
        currentValue={formData?.projectAdmin}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectDescriptionInput
        animationStyle={animationStyle}
        currentValue={formData?.projectDescription}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectCategoryInput
        animationStyle={animationStyle}
        categoryList={props.categoryList}
        currentValue={formData?.projectCategory}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImpactLocationInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImpactLocation}
        register={register}
        goBack={goBack}
      />
    ),

    ({ animationStyle }) => (
      <ProjectImageInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImage}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <ProjectEthAddressInput
        animationStyle={animationStyle}
        currentValue={
          typeof walletUsed !== 'boolean'
            ? walletUsed
            : formData?.projectWalletAddress
        }
        walletUsed={walletUsed}
        register={register}
        goBack={goBack}
      />
    ),
    ({ animationStyle }) => (
      <FinalVerificationStep
        animationStyle={animationStyle}
        formData={formData}
        setStep={setCurrentStep}
        categoryList={props.categoryList}
      />
    )
  ]

  const onSubmit = async data => {
    let projectCategory = formData.projectCategory
      ? formData.projectCategory
      : {}
    if (currentStep === 6) {
      // CHECK IF STRING IS ENS AND VALID
      let ethAddress = data?.projectWalletAddress
      const ens = await web3.eth.ens.getOwner(ethAddress)
      if (ens !== '0x0000000000000000000000000000000000000000') {
        ethAddress = ens
        data.projectWalletAddress = ethAddress
      }
      console.log({ ens, ethAddress })

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
          content: 'This eth address is already being used for a project',
          type: 'error'
        })
      }
    }
    let content = null
    if (currentStep === 3) {
      projectCategory = {
        ...data
      }
      content = {
        ...formData,
        projectCategory
      }
    } else {
      content = {
        ...formData,
        ...data
      }
    }
    setFormData(content)
    window?.localStorage.setItem('create-form', JSON.stringify(content))
    console.log({ formData, content })
    if (currentStep === steps.length - 1) {
      props.onSubmit(formData)
    }
    nextStep()
  }

  const stepTransitions = useTransition(currentStep, null, {
    from: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      position: 'absolute'
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  })

  const [showCloseModal, setShowCloseModal] = useState(false)

  useEffect(() => {
    const checkProjectWallet = async () => {
      console.log({ user })
      if (!user) return null
      if (JSON.stringify(user) === JSON.stringify({})) return setLoading(false)
      // TODO CHECK IF THERE IS A PROJECT WITH THIS WALLET
      const { data } = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: user?.addresses && user.addresses[0]
        }
      })
      if (data?.projectByAddress) {
        setWalletUsed(true)
      } else {
        setWalletUsed(user?.addresses && user.addresses[0])
      }
      setLoading(false)
    }
    if (!isLoggedIn) {
      navigate('/', { state: { welcome: true } })
    } else {
      checkProjectWallet()
    }
  }, [user])

  useEffect(() => {
    //Checks localstorage to reset form
    const localCreateForm = window?.localStorage.getItem('create-form')
    console.log({ localCreateForm })
    localCreateForm && setFormData(JSON.parse(localCreateForm))
  }, [])

  if (loading) {
    return (
      <Flex sx={{ justifyContent: 'center', pt: 5 }}>
        <Spinner variant='spinner.medium' />
      </Flex>
    )
  }

  // // CHECKS USER
  // if (JSON.stringify(user) === JSON.stringify({})) {
  //   return (
  //     <Flex sx={{ flexDirection: 'column' }}>
  //       <Text sx={{ variant: 'headings.h2', color: 'secondary', mt: 6, mx: 6 }}>
  //         You are not logged in yet...
  //       </Text>
  //       <Text
  //         sx={{ variant: 'headings.h4', color: 'primary', mx: 6 }}
  //         style={{
  //           textDecoration: 'underline',
  //           cursor: 'pointer'
  //         }}
  //         onClick={() => window.location.replace('/')}
  //       >
  //         go to our homepage
  //       </Text>
  //     </Flex>
  //   )
  // }

  if (!isWalletProved && !loading) {
    return (
      <Text sx={{ variant: 'headings.h2', color: 'secondary', m: 6 }}>
        Let's first verify your wallet{' '}
        <Link
          sx={{
            color: 'primary',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => proveWallet()}
        >
          here
        </Link>
      </Text>
    )
  }

  return (
    <>
      <Progress max={steps.length} value={currentStep}>
        <Text>Progress bar test text</Text>
      </Progress>
      <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
        <>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Heading as='h5'>CREATE A NEW PROJECT</Heading>
            <Button
              type='button'
              aria-label='Cancel'
              onClick={() => setShowCloseModal(!showCloseModal)}
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
          </Flex>
          {currentStep === steps.length ? (
            <p>Creating project, please wait</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                {currentStep !== steps.length - 1 ? (
                  <EditButtonSection
                    formData={formData}
                    setStep={setCurrentStep}
                  />
                ) : null}
                {stepTransitions.map(({ item, props, key }) => {
                  const Step = steps[item]
                  return <Step key={key} animationStyle={props} />
                })}
                <ConfirmationModal
                  showModal={showCloseModal}
                  setShowModal={setShowCloseModal}
                  title='Are you sure?'
                  confirmation={{
                    do: () => window.location.replace('/'),
                    title: 'Yes'
                  }}
                />
              </>
            </form>
          )}
        </>
      </Box>
    </>
  )
}

/** Validating propTypes */
CreateProjectForm.propTypes = {
  onSubmit: PropTypes.func
}

/** Default Props */
CreateProjectForm.defaultProps = {
  onSubmit: () => {}
}

/** export the typeform component */
export default CreateProjectForm
