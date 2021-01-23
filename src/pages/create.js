import React, { useState } from 'react'
import * as queryString from 'query-string'
import { navigate } from 'gatsby'
import Web3 from 'web3'
import Seo from '../components/seo'
import CreateProjectForm from '../components/create-project-form'
import { useMutation } from '@apollo/client'
import { Flex, Text, Spinner, Image } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'
import Layout from '../components/layout'
import decoratorClouds from '../images/decorator-clouds.svg'
import peoplePuzzle2 from '../images/people-puzzle2.svg'
import decoratorFizzySquare from '../images/decorator-fizzy-square.svg'
import peopleStretching from '../images/people-stretching.png'
import HighFive from '../components/create-project-form/highFive'
import fetch from 'isomorphic-fetch'
import { TorusContext } from '../contextProvider/torusProvider'

// import { ProjectBankAccountInput } from '../components/create-project-form/inputs'

const IndexPage = ({ data, location }) => {
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  // const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addedProject, setAddedProject] = useState(null)
  const [addProjectQuery] = useMutation(ADD_PROJECT)
  // const [askedBankAccount, setAskedBankAccount] = useState(false)

  const { projectId } = queryString.parse(location.search)
  const onSubmit = async (values, walletAddress) => {
    setProjectAdded(true)

    const projectCategories = []
    for (const category in values.projectCategory) {
      if (values.projectCategory[category].length !== 0) {
        projectCategories.push(category)
      }
    }
    const getImageFile = async (base64Data, projectName) => {
      const imageFile = fetch(base64Data)
        .then(res => res.blob())
        .then(blob => {
          return new File([blob], projectName)
        })
      console.log('found it', imageFile)
      return imageFile
    }
    const siteId = process.env.GATSBY_SITE_ID
    let organisationId
    if (siteId === 'giveth') {
      organisationId = 1
    } else if (siteId === 'gaia-giveth') {
      organisationId = 2
    } else {
      throw new Error(
        `Invalid siteId ${process.env.GATSBY_SITE_ID}, checking GATSBY_SITE_ID in the .env config, it should be either 'giveth' or 'gaia-giveth'`
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
    if (values.projectImage.length === 1) {
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
        console.log(`project : ${JSON.stringify(project, null, 2)}`)
        setAddedProject(project.data.addProject)
        setProjectAdded(true)
        window?.localStorage.removeItem('create-form')
      }
    } catch (error) {
      console.log(`Error adding project: ---> : ${error}`)
      console.log(`${JSON.stringify(projectData, null, 2)}`)
    }
  }

  function AfterCreation () {
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
        <img
          src={decoratorClouds}
          alt=''
          css={{
            position: 'absolute',
            top: '57px',
            right: '185px',
            zIndex: '-1'
          }}
          className='hide'
        />
        <Image
          src={peopleStretching}
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
          src={decoratorFizzySquare}
          alt=''
          sx={{
            position: 'absolute',
            top: '260px',
            left: ['80px', '80px', '180px'],
            zIndex: '-1'
          }}
          className='hide'
        />
        {addedProject ? (
          <HighFive
            project={addedProject}
            addedProject={addedProject}
            projectId={projectId || addedProject.id}
            projectImage={addedProject.image}
            projectTitle={addedProject.title}
            projectDescription={addedProject.description}
          />
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
              Setting everything up...
            </Text>
            <Spinner variant='spinner.large' />
          </Flex>
        )}
      </>
    )
  }

  function ProjectForm () {
    if (!projectAdded && !projectId) {
      return (
        <>
          <img
            src={decoratorClouds}
            alt=''
            css={{
              position: 'absolute',
              top: '57px',
              right: '434px'
            }}
            className='hide'
          />
          <img
            src={peoplePuzzle2}
            alt=''
            css={{
              position: 'absolute',
              top: '417px',
              right: '0px'
            }}
            className='hide'
          />
          <CreateProjectForm
            onSubmit={onSubmit}
            categoryList={data.giveth.categories}
          />
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
export const pageQuery = graphql`
  query {
    giveth {
      categories {
        name
        value
      }
    }
  }
`
export default IndexPage
