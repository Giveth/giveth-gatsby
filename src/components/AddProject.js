import React from 'react'
/** @jsx jsx */
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  jsx,
  Box,
  Label,
  Input,
  Checkbox,
  Select,
  Textarea,
  Flex,
  Radio,
  Slider,
  Button,
  Heading
} from 'theme-ui'

import { useForm } from 'react-hook-form'
// import {
//   // FETCH_PROJECTS,
//   ADD_PROJECT,
//   ADD_PROJECT_SIMPLE
// } from '../apollo/gql/projects'
const ADD_PROJECT = gql`
  mutation($title: String!, $description: String!) {
    addProject(project: { title: $title, description: $description }) {
      title
      description
    }
  }
`

const ADD_PROJECT_SIMPLE = gql`
  mutation($title: String!, $description: String!) {
    addProjectSimple(title: $title, description: $description) {
      title
      description
    }
  }
`
const AddProject = props => {
  //const { loading, error, data, subscribeToMore } = useQuery(FETCH_PROJECTS)
  // const { loading } = useQuery(FETCH_PROJECTS)

  //const [addProject] = useMutation(ADD_PROJECT)
  const [addProjectSimple, x] = useMutation(ADD_PROJECT_SIMPLE)
  // const [addProject, y] = useMutation(ADD_PROJECT)

  const { handleSubmit, register, errors } = useForm()
  const onSubmit = values => {
    props.addProject(values)
  }

  // if (loading || !data) {
  //   return <h1>loading...</h1>
  // }
  return (
    <Box>
      <Heading as='h3'>Add a new project</Heading>

      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='title'>Title:</Label>
        <Input
          ref={register({
            validate: value => value !== 'admin' || 'Nice try!'
          })}
          name='title'
          mb={3}
        />

        <Label htmlFor='description'>Description</Label>
        <Textarea
          name='description'
          rows='6'
          mb={3}
          ref={register({
            validate: value => value !== 'admin' || 'Nice try!'
          })}
          name='description'
        />
        {/*         

        <Label htmlFor='sound'>Sound</Label>
        <Select name='sound' mb={3}>
          <option>Beep</option>
          <option>Boop</option>
          <option>Blip</option>
        </Select>
       <Flex mb={3}>
          <Label>
            <Radio name='letter' /> Alpha
          </Label>
          <Label>
            <Radio name='letter' /> Bravo
          </Label>
          <Label>
            <Radio name='letter' /> Charlie
          </Label>
        </Flex>
        <Label>Slider</Label>
        <Slider mb={3} /> */}
        <Button>Submit</Button>
      </Box>
    </Box>
  )
}
export default AddProject
