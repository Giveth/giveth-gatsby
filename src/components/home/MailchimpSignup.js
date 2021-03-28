/** @jsx jsx */
import { Grid, Button, Input, jsx, Text, theme } from 'theme-ui'
import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import SubscribedAnimation from '../animations/subscribed'
import { useMediaQuery } from 'react-responsive'

const MailchimpSignup = () => {
  const alert = useAlert()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const handleSubmit = async e => {
    if (email !== '') {
      e.preventDefault()
      const result = await addToMailchimp(email)
        .then(console.log(email))
        .then(setSubscribed(true))
      return result
    } else {
      alert.show('Please enter a valid email address')
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })

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
      {!subscribed && (
        <>
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
        </>
      )}
      {subscribed && (
        <Grid
          columns={[2, '60% auto']}
          sx={{
            maxWidth: '780px',
            alignItems: 'center',
            color: 'secondaryDark'
          }}
          pt='30px'
          pb='100px'
        >
          <div>
            <Text
              sx={{
                variant: 'headings.h4',
                color: 'secondaryDark'
              }}
            >
              Thank you for subscribing!
            </Text>
            <Text
              sx={{
                variant: 'headings.h6',
                fontWeight: 'fontWeights.body',
                color: 'secondaryDark'
              }}
            >
              You will receive updates straight to your inbox.
            </Text>
          </div>
          <SubscribedAnimation />
        </Grid>
      )}
    </Grid>
  )
}

export default MailchimpSignup
