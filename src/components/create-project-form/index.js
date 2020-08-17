import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Button, Text } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { Link } from 'gatsby'
import { useTransition } from 'react-spring'

import ProjectDescriptionTextArea from './ProjectDescription'
import ProjectNameInput from './ProjectNameInput'
import ProjectAdminInput from './ProjectAdminInput'
import ProjectCategoryInput from './ProjectCategoryInput'
import ProjectLocationInput from './ProjectLocationInput'
import ProjectImageInput from './ProjectImageInput'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'
import HighFive from './HighFive'
import CloseModal from './modals/CloseModal'

const CreateProjectForm = props => {
  // figure out how to plugin in the props.onSubmit
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit } = useForm()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const nextStep = () => setStep(step + 1)
  const categoryList = [
    { name: 'nonprofit', value: 'Non-profit' },
    { name: 'covid19', value: 'COVID-19' },
    { name: 'technology', value: 'Technology' },
    { name: 'other', value: 'Other' }
  ]

  const onSubmit = data => {
    let category = formData.category ? formData.category : {}
    if (step === 4) {
      category = {
        ...data
      }
      setFormData({
        ...formData,
        category
      })
    } else {
      setFormData({
        ...formData,
        ...data
      })
    }
    console.log(data)
    console.log(formData)
    if (step === 7) {
      // workout how to run the props.onSubmit on here
      console.log(formData)
      setSubmitted(true)
    } else {
      nextStep()
    }
  }
  const steps = [
    ({ animationStyle }) => (
      <ProjectNameInput
        register={register}
        currentValue={formData.projectName}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <ProjectAdminInput
        register={register}
        currentValue={formData.projectAdmin}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <ProjectDescriptionTextArea
        register={register}
        currentValue={formData.projectDescription}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <ProjectCategoryInput
        register={register}
        currentValue={formData.category}
        categoryList={categoryList}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <ProjectLocationInput
        register={register}
        currentValue={formData.projectLocation}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImageInput
        register={register}
        currentValue={formData.projectImage}
        animationStyle={animationStyle}
      />
    ),
    ({ animationStyle }) => (
      <FinalVerificationStep
        formData={formData}
        setStep={setStep}
        animationStyle={animationStyle}
      />
    )
  ]

  const stepTransitions = useTransition(step, null, {
    from: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      position: 'absolute'
    },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
  })

  return (
    <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
      {submitted ? (
        <HighFive />
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
              onClick={() => setShowModal(!showModal)}
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
              {step < 7 ? (
                <EditButtonSection formData={formData} setStep={setStep} />
              ) : null}

              {stepTransitions.map(({ item, props, key }) => {
                const Step = steps[item - 1]
                return <Step key={key} animationStyle={props} />
              })}
            </>
          </form>
        </>
      )}
      {showModal ? (
        <CloseModal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
    </Box>
  )
}

/** Validating propTypes */
CreateProjectForm.propTypes = {
  //   backBtnOnClick: PropTypes.func,
  //   backBtnText: PropTypes.string,
  //   fields: PropTypes.array.isRequired,
  //   completionText: PropTypes.string,
  //   nextBtnClass: PropTypes.string,
  onSubmit: PropTypes.func
  //   nextBtnText: PropTypes.string,
  //   onSubmit: PropTypes.func,
  //   showReviewView: PropTypes.bool,
  //   submitBtnClass: PropTypes.string,
  //   submitBtnText: PropTypes.string
}

// /** Default Props */
// CreateProjectForm.defaultProps = {
//   backBtnOnClick: () => {},
//   backBtnText: 'Back',
//   nextBtnOnClick: () => {},
//   nextBtnText: 'Next',
//   onSubmit: () => {},
//   showReviewView: true,
//   submitBtnText: 'Save'
// }

/** export the typeform component */
export default CreateProjectForm
