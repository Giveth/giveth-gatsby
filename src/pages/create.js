import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Heading, Box, Text } from 'theme-ui'

import { useMutation } from '@apollo/react-hooks'
import { checkIfLoggedIn } from '../services/auth'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'

import Layout from '../components/layout'
import SEO from '../components/seo'
import CreateProjectForm from '../components/create-project-form'
import HighFive from '../components/create-project-form/HighFive'
import decoratorClouds from '../images/decorator-clouds.png'
import peoplePuzzle from '../images/people-puzzle.png'

const IndexPage = () => {
  const [isLoggedIn] = useState(checkIfLoggedIn())
  const [projectAdded, setProjectAdded] = useState(false)
  const [addProjectQuery] = useMutation(ADD_PROJECT)

  const onSubmit = async values => {
    // addProject({
    //   variables: { title: values.title, description: values.description }
    // })
    console.log(`form submit values ---> : ${JSON.stringify(values, null, 2)}`)

    try {
      const project = await addProjectQuery({
        variables: {
          title: values.title,
          description: values.description
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
              src={peoplePuzzle}
              alt=''
              css={{
                position: 'absolute',
                top: '417px',
                right: '81px'
              }}
              className='hide'
            />
            <CreateProjectForm onSubmit={onSubmit} />
          </>
        )
      } else {
        return <HighFive />
      }
    } else {
      return <h3>Please log in to create a project</h3>
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
