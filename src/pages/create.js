import React, { useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import CreateProjectForm from '../components/create-project-form'
import { useMutation } from '@apollo/react-hooks'
import { checkIfLoggedIn } from '../services/auth'
import { Heading, Box, Text } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'
import { Link } from 'gatsby'
import decoratorClouds from '../images/decorator-clouds.png'
import peoplePuzzle2 from '../images/people-puzzle2.png'
import decoratorFizzySquare from '../images/decorator-fizzy-square.png'
import peopleStretching from '../images/people-stretching.png'
import HighFive from '../components/create-project-form/highFive'

const IndexPage = () => {
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addProjectQuery] = useMutation(ADD_PROJECT)
  const [formValues, setFormValues] = useState({})

  const onSubmit = async (values, pinnedImageUrl) => {
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
        setProjectAdded(true)
      }
    } catch (error) {
      console.log(`Error adding project: ---> : ${error}`)
    }
  }

  function ProjectForm () {
    if (isLoggedIn === true) {
      if (!projectAdded) {
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
            <img
              src={decoratorClouds}
              alt=''
              css={{
                position: 'absolute',
                top: '57px',
                right: '185px'
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
                height: '610px'
              }}
              className='hide'
            />
            <img
              src={decoratorFizzySquare}
              alt=''
              css={{
                position: 'absolute',
                top: '260px',
                left: '380px'
              }}
              className='hide'
            />
            <HighFive
              projectImage={formValues.projectImage}
              projectTitle='test'
              projectDescription='Testtesttest'
            />
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
        maxWidth: '1440px',
        margin: '0 auto'
      }}
    >
      <SEO title='Home' />

      <ProjectForm />
    </div>
    // </Layout>
  )
}

export default IndexPage
