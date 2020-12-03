import React, { useState, useEffect } from 'react'
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Flex,
  Image,
  Text,
  Box,
  Button
} from 'theme-ui'
import { useForm } from 'react-hook-form'

const Tokenize = props => {
  //const { doTokenization } = props
  const { handleSubmit, register } = useForm()

  const onSubmit = values => {
    console.log(`values : ${JSON.stringify(values, null, 2)}`)
    // doTokenization(values)
  }

  return (
    <>
      <Text
        sx={{
          variant: ['headings.h5', null, ''],
          color: 'secondary'
        }}
      >
        Tokenize a carbon credit:
      </Text>
      <br />
      <Box as='form' onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='username'>Serial number</Label>
        <Input name='username' id='username' mb={3} />
        <Button>Submit</Button>
      </Box>
    </>
  )
}

export default Tokenize
