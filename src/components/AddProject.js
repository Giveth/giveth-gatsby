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

const AddProject = props => {
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
        // ref={register({
        //   validate: value => value !== 'admin' || 'Nice try!'
        // })}
        ref={props.currentRef}
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
        // ref={register({
        //   validate: value => value !== 'admin' || 'Nice try!'
        // })}
        ref={props.currentRef}
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
        fields={[
          {
            name: 'title',
            label: 'PROJECT NAME',
            value: '',
            headStyle: 'h2',
            component: TitleComponent
          },
          {
            name: 'description',
            label: 'DESCRIPTION',
            value: '',
            headStyle: 'h3',
            component: DescriptionComponent
          }
        ]}
      >
        {/* <TitleComponent />
        <DescriptionComponent /> */}
      </TypeForm>
    </Box>
  )
}
export default AddProject
