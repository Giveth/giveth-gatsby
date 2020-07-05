import React, { useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import AddProject from '../components/AddProject'
import { useMutation } from '@apollo/react-hooks'
import { checkIfLoggedIn } from '../services/auth'

import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'

const IndexPage = () => {
  const [isLoggedIn] = useState(checkIfLoggedIn())

  const [addProjectQuery] = useMutation(ADD_PROJECT)
  const addProject = async values => {
    // addProject({
    //   variables: { title: values.title, description: values.description }
    // })
    const project = await addProjectQuery({
      variables: {
        title: values.title,
        description: values.description
      },
      refetchQueries: [{ query: FETCH_PROJECTS }]
    })

    console.log(`project ---> : ${project}`)
  }

  function ProjectForm () {
    if (isLoggedIn === true) {
      return (
        <>
          <AddProject addProject={addProject} />
          <br />
        </>
      )
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
