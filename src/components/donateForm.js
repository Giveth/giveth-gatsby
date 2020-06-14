import React from 'react'
/** @jsx jsx */
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

const Donate = props => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = values => {
    console.log(`values : ${JSON.stringify(values, null, 2)}`)
    props.doDonate(values)
  }

  return (
    <Box>
      <Heading as='h5'>Donate</Heading>

      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='title'>Amount:</Label>
        <Input
          ref={register({
            validate: value => value !== 'admin' || 'Nice try!'
          })}
          name='amount'
          mb={3}
        />

        <Button style={{ cursor: 'pointer' }}>Donate</Button>
      </Box>
    </Box>
  )
}
export default Donate
