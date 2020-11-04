import React, { useState } from 'react'
import * as queryString from 'query-string'
import SEO from '../components/seo'
import CreateProjectForm from '../components/create-project-form'
import { useMutation } from '@apollo/react-hooks'
import { Text } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'
import { Link } from 'gatsby'
import decoratorClouds from '../images/decorator-clouds.svg'
import peoplePuzzle2 from '../images/people-puzzle2.svg'
import decoratorFizzySquare from '../images/decorator-fizzy-square.svg'
import peopleStretching from '../images/people-stretching.png'
import HighFive from '../components/create-project-form/highFive'
import { ProjectBankAccountInput } from '../components/create-project-form/inputs'

const IndexPage = props => {
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addedProject, setAddedProject] = useState({})
  const [addProjectQuery, { data }] = useMutation(ADD_PROJECT)
  const [formValues, setFormValues] = useState({})
  // const [askedBankAccount, setAskedBankAccount] = useState(false)

  const { projectId } = queryString.parse(props.location.search)
  const onSubmit = async values => {
    setFormValues(values)
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

    const projectData = {
      title: values.projectName,
      description: values.projectDescription,
      admin: values.projectAdmin,
      impactLocation: values.projectImpactLocation,
      categories: projectCategories
    }
    if (values.projectImage.length === 1) {
      projectData.imageStatic = values.projectImage
    } else {
      const imageFile = await getImageFile(
        values.projectImage,
        values.projectName
      )
      projectData.imageUpload = imageFile
    }

    try {
      const project = await addProjectQuery({
        variables: {
          project: projectData
        },
        refetchQueries: [{ query: FETCH_PROJECTS }]
      })

      if (project) {
        console.log(`project : ${JSON.stringify(project, null, 2)}`)
        setAddedProject(project.data.addProject)
        setProjectAdded(true)
      }
    } catch (error) {
      console.log(`Error adding project: ---> : ${error}`)
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
        <img
          src={peopleStretching}
          alt=''
          css={{
            position: 'absolute',
            top: '240px',
            right: '130px',
            width: '252px',
            height: '610px',
            zIndex: '-1'
          }}
          className='hide'
        />
        <img
          src={decoratorFizzySquare}
          alt=''
          css={{
            position: 'absolute',
            top: '260px',
            left: '380px',
            zIndex: '-1'
          }}
          className='hide'
        />
        <HighFive
          projectId={addedProject.id}
          projectImage={addedProject.image}
          projectTitle={addedProject.title}
          projectDescription={addedProject.description}
        />
      </>
    )
  }

  function ProjectForm () {
    if (isLoggedIn === true) {
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
            <CreateProjectForm onSubmit={onSubmit} />
          </>
        )
      } else {
        return (
          <>
            <AfterCreation />
          </>
        )
      }
    } else {
      return (
        <Text
          sx={{
            fontSize: 6,
            fontFamily: 'body',
            color: 'secondary',
            mt: '16px'
          }}
        >
          Please log in to create a project.
        </Text>
      )
    }
  }

  return (
    // <Layout>
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
      <SEO title='Create Project' />

      <ProjectForm />
    </div>
    // </Layout>
  )
}

export default IndexPage
