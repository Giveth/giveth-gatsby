import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Button, Text } from 'theme-ui'

import { useForm } from 'react-hook-form'
import { useTransition } from 'react-spring'

import {
  ProjectNameInput,
  ProjectAdminInput,
  ProjectDescriptionInput
} from './inputs'
import { CloseModal } from './modals'
import EditButtonSection from './EditButtonSection'

const CreateProjectForm = props => {
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    props.onSubmit(formData)
  }, [submitted])

  const [currentStep, setCurrentStep] = useState(0)
  const nextStep = () => setCurrentStep(currentStep + 1)
  const steps = [
    ({ animationStyle }) => (
      <ProjectNameInput
        animationStyle={animationStyle}
        currentValue={formData.projectName}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectAdminInput
        animationStyle={animationStyle}
        currentValue={formData.projectAdmin}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectDescriptionInput
        animationStyle={animationStyle}
        currentValue={formData.projectDescription}
        register={register}
      />
    )
  ]

  const onSubmit = data => {
    setFormData({
      ...formData,
      ...data
    })
    if (currentStep === steps.length - 1) setSubmitted(true)
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

  return (
    <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
      {submitted ? (
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      ) : (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <EditButtonSection formData={formData} setStep={setCurrentStep} />
              {stepTransitions.map(({ item, props, key }) => {
                const Step = steps[item]
                return <Step key={key} animationStyle={props} />
              })}
              <Button
                aria-label='Next'
                sx={{
                  mt: '470px',
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
              <CloseModal
                showModal={showCloseModal}
                setShowModal={setShowCloseModal}
              />
            </>
          </form>
        </>
      )}
    </Box>
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
