import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex, Button, Text } from 'theme-ui'

import { useForm } from 'react-hook-form'
import { useTransition } from 'react-spring'
import { Helmet } from 'react-helmet'

import { pinFile } from '../../services/Pinata'

import {
  ProjectNameInput,
  ProjectAdminInput,
  ProjectDescriptionInput,
  ProjectCategoryInput,
  ProjectImpactLocationInput,
  ProjectImageInput
} from './inputs'
import { CloseModal } from './modals'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'

const CreateProjectForm = props => {
  const APIKEY = 'AIzaSyBEHB5JWEyBUNF4F8mrSxtiVCLOyUPOBL4'
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const categoryList = [
    { name: 'nonprofit', value: 'Non-profit' },
    { name: 'covid19', value: 'COVID-19' },
    { name: 'technology', value: 'Technology' },
    { name: 'other', value: 'Other' }
  ]

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
      <FinalVerificationStep
        animationStyle={animationStyle}
        formData={formData}
        setStep={setCurrentStep}
        categoryList={categoryList}
      />
    )
  ]

  const onSubmit = async data => {
    console.log(data)
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
    if (currentStep === steps.length - 1) {
      // if the image is not from Gallery pin it, otherwise just link to gallery image
      if (formData.projectImage.startsWith('blob')) {
        const imageBlob = await fetch(formData.projectImage).then(r => r.blob())
        const imageToUpload = new File([imageBlob], formData.imageName)
        pinFile(imageToUpload)
          .then(response => {
            setFormData({
              ...formData,
              projectImage:
                'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash
            })
          })
          .catch(e => {
            console.log(e)
          })
      }
      window.localStorage.removeItem('projectImage')
      setSubmitted(true)
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
    <Box sx={{ mx: '140px', mt: '50px', position: 'relative' }}>
      {submitted ? (
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      ) : (
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
              {/* <Button
                aria-label='Next'
                sx={{
                  mt: '575px',
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
              </Button> */}
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
