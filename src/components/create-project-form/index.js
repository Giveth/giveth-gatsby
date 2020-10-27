import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Button, Progress, Text } from 'theme-ui'

import { useForm } from 'react-hook-form'
import { useTransition } from 'react-spring'
import { Helmet } from 'react-helmet'

import {
  ProjectNameInput,
  ProjectAdminInput,
  ProjectDescriptionInput,
  ProjectCategoryInput,
  ProjectImpactLocationInput,
  ProjectImageInput,
  ProjectBankAccountInput
} from './inputs'
import { CloseModal } from './modals'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'

const CreateProjectForm = props => {
  const APIKEY = 'AIzaSyBEHB5JWEyBUNF4F8mrSxtiVCLOyUPOBL4'
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const categoryList = [
    { name: 'nonprofit', value: 'Non-profit' },
    { name: 'covid19', value: 'COVID-19' },
    { name: 'technology', value: 'Technology' },
    { name: 'other', value: 'Other' }
  ]
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
    ),
    ({ animationStyle }) => (
      <ProjectCategoryInput
        animationStyle={animationStyle}
        categoryList={categoryList}
        currentValue={formData.projectCategory}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImpactLocationInput
        animationStyle={animationStyle}
        currentValue={formData.projectImpactLocation}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImageInput
        animationStyle={animationStyle}
        currentValue={formData.projectImage}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectBankAccountInput
        animationStyle={animationStyle}
        currentValue={formData.projectBankAccount}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <FinalVerificationStep
        animationStyle={animationStyle}
        formData={formData}
        setStep={setCurrentStep}
        categoryList={categoryList}
      />
    )
  ]

  const onSubmit = async data => {
    let projectCategory = formData.projectCategory
      ? formData.projectCategory
      : {}
    if (currentStep === 3) {
      projectCategory = {
        ...data
      }
      setFormData({
        ...formData,
        projectCategory
      })
    } else {
      setFormData({
        ...formData,
        ...data
      })
    }
    if (currentStep === steps.length - 2) {
      formData.projectImage = await fetch(formData.projectImage).then(r =>
        r.blob()
      )
      const reader = new FileReader()
      reader.readAsDataURL(formData.projectImage)
      reader.onloadend = function () {
        formData.projectImage = reader.result
      }
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

  return (
    <>
      <Progress max={steps.length} value={currentStep}>
        <Text>Progress bar test text</Text>
      </Progress>
      <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
        <>
          <Helmet>
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&libraries=places&v=weekly`}
              defer
            />
            <script type='text/javascript'>
              {`
          let map;
          function initMap(setLocation) {
              map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: 0, lng: 0 },
                  zoom: 1,
                  mapTypeControl: false,
                  panControl: false,
                  zoomControl: false,
                  streetViewControl: false
              });
              // Create the autocomplete object and associate it with the UI input control.
              autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                {
                  types: ["geocode"],
                }  
              );
              places = new google.maps.places.PlacesService(map);
              autocomplete.addListener("place_changed",function(e){
                onPlaceChanged(setLocation);
              });
          }
          function onPlaceChanged(setLocation) {
            const place = autocomplete.getPlace();
            if (place) {
              if (place.geometry) {
                map.panTo(place.geometry.location);
                var marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.formatted_address
                });
                map.setZoom(13);
                setLocation(place.formatted_address)
              } else {
                document.getElementById("autocomplete").placeholder = "Search a Location";
              }
            }
          }
        `}
            </script>
          </Helmet>
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
                <CloseModal
                  showModal={showCloseModal}
                  setShowModal={setShowCloseModal}
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
