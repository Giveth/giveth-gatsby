import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Button, Text } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { Link } from 'gatsby'
import { useTransition } from 'react-spring'

import ProjectDescriptionTextArea from './ProjectDescription'
import ProjectNameInput from './ProjectNameInput'
import ProjectCategoryInput from './ProjectCategoryInput'
import ProjectLocationInput from './ProjectLocationInput'
import ProjectImageInput from './ProjectImageInput'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'
import HighFive from './HighFive'

const CloseModal = ({ showModal, setShowModal }) => (
  <div
    css={{
      //   opacity: showModal ? 1 : 0,
      display: showModal ? 'flex' : 'none',
      position: 'absolute',
      right: '15%',
      top: '40%',
      flexDirection: 'column',
      alignItems: 'center',
      width: '600px',
      height: '358px',
      backgroundColor: 'white',
      boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
      borderRadius: '2px'
    }}
  >
    <Button
      type='button'
      onClick={() => setShowModal(false)}
      sx={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        fontSize: '3',
        fontFamily: 'body',
        color: 'secondary',
        background: 'unset',
        cursor: 'pointer'
      }}
    >
      Close
    </Button>
    <Text
      sx={{ mt: '80px', fontSize: 7, textAlign: 'center', fontFamily: 'body' }}
    >
      Are you sure?
    </Text>
    <Text
      sx={{ mt: '45px', fontSize: 4, textAlign: 'center', fontFamily: 'body' }}
    >
      All data will be permanently deleted.
    </Text>
    <Flex
      sx={{
        width: '304px',
        justifyContent: 'space-between',
        mt: '32px',
        fontFamily: 'body'
      }}
    >
      <Button type='button' variant='nofill' sx={{ color: 'secondary' }}>
        <Link to='/' sx={{ textDecoration: 'none' }}>
          Yes
        </Link>
      </Button>
      <Button
        type='button'
        onClick={() => setShowModal(false)}
        variant='nofill'
        sx={{ color: 'secondary' }}
      >
        No
      </Button>
    </Flex>
  </div>
)

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
    if (step === 3) {
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
    if (step === 6) {
      // workout how to run the props.onSubmit on here
      setSubmitted(true)
    } else {
      nextStep()
    }
    // if not move to the next step
  }

  const renderCurrentStep = (step, props) => {
    switch (step) {
      case 1:
        return (
          <ProjectNameInput
            style={props}
            register={register}
            currentValue={formData.projectName}
            animationStyle={props}
          />
        )
      case 2:
        return (
          <ProjectDescriptionTextArea
            style={props}
            register={register}
            currentValue={formData.projectDescription}
            animationStyle={props}
          />
        )
      case 3:
        return (
          <ProjectCategoryInput
            style={props}
            register={register}
            currentValue={formData.category}
            categoryList={categoryList}
            animationStyle={props}
          />
        )
      case 4:
        return (
          <ProjectLocationInput
            style={props}
            register={register}
            currentValue={formData.projectLocation}
            animationStyle={props}
          />
        )
      case 5:
        return (
          <ProjectImageInput
            style={props}
            register={register}
            currentValue={formData.projectImage}
            animationStyle={props}
          />
        )
      case 6:
        return (
          <FinalVerificationStep
            formData={formData}
            setStep={setStep}
            animationStyle={props}
          />
        )
      default:
        return null
    }
  }
  const transition = useTransition(
    step,
    ['one', 'two', 'three', 'four', 'five', 'six'],
    {
      from: {
        opacity: 0,
        transform: 'translate3d(100%,0,0)'
      },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' }
    }
  )
  return (
    <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
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
      <CloseModal showModal={showModal} setShowModal={setShowModal} />

      <br />
      <br />
      <br />
      {submitted ? (
        <HighFive />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            {step < 6 ? (
              <EditButtonSection formData={formData} setStep={setStep} />
            ) : null}

            {transition.map(({ item, props }) => {
              console.log('transistion time------------')
              console.log(item)
              console.log(props)
              return renderCurrentStep(item, props)
            })}
            {/* {renderCurrentStep(step)} */}
            <Button
              sx={{
                mt: '70px'
              }}
              type='submit'
            >
              NEXT
            </Button>
          </>
        </form>
      )}
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
