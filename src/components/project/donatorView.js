import React, { useState, useEffect } from 'react'
import { Flex, Image, Text, Box, Button } from 'theme-ui'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { TorusContext } from '../../contextProvider/torusProvider'
import { DonationsTab, UpdatesTab } from './index'

import testImg from '../../images/giveth-test-image.png'
import ProjectImageGallery1 from '../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../images/svg/create/projectImageGallery4.svg'

import { GrCircleInformation } from 'react-icons/gr'
import { IconContext } from 'react-icons'
import { Link } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import { GET_STRIPE_PROJECT_DONATIONS } from '../../apollo/gql/projects'
import styled from '@emotion/styled'

const FloatingDonateView = styled(Flex)`
  position: fixed;

  @media screen and (max-width: 800px) {
    width: 80%;
    align-self: center;
    margin: 0 auto;
    bottom: 0;
  }
`

export const ProjectDonatorView = ({ pageContext }) => {
  const { user } = React.useContext(TorusContext)
  const [currentTab, setCurrentTab] = useState('description')
  const [totalDonations, setTotalDonations] = useState(null)
  const [totalGivers, setTotalGivers] = useState(null)
  const [isOwner, setIsOwner] = useState(false)

  const { data, loading, error } = useQuery(GET_STRIPE_PROJECT_DONATIONS, {
    variables: { projectId: pageContext?.project?.id }
  })

  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const project = pageContext?.project

  console.log({ pageContext })

  useEffect(() => {
    if (data) {
      // Add donations to current project store
      setCurrentProjectView({
        ...currentProjectView,
        donations: data?.getStripeProjectDonations
      })
      const donations = data?.getStripeProjectDonations
      setTotalDonations(donations?.length)
      setTotalGivers([...new Set(donations?.map(data => data?.donor))].length)
    }
    setIsOwner(pageContext?.project?.admin === user.userIDFromDB)
  }, [data])

  const setImage = img => {
    if (/^\d+$/.test(img)) {
      // Is not url
      let svg = null
      switch (parseInt(img)) {
        case 1:
          svg = <ProjectImageGallery1 />
          break
        case 2:
          svg = <ProjectImageGallery2 />
          break
        case 3:
          svg = <ProjectImageGallery3 />
          break
        case 4:
          svg = <ProjectImageGallery4 />
          break
      }
      return (
        <div
          style={{
            objectFit: 'cover',
            // objectPosition: '100% 25%',
            width: '85%',
            margin: 'auto',
            height: '100%',
            borderRadius: '10px'
          }}
        >
          {svg}
        </div>
      )
    } else {
      return false
    }
  }

  return (
    <>
      <Flex>
        {setImage(project?.image) || (
          <Image
            src={project?.image ? project?.image : testImg}
            onError={ev =>
              (ev.target.src =
                'https://miro.medium.com/max/4998/1*pGxFDKfIk59bcQgGW14EIg.jpeg')
            }
            sx={{
              objectFit: 'cover',
              // objectPosition: '100% 25%',
              width: '85%',
              margin: 'auto',
              height: '250px',
              borderRadius: '10px'
            }}
          />
        )}
      </Flex>
      <Flex sx={{ width: '80%', margin: 'auto' }}>
        <Box sx={{ width: ['100%', null, '70%'] }}>
          <Flex>
            <Box sx={{ mt: '20px' }}>
              <Text
                sx={{
                  fontSize: 9,
                  fontFamily: 'heading',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                {pageContext?.project?.title}
              </Text>
              <Text
                sx={{
                  fontSize: 6,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'primary',
                  mt: '10px'
                }}
              >
                Project organization
              </Text>
            </Box>
          </Flex>
          {/*
          // NOTIFICATION BADGE
          <Flex
            sx={{
              my: '20px',
              alignItems: 'center',
              backgroundColor: '#F0F6FC',
              borderColor: '#3F91E4',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <IconContext.Provider value={{ color: '#3F91E4' }}>
              <GrCircleInformation size='21px' />
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: '#3F91E4',
                  ml: '16px'
                }}
              >
                This is a notification banner to highlight some important
                information about the project.
              </Text>
            </IconContext.Provider>
          </Flex> */}
          <Flex
            sx={{
              width: ['100%', null, '60%'],
              justifyContent: 'space-between',
              height: '60px',
              mt: '20px'
            }}
          >
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('description')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'description' ? '#C2449F' : null,
                  borderBottomStyle:
                    currentTab === 'description' ? 'solid' : null
                }}
              >
                Description
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('updates')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'updates' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'updates' ? 'solid' : null
                }}
              >
                Updates
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('donation')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '0.5rem',
                  borderBottomColor:
                    currentTab === 'donation' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'donation' ? 'solid' : null
                }}
              >
                Donations
              </Text>
            </Button>
          </Flex>
          <Box sx={{ mt: '30px' }}>
            {currentTab === 'description' ? (
              <Text
                sx={{
                  mb: 4,
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                {pageContext?.project?.description}
              </Text>
            ) : currentTab === 'updates' ? (
              <UpdatesTab project={project} isOwner={isOwner} />
            ) : (
              <DonationsTab />
            )}
          </Box>
        </Box>
        <FloatingDonateView
          sx={{
            right: '10%',
            p: 2,
            pb: 4,
            marginTop: '-3rem',
            borderRadius: '30px',
            width: '20%',
            flexDirection: 'column',
            alignContent: 'center',
            backgroundColor: 'white',
            zIndex: 100
          }}
        >
          <Button
            variant='default'
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px',
              backgroundColor: isOwner && 'secondary'
            }}
            onClick={() =>
              isOwner
                ? window.location.replace('/account')
                : window.location.replace(`/donate/${project?.slug}`)
            }
          >
            {isOwner ? 'Edit' : 'Donate'}
          </Button>
          <Flex
            sx={{
              justifyContent: 'space-around',
              fontFamily: 'heading',
              textTransform: 'uppercase',
              my: '20px'
            }}
          >
            <Text>Givers: {totalGivers}</Text>
            <Text sx={{ pl: 4, borderLeft: '2px solid #edf0fa' }}>
              Donations: {totalDonations}
            </Text>
          </Flex>
          <Flex sx={{ justifyContent: 'space-evenly' }}>
            {project?.categories.length > 0 &&
              project?.categories.map(category => {
                return (
                  <Text
                    sx={{
                      color: 'primary',
                      borderColor: 'primary',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      display: 'inline',
                      fontSize: 1,
                      fontFamily: 'body',
                      mt: '9px',
                      backgroundColor: 'white',
                      borderRadius: '18px',
                      paddingY: 1,
                      paddingX: 2,
                      textAlign: 'center'
                    }}
                  >
                    {category?.name?.toUpperCase()}
                  </Text>
                )
              })}
          </Flex>

          <Flex sx={{ justifyContent: 'center' }}>
            <Link to='/projects'>
              <Text
                sx={{
                  color: 'primary',
                  textDecoration: 'none',
                  mt: '10px'
                }}
              >
                View similar projects
              </Text>
            </Link>
          </Flex>
        </FloatingDonateView>
      </Flex>
      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </>
  )
}
