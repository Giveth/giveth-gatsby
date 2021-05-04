import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import * as queryString from 'query-string'
import Web3 from 'web3'
import Seo from '../../components/seo'
import { useMutation } from '@apollo/client'
import { Flex, Text, Spinner, Image } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../../apollo/gql/projects'
import Layout from '../../components/layout'
// import decoratorClouds from "../images/decorator-clouds.svg";
// import peoplePuzzle2 from "../images/people-puzzle2.svg";
// import decoratorFizzySquare from "../images/decorator-fizzy-square.svg";
// import peopleStretching from "../images/people-stretching.png";
import HighFive from '../../components/create-project-form/highFive'
import fetch from 'isomorphic-fetch'
import { useWallet } from '../../contextProvider/WalletProvider'
import GithubIssue from '../../components/GithubIssue'
import Logger from '../../Logger'
import { logout } from '../../services/auth'
// import { ProjectBankAccountInput } from '../components/create-project-form/inputs'

// import CreateProjectForm from './index'
const CreateProjectForm = dynamic(() => import('./index'))

const CreateProject = props => {
  const { categories } = props
  const [projectId, setProjectId] = useState(null)
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  // const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addedProject, setAddedProject] = useState(null)
  const [inError, setInError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [addProjectQuery] = useMutation(ADD_PROJECT)
  // const [askedBankAccount, setAskedBankAccount] = useState(false)

  useEffect(() => {
    if (typeof window != 'undefined') {
      const qs = queryString.parse(window.location.search)
      setProjectId(qs?.projectId)
    }
  })
  // const { projectId } = queryString.parse(location?.search)
  const onSubmit = async (values, walletAddress) => {
    try {
      setProjectAdded(true)

      const projectCategories = []
      for (const category in values.projectCategory) {
        if (
          !!values.projectCategory &&
          !!values.projectCategory[category] &&
          values.projectCategory[category]?.length !== 0
        ) {
          projectCategories.push(category)
        }
      }
      console.log({ projectCategories })
      const getImageFile = async (base64Data, projectName) => {
        const imageFile = fetch(base64Data)
          .then(res => res.blob())
          .then(blob => {
            return new File([blob], projectName)
          })
        console.log('found it', imageFile)
        return imageFile
      }
      const siteId = process.env.NEXT_PUBLIC_SITE_ID
      let organisationId
      if (siteId === 'giveth') {
        organisationId = 1
      } else if (siteId === 'gaia-giveth') {
        organisationId = 2
      } else {
        throw new Error(
          `Invalid siteId ${process.env.NEXT_PUBLIC_SITE_ID}, checking NEXT_PUBLIC_SITE_ID in the .env config, it should be either 'giveth' or 'gaia-giveth'`
        )
      }

      const projectData = {
        title: values.projectName,
        description: values.projectDescription,
        admin: values.projectAdmin,
        impactLocation: values.projectImpactLocation,
        categories: projectCategories,
        organisationId,
        walletAddress: Web3.utils.toChecksumAddress(values.projectWalletAddress)
      }
      if (values?.projectImage?.length === 1) {
        projectData.imageStatic = values.projectImage
      } else if (values.projectImage) {
        const imageFile = await getImageFile(
          values.projectImage,
          values.projectName
        )
        projectData.imageUpload = imageFile
      }

      try {
        const project = await addProjectQuery({
          variables: {
            project: { ...projectData }
          },
          refetchQueries: [{ query: FETCH_PROJECTS }]
        })

        if (project) {
          setAddedProject(project.data.addProject)
          setProjectAdded(true)
          window?.localStorage.removeItem('create-form')
        }
      } catch (error) {
        if (error.message === 'Access denied') {
          // TODO : FIX LOGGER
          Logger.captureException(error)
          logout(
            setErrorMessage(
              <>
                <Text
                  sx={{ variant: 'headings.h3', color: 'secondary', mb: 3 }}
                >
                  {`We're so sorry but ${error.message}`}
                </Text>
                <Text sx={{ variant: 'text.default' }}>
                  We have logged you out to resolve this.
                </Text>
                <Text sx={{ variant: 'text.default' }}>
                  <Link to='/'>Please login and start again</Link>
                </Text>
              </>
            )
          )
        } else {
          console.log({ error })
          setErrorMessage(error.message)
        }
        setInError(true)
      }
    } catch (error) {
      console.log({ error })
      setInError(true)
    }
  }

  function newProject() {
    setAddedProject(null)
  }
  function AfterCreation() {
    // TODO: Get project id after creation
    // if (!projectAdded && !projectId) {
    //   return <h3>loading</h3>
    // }
    // if (!askedBankAccount && !projectId) {
    //   return (
    //     <>
    //       <img
    //         src={decoratorClouds}
    //         alt=''
    //         css={{
    //           position: 'absolute',
    //           top: '57px',
    //           right: '434px',
    //           zIndex: -1
    //         }}
    //         className='hide'
    //       />
    //       <img
    //         src={peoplePuzzle2}
    //         alt=''
    //         css={{
    //           position: 'absolute',
    //           top: '417px',
    //           right: '0px',
    //           zIndex: -1
    //         }}
    //         className='hide'
    //       />
    //       <ProjectBankAccountInput
    //         projectId={addedProject?.id}
    //         finalize={() => setAskedBankAccount(true)}
    //       />
    //     </>
    //   )
    // } else {
    return (
      <>
        <Image
          src={'/images/decorator-clouds.svg'}
          alt=''
          sx={{
            position: 'absolute',
            top: '57px',
            right: '185px',
            zIndex: '-1'
          }}
          className='hide'
        />
        <Image
          src={'/images/people-stretching.png'}
          alt=''
          sx={{
            position: 'absolute',
            top: '240px',
            right: [0, 0, '50px'],
            width: [0, '252px', '252px'],
            height: '610px',
            zIndex: '-1'
          }}
          className='hide'
        />
        <Image
          src={'/images/decorator-fizzy-square.svg'}
          alt=''
          sx={{
            position: 'absolute',
            top: '260px',
            left: ['80px', '180px', '180px'],
            zIndex: '-1'
          }}
          className='hide'
        />
        {addedProject ? (
          <HighFive
            project={addedProject}
            addedProject={addedProject}
            projectId={addedProject.id}
            projectImage={addedProject.image}
            projectTitle={addedProject.title}
            projectDescription={addedProject.description}
            newProject={newProject}
          />
        ) : !inError ? (
          <Flex
            sx={{
              mt: '22%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h3', color: 'secondary', mb: 3 }}>
              Setting everything up...
            </Text>
            <Spinner variant='spinner.large' />
          </Flex>
        ) : (
          <Flex
            sx={{
              mt: '22%',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h3', color: 'secondary', mb: 3 }}>
              Something went wrong while adding your project
            </Text>

            {errorMessage}

            <Text sx={{ variant: 'headings.h4', color: 'secondary', mb: 3 }}>
              Please report this issue
            </Text>
            <GithubIssue />
          </Flex>
        )}
      </>
    )
  }

  function ProjectForm() {
    if (!projectAdded && !projectId) {
      return (
        <>
          <img
            src={'/images/decorator-clouds.svg'}
            alt=''
            css={{
              position: 'absolute',
              top: '57px',
              right: '434px'
            }}
            className='hide'
          />
          <img
            src={'/images/people-puzzle2.svg'}
            alt=''
            css={{
              position: 'absolute',
              top: '417px',
              right: '0px'
            }}
            className='hide'
          />
          <CreateProjectForm onSubmit={onSubmit} categoryList={categories} />
        </>
      )
    } else {
      return <AfterCreation />
    }
  }
  return (
    <Layout noFooter noHeader>
      <div
        sx={{
          // applies width 100% to all viewport widths,
          // width 50% above the first breakpoint,
          // and 25% above the next breakpoint
          width: ['100%', '50%', '25%']
        }}
        style={{
          maxWidth: '1440px'
        }}
      >
        <Seo title='Create Project' />

        <ProjectForm />
      </div>
    </Layout>
  )
}

export default CreateProject
