import React, { useState } from 'react'
import * as queryString from 'query-string'
import SEO from '../components/seo'
import CreateProjectForm from '../components/create-project-form'
import { useMutation } from '@apollo/react-hooks'
import { Text } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'
import decoratorClouds from '../images/decorator-clouds.png'
import peoplePuzzle2 from '../images/people-puzzle2.png'
import decoratorFizzySquare from '../images/decorator-fizzy-square.png'
import peopleStretching from '../images/people-stretching.png'
import HighFive from '../components/create-project-form/highFive'
import { ProjectBankAccountInput } from '../components/create-project-form/inputs'

const IndexPage = props => {
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addProjectQuery] = useMutation(ADD_PROJECT)
  const [formValues, setFormValues] = useState({})
  const [askedBankAccount, setAskedBankAccount] = useState(false)

  const { projectId } = queryString.parse(props.location.search)
  console.log({ projectId })
  const onSubmit = async (values, pinnedImageUrl) => {
    console.log({ values, pinnedImageUrl })
    values.projectImage = pinnedImageUrl
    setFormValues(values)
    console.log(`form submit values ---> : ${JSON.stringify(values, null, 2)}`)
    setProjectAdded(true)

    try {
      const project = await addProjectQuery({
        variables: {
          title: values.projectName,
          description: values.projectDescription
        },
        refetchQueries: [{ query: FETCH_PROJECTS }]
      })

      if (project) {
        console.log(`project : ${JSON.stringify(project, null, 2)}`)
        setProjectAdded(project)
      }
    } catch (error) {
      console.log(`Error adding project: ---> : ${error}`)
    }
  }

  function AfterCreation() {
    // TODO: Get project id after creation
    if (!projectAdded && !projectId) {
      return <h3>loading</h3>
    }
    if (!askedBankAccount && !projectId) {
      console.log({ projectAdded })
      return (
        <>
          <img
            src={decoratorClouds}
            alt=''
            css={{
              position: 'absolute',
              top: '57px',
              right: '434px',
              zIndex: -1
            }}
            className='hide'
          />
          <img
            src={peoplePuzzle2}
            alt=''
            css={{
              position: 'absolute',
              top: '417px',
              right: '0px',
              zIndex: -1
            }}
            className='hide'
          />
          <ProjectBankAccountInput
            projectId={projectAdded?.data?.addProjectSimple?.id}
            finalize={() => setAskedBankAccount(true)}
          />
        </>
      )
    } else {
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
            projectId={projectId}
            projectImage={formValues.projectImage}
            projectTitle='test'
            projectDescription='Testtesttest'
          />
        </>
      )
    }
  }

  function ProjectForm() {
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
