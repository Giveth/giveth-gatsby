import React, { useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import AddProject from '../components/AddProject'
import { useMutation } from '@apollo/react-hooks'
import { checkIfLoggedIn } from '../services/auth'
import { Heading, Box, Text } from 'theme-ui'
import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'
import { Link } from 'gatsby'

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
            <AddProject onSubmit={onSubmit} />
            <br />
          </>
        )
      } else {
        return (
          <Box>
            <Heading sx={{ variant: 'headings.display' }}>High five!</Heading>
            <Text sx={{ variant: 'text.large' }}>
              Your project is published and ready to raise funds.
            </Text>
            <Text sx={{ variant: 'text.medium' }}>
              <Link to='/'>View my project</Link>
            </Text>

            <Text sx={{ variant: 'text.medium' }}>
              <Link to='/'>Go to home page</Link>
            </Text>
          </Box>
        )
      }
    } else {
      return <h3>Please log in to create a project</h3>
    }
  }

  return (
    <Layout>
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
    </Layout>
  )
}

export default IndexPage
