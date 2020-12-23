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
import { GET_PROJECT_BY_ADDRESS } from '../../apollo/gql/projects'
import { useApolloClient } from '@apollo/react-hooks'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'
import { TorusContext } from '../../contextProvider/torusProvider'
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
  ProjectEthAddressInput
} from './inputs'
import EditButtonSection from './EditButtonSection'
import FinalVerificationStep from './FinalVerificationStep'
import ConfirmationModal from '../confirmationModal'
import { categoryList } from '../../utils/constants'
import Toast from '../toast'

const CreateProjectForm = props => {
  const [loading, setLoading] = useState(true)
  const { isWalletProved, proveWallet } = useContext(ProveWalletContext)
  const APIKEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState({})
  const [walletUsed, setWalletUsed] = useState(false)
  const client = useApolloClient()
  const { user } = React.useContext(TorusContext)

  const [currentStep, setCurrentStep] = useState(0)
  const nextStep = () => setCurrentStep(currentStep + 1)
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
      />
    ),
    ({ animationStyle }) => (
      <ProjectDescriptionInput
        animationStyle={animationStyle}
        currentValue={formData?.projectDescription}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectCategoryInput
        animationStyle={animationStyle}
        categoryList={categoryList}
        currentValue={formData?.projectCategory}
        register={register}
      />
    ),
    ({ animationStyle }) => (
      <ProjectImpactLocationInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImpactLocation}
        register={register}
      />
    ),

    ({ animationStyle }) => (
      <ProjectImageInput
        animationStyle={animationStyle}
        currentValue={formData?.projectImage}
        register={register}
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
    console.log({ currentStep })
    if (currentStep === 6) {
      if (
        data?.projectWalletAddress?.length !== 42 ||
        !Web3.utils.isAddress(data?.projectWalletAddress)
      ) {
        return Toast({ content: 'Eth address not valid', type: 'error' })
      }
      // CHECK IF WALLET IS ALREADY TAKEN FOR A PROJECT
      const res = await client.query({
        query: GET_PROJECT_BY_ADDRESS,
        variables: {
          address: data?.projectWalletAddress
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
    console.log({ formData })
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
    checkProjectWallet()
  }, [user])

  if (loading) {
    return (
      <Flex sx={{ justifyContent: 'center', pt: 5 }}>
        <Spinner variant='spinner.medium' />
      </Flex>
    )
  }

  // CHECKS USER
  if (JSON.stringify(user) === JSON.stringify({})) {
    return (
      <Flex sx={{ flexDirection: 'column' }}>
        <Text sx={{ variant: 'headings.h2', color: 'secondary', mt: 6, mx: 6 }}>
          You are not logged in yet...
        </Text>
        <Text
          sx={{ variant: 'headings.h4', color: 'primary', mx: 6 }}
          style={{
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => window.location.replace('/')}
        >
          go to our homepage
        </Text>
      </Flex>
    )
  }

  if (!isWalletProved) {
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
