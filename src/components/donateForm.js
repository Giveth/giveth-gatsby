import React from 'react'
import { Label, Input, Button } from 'theme-ui'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'

const DonationForm = styled.form`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 0px auto auto;
  align-items: bottom;
  padding: 0.2rem 0px;
  .donatebutton {
    align-self: start;
    height: 36px;
    background-color: ${theme.colors.primary};
  }
`

const Donate = props => {
  const { handleSubmit, register } = useForm()
  const onSubmit = values => {
    console.log(`values : ${JSON.stringify(values, null, 2)}`)
    props.doDonate(values)
  }

  return (
    <DonationForm
      onSubmit={handleSubmit(onSubmit)}
      gap={1}
      columns={['0px 1fr 1fr']}
    >
      <Label htmlFor='title' />
      <Input
        ref={register({
          validate: value => value !== 'admin' || 'Nice try!'
        })}
        name='amount'
        mb={3}
        placeholder='Amount'
      />

      <Button sx={{ variant: 'buttons.tiny' }} className='donatebutton'>
        Donate
      </Button>
    </DonationForm>
  )
}
export default Donate
