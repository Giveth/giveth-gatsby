/** @jsx jsx */
import { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Grid, Button, Input, jsx } from 'theme-ui'

const MailchimpSignup = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = async e => {
    if (email !== '') {
      e.preventDefault()
      const result = await addToMailchimp(email)
        .then(console.log(email))
        .then(setEmail('Thank you for signing up'))
      return result
    } else {
      alert.show('Please enter a valid email address')
    }
  }

  const handleChange = e => {
    setEmail(e.target.value)
  }

  return (
    <Grid
      as='form'
      columns={[2, '1fr auto']}
      onSubmit={handleSubmit}
      sx={{ maxWidth: '780px' }}
      pt='30px'
      pb='100px'
    >
      <Input
        type='text'
        value={email}
        placeholder='Your email address'
        onChange={handleChange}
      />
      <Button
        sx={{ variant: 'buttons.default', minWidth: '180px' }}
        type='submit'
      >
        Subscribe
      </Button>
    </Grid>
  )
}

export default MailchimpSignup
