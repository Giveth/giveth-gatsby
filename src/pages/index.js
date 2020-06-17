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

import {
  FETCH_PROJECTS,
  ADD_PROJECT,
  ADD_PROJECT_SIMPLE
} from '../apollo/gql/projects'

// placeholder image
import NoImage from '../images/no-image-available.jpg'

const IndexPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfLoggedIn())

  const [showProjectForm, setShowProjectForm] = useState(false)
  const { loading, error, data } = useQuery(FETCH_PROJECTS)
  const [addProjectQuery, x] = useMutation(ADD_PROJECT_SIMPLE)
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

  function ProjectForm() {
    if (isLoggedIn === true && showProjectForm) {
      return (
        <>
          <AddProject addProject={addProject} />
          <br />
        </>
      )
    }
    return null
  }

  function AddProjectButton(props) {
    if (isLoggedIn === true) {
      return (
        <Button
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={props.toggleProjectForm}
        >
          Add project
        </Button>
      )
    } else return null
  }
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
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
      >
        <SEO title="Home" />
        <AddProjectButton toggleProjectForm={toggleProjectForm} />
        <ProjectForm />
        <br />
        <Grid columns={[1, 2, 3]} style={{ justifyItems: 'center' }}>
          <ProjectListing
            name="Giveth DAC"
            image="https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png"
            raised={1223}
          />
          <ProjectListing
            name="Aragon DAC"
            image="https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png"
            raised={423}
          />
          <ProjectListing
            name="OSBE DAC"
            image="https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk"
            raised={0}
          />
          <ProjectListing
            name="Unicorn DAC"
            image="https://feathers.beta.giveth.io/uploads/5906e1be14c47c0a18b44a29fe8873ddfb6440a8a212cf42bacb84b7e2e1c0c1.png"
            raised={10004}
          />
          {data &&
            data.projects &&
            data.projects &&
            data.projects.map(project => (
              <ProjectListing name={project.title} image={NoImage} />
            ))}
        </Grid>
      </div>
    </Layout>
  )
}

export default IndexPage
