import React, { useState } from 'react'
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

const IndexPage = () => {
  // const [isLoggedIn] = useState(checkIfLoggedIn())
  const [isLoggedIn] = useState(true)
  const [projectAdded, setProjectAdded] = useState(false)
  const [addedProject, setAddedProject] = useState({})
  const [addProjectQuery, { data }] = useMutation(ADD_PROJECT)
  const [formValues, setFormValues] = useState({})

  const onSubmit = async values => {
    setFormValues(values)
    setProjectAdded(true)

    const projectCategories = []
    for (const category in values.projectCategory) {
      if (values.projectCategory[category].length !== 0) {
        projectCategories.push(category)
      }
    }

    try {
      const project = await addProjectQuery({
        variables: {
          project: {
            title: values.projectName,
            description: values.projectDescription,
            admin: values.projectAdmin,
            image: values.projectImage,
            impactLocation: values.projectImpactLocation,
            categories: projectCategories
          }
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
                left: '300px'
              }}
              className='hide'
            />
            <HighFive
              projectImage={addedProject.image}
              projectTitle={addedProject.title}
              projectDescription={addedProject.description}
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
