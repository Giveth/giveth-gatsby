import React, { useState, useEffect, useContext } from 'react'
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
import { useApolloClient } from '@apollo/client'
import { projectWalletAlreadyUsed, getProjectWallet } from './utils'
import { useWallet } from '../../contextProvider/WalletProvider'
import { PopupContext } from '../../contextProvider/popupProvider'
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
  const [incompleteProfile, setIncompleteProfile] = useState(false)
  const { isLoggedIn, user, validateToken, logout } = useWallet()
  const [flashMessage, setFlashMessage] = useState('')

  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const [walletUsed, setWalletUsed] = useState(false)
  const usePopup = React.useContext(PopupContext)
  const client = useApolloClient()

  const [currentStep, setCurrentStep] = useState(0)
  const nextStep = () => setCurrentStep(currentStep + 1)
  const goBack = () => setCurrentStep(currentStep - 1)

  useEffect(() => {
    doValidateToken()
    async function doValidateToken () {
      const isValid = await validateToken()
      console.log(`isValid : ${JSON.stringify(isValid, null, 2)}`)

      setFlashMessage('Your session has expired')
      if (!isValid) {
        await logout()
      }

      // usePopup?.triggerPopup('Welcome')
      // navigate('/', { state: { welcome: true } })
    }
  }, [])
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

  const onSubmit = (formData, submitCurrentStep, doNextStep) => async data => {
    let project = {}
    try {
      if (isCategoryStep(submitCurrentStep)) {
        let projectCategory = {
          ...data
        }
        project = {
          ...formData,
          projectCategory
        }
      } else {
        project = {
          ...formData,
          ...data
        }
      }

      if (isFinalConfirmationStep(submitCurrentStep, steps)) {
        const didEnterWalletAddress = !!data?.projectWalletAddress
        let projectWalletAddress
        if (didEnterWalletAddress) {
          projectWalletAddress = await getProjectWallet(
            data?.projectWalletAddress
          )
        } else {
          projectWalletAddress = user.addresses[0]
        }
        if (await projectWalletAlreadyUsed(projectWalletAddress))
          return Toast({
            content: `Eth address ${projectWalletAddress} ${
              !didEnterWalletAddress ? '(your logged in wallet address) ' : ''
            }is already being used for a project`,
            type: 'error'
          })

        project.projectWalletAddress = projectWalletAddress
      }

      window?.localStorage.setItem('create-form', JSON.stringify(project))
      if (isLastStep(submitCurrentStep, steps)) {
        props.onSubmit(project)
      }

      setFormData(project)
      doNextStep()
    } catch (error) {
      console.log({ error })
      Toast({
        content: error?.message,
        type: 'error'
      })
    }
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
      if (!user) return null

      if (JSON.stringify(user) === JSON.stringify({})) return setLoading(false)
      // TODO CHECK IF THERE IS A PROJECT WITH THIS WALLET
      const { data } = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: user.getWalletAddress()
        }
      })
      if (data?.projectByAddress) {
        setWalletUsed(true)
      } else {
        setWalletUsed(user.getWalletAddress())
      }
      setLoading(false)
    }
    if (!isLoggedIn) {
      navigate('/', { state: { welcome: true, flashMessage } })
    } else if (!user?.name) {
      usePopup?.triggerPopup('IncompleteProfile')
      setIncompleteProfile(true)
    } else {
      checkProjectWallet()
    }
  }, [user, isLoggedIn, client])

  useEffect(() => {
    //Checks localstorage to reset form
    const localCreateForm = window?.localStorage.getItem('create-form')
    localCreateForm && setFormData(JSON.parse(localCreateForm))
  }, [])

  if (incompleteProfile) {
    return null
  }

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
            <form
              onSubmit={handleSubmit(onSubmit(formData, currentStep, nextStep))}
            >
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

function isCategoryStep (currentStep) {
  return currentStep === 3
}

function isFinalConfirmationStep (currentStep, steps) {
  return currentStep === steps.length - 2
}

function isLastStep (currentStep, steps) {
  return currentStep === steps.length - 1
}
