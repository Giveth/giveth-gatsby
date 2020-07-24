/** @jsx jsx */
import React, {useState} from 'react'
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { Grid, Box, Button, Input, Heading, Text, jsx } from 'theme-ui'


const MailchimpSignup = props => {
  // Since `addToMailchimp` returns a promise, you
  // can handle the response in two different ways:

  // Note that you need to send an email & optionally, listFields
  // these values can be pulled from React state, form fields,
  // or wherever.  (Personally, I recommend storing in state).

  // 1. via `.then`
  const [email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    if (email !== ''){
    e.preventDefault();
    const result = await addToMailchimp(email)
    .then(console.log(email))
    .then(setEmail('Thank you for signing up'))}
    else {
        alert('Please enter a valid email address')
    }
  }

  const handleChange = e => {
      setEmail(e.target.value)
  }
  
  return (
        <Box as='form' onSubmit={handleSubmit}>
          <Input type='text' value={email} placeholder='Your email address' onChange={handleChange}/>
          <Button sx={{variant: 'buttons.default'}} type='submit'>Subscribe</Button>
        </Box>
    )
}

export default MailchimpSignup