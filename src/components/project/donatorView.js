import React, { useState, useEffect } from 'react'
import { Flex, Image, Badge, Text, Box, Button } from 'theme-ui'
import { getEtherscanTxs } from '../../utils'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { TorusContext } from '../../contextProvider/torusProvider'
import { PopupContext } from '../../contextProvider/popupProvider'

import testImg from '../../images/giveth-test-image.png'
import ProjectImageGallery1 from '../../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../../images/svg/create/projectImageGallery4.svg'
import { FaShareAlt } from 'react-icons/fa'
import { ImLocation } from 'react-icons/im'

import { Link } from 'gatsby'
import { useQuery, useApolloClient } from '@apollo/client'
import {
  GET_STRIPE_PROJECT_DONATIONS,
  GET_PROJECT_UPDATES
} from '../../apollo/gql/projects'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'

const DonationsTab = React.lazy(() => import('./donationsTab'))
const UpdatesTab = React.lazy(() => import('./updatesTab'))
const FloatingDonateView = styled(Flex)`
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
  const usePopup = React.useContext(PopupContext)
  const isSSR = typeof window === 'undefined'
  const client = useApolloClient()

  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const project = pageContext?.project
  useEffect(() => {
    const firstFetch = async () => {
      try {
        // Add donations to current project store
        if (!project.walletAddress) return
        // Etherscan not used anymore front side
        // const cryptoTxs = await getEtherscanTxs(
        //   project.walletAddress,
        //   client,
        //   true
        // )

        let donations = project?.donations
        const ethBalance = donations?.reduce(
          (prev, current) => prev + current?.amount,
          0
        )
        // Get Updates
        const updates = await client?.query({
          query: GET_PROJECT_UPDATES,
          variables: {
            projectId: parseInt(project?.id),
            take: 100,
            skip: 0
          }
        })

        setCurrentProjectView({
          ...currentProjectView,
          ethBalance,
          donations,
          updates: updates?.data?.getProjectUpdates
        })

        setTotalGivers(
          [...new Set(donations?.map(data => data?.fromWalletAddress))].length
        )
        setIsOwner(pageContext?.project?.admin === user.userIDFromDB)
      } catch (error) {
        console.log({ error })
      }
    }

    firstFetch()
  }, [])
  const showMap = process.env.OPEN_FOREST_MAP
    ? process.env.OPEN_FOREST_MAP
    : false

  const setImage = img => {
    if (/^\d+$/.test(img)) {
      // Is not url
      let svg = null
      const style = {
        objectFit: 'cover',
        // objectPosition: '100% 25%',
        width: '100%',
        height: '100%',
        margin: '0 5%',
        borderRadius: '10px'
      }
      switch (parseInt(img)) {
        case 1:
          svg = <ProjectImageGallery1 style={style} />
          break
        case 2:
          svg = <ProjectImageGallery2 style={style} />
          break
        case 3:
          svg = <ProjectImageGallery3 style={style} />
          break
        case 4:
          svg = <ProjectImageGallery4 style={style} />
          break
      }
      return svg
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
              width: '100vw',
              margin: '0 5%',
              height: '250px',
              borderRadius: '10px'
            }}
          />
        )}
      </Flex>
      <Flex
        sx={{
          width: '90%',
          flexDirection: ['column', 'row', 'row'],
          margin: 'auto',
          justifyContent: 'space-around'
        }}
      >
        <Box sx={{ width: ['100%', null, '70%'] }}>
          <Flex
            sx={{
              mt: '20px',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Text
                sx={{
                  fontSize: 9,
                  fontFamily: 'heading',
                  fontWeight: 'bold',
                  color: 'secondary',
                  wordBreak: 'break-word'
                }}
              >
                {pageContext?.project?.title}
              </Text>
              <Flex
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text
                  sx={{
                    fontSize: 6,
                    fontFamily: 'body',
                    fontWeight: 'body',
                    color: 'primary',
                    mt: '10px'
                  }}
                ></Text>
                {pageContext?.project?.impactLocation && (
                  <Flex>
                    <ImLocation size='24px' color={theme.colors.secondary} />
                    <Text
                      sx={{
                        color: 'secondary',
                        fontWeight: '500',
                        wordBreak: 'break-all',
                        px: 2
                      }}
                    >
                      {pageContext?.project?.impactLocation}
                    </Text>
                  </Flex>
                )}
              </Flex>
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
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              height: '60px',
              mt: '20px'
            }}
          >
            <Button
              variant='nofill'
              type='button'
              sx={{ width: ['25%', '100%'] }}
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
              sx={{ width: ['25%', '100%'] }}
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
                {currentProjectView?.updates ? (
                  <Badge variant='blueDot' sx={{ ml: [-2, 2] }}>
                    <Text sx={{ color: 'white', mt: '-2px' }}>
                      {currentProjectView?.updates.length}{' '}
                    </Text>
                  </Badge>
                ) : (
                  ''
                )}
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              sx={{ width: ['25%', '100%'] }}
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
                Donations{' '}
                {currentProjectView?.donations
                  ? `( ${currentProjectView?.donations.length} )`
                  : ''}
              </Text>
            </Button>
          </Flex>
          <Box sx={{ mt: '30px' }}>
            {currentTab === 'description' ? (
              <>
                <Text
                  sx={{
                    mb: 4,
                    wordBreak: 'break-word',
                    whiteSpace: 'break-spaces',
                    width: '100%',
                    fontSize: 3,
                    fontFamily: 'body',
                    fontWeight: 'body',
                    color: 'black'
                  }}
                >
                  {pageContext?.project?.description}
                </Text>
              </>
            ) : currentTab === 'updates' && !isSSR ? (
              <React.Suspense fallback={<div />}>
                <UpdatesTab project={project} isOwner={isOwner} />
              </React.Suspense>
            ) : (
              !isSSR && (
                <React.Suspense fallback={<div />}>
                  <DonationsTab project={project} />
                </React.Suspense>
              )
            )}
          </Box>
        </Box>
        <FloatingDonateView
          sx={{
            left: [null, null, '-1%'],
            p: 2,
            pb: 4,
            marginTop: '-2rem',
            borderRadius: '30px',
            width: ['100%', '50%', '20%'],
            flexDirection: 'column',
            alignContent: 'center',
            backgroundColor: 'white',
            position: 'relative',
            bottom: [0, null, null],
            zIndex: [2, 0, 0]
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
                ? window.location.replace(
                    `/account?data=${project?.slug}&view=projects`
                  )
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
            <Text>Givers: {totalGivers || 0}</Text>
            <Text sx={{ pl: 4, borderLeft: '2px solid #edf0fa' }}>
              Donations: {project?.donations?.length || 0}
            </Text>
          </Flex>
          <Flex sx={{ justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
            {project?.categories.length > 0 &&
              project?.categories.map((category, index) => {
                return (
                  <Text
                    key={index}
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

          <Flex sx={{ justifyContent: 'center', mt: 2 }}>
            <Link to='/projects' style={{ textDecoration: 'none' }}>
              <Text
                sx={{
                  variant: 'text.medium',
                  color: 'primary',
                  textDecoration: 'none',
                  mt: '5px'
                }}
              >
                View similar projects
              </Text>
            </Link>
          </Flex>
          <Flex
            sx={{
              mt: 2,
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              width: '100%',
              cursor: 'pointer',
              mt: '5px'
            }}
            onClick={() => {
              usePopup?.triggerPopup('share', {
                title: project?.title,
                description: project?.description,
                slug: project?.slug
              })
            }}
          >
            <FaShareAlt size={'12px'} color={theme.colors.secondary} />
            <Text
              sx={{
                variant: 'text.medium',
                color: 'secondary',
                textDecoration: 'none',
                ml: '10px'
              }}
            >
              Share
            </Text>
          </Flex>
        </FloatingDonateView>
      </Flex>
      {showMap ? (
        <iframe
          width='100%'
          height='600'
          src='https://explorer.land/embed/project/balam1'
          frameborder='0'
          allowfullscreen
        ></iframe>
      ) : null}
      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </>
  )
}
