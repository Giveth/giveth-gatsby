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
import TypeForm from './TypeForm'
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
    console.log(`form submit values ---> : ${values}`)
    props.addProject(values)
  }
  const TitleComponent = props => (
    <Box>
      <br />
      <br />
      <Label htmlFor='title'>
        <Heading as='h5' style={{ fontSize: '2em', fontWeight: 'light' }}>
          What's the name of your project?
        </Heading>
      </Label>
      <br />
      <br />

      <Input
        ref={register({
          validate: value => value !== 'admin' || 'Nice try!'
        })}
        sx={{
          variant: 'borderless',
          '&.active': {
            color: 'primary'
          }
        }}
        name='title'
        mb={3}
        placeholder='Project Name'
        style={{ fontSize: '1.5em' }}
      />
    </Box>
  )

  const DescriptionComponent = props => (
    <Box>
      <Label htmlFor='description'>
        <Heading as='h3'>What is your project about?</Heading>
      </Label>
      <br />
      <br />
      <Textarea
        name='description'
        rows='6'
        mb={3}
        ref={register({
          validate: value => value !== 'admin' || 'Nice try!'
        })}
        name='description'
      />
    </Box>
  )
  // if (loading || !data) {
  //   return <h1>loading...</h1>
  // }
  return (
    <Box>
      <Heading as='h5'>CREATE A NEW PROJECT</Heading>
      <br />
      <br />
      <br />

      <TypeForm
        submitBtnText={'Start raising funds'}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <Box as='form' onSubmit={handleSubmit(onSubmit)}> */}
        <TitleComponent />
        <DescriptionComponent />

        {/* <Button>Submit</Button> */}
        {/* </Box> */}
      </TypeForm>
    </Box>
  )
}
export default AddProject
