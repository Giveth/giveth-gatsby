import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import gql from 'graphql-tag'
import Loadable from '@loadable/component'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import ProjectListing from '../components/projectListing'
import AddProject from '../components/AddProject'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  setUser,
  checkIfLoggedIn,
  setIsLoggedIn,
  getUser,
  handleLogout
} from '../services/auth'

import { FETCH_PROJECTS, ADD_PROJECT } from '../apollo/gql/projects'

// placeholder image
import NoImage from '../images/no-image-available.jpg'

const IndexPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())

  const { loading, error, data } = useQuery(FETCH_PROJECTS)
  const [addProjectQuery, x] = useMutation(ADD_PROJECT)
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
    return null
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
