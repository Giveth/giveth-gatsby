/** @jsx jsx */
import { jsx, Label, Input, Grid, Text, Button, Textarea } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import React from 'react'
import Seo from '../components/seo'
import styled from '@emotion/styled'
import useMediaQuery from 'react-responsive'

// import decorative graphics
import decoratorCircles from '../images/decorator-circles.svg'
import decoratorSquare from '../images/decorator-fizzy-square-rotated.svg'

import Layout from '../components/layout'

const Main = styled(Grid)`
  justify-content: start;
  padding-left: 10vw;
  @media (max-width: 500px) {
    margin: 1rem;
    padding: 0vw;
  }
`

const FormStyled = styled(Grid)`
  max-width: 50vw;
  grid-template-rows: repeat(5, auto);

  @media (max-width: 500px) {
    max-width: 100%;
  }

  & label {
    text-transform: uppercase;
    color: ${theme.colors.secondary};
    display: grid;
    grid-gap: 24px;
  }

  input {
    &::placeholder {
      color: ${theme.colors.bodyLight};
    }
  }

  & textarea {
    border: 2px solid ${theme.colors.bodyLight};
    border-radius: 16px;
    &::placeholder {
      color: ${theme.colors.bodyLight};
    }
  }
`

const MessageStyled = styled(Textarea)`
  font-family: ${theme.fonts.body};
  padding-left: 1rem;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

const Contact = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <React.Fragment>
      <Layout>
        <Seo title='Contact us' />
        {!isMobile ? (
          <img
            src={decoratorCircles}
            alt=''
            sx={{
              position: 'absolute',
              zIndex: '-1',
              top: '-32px',
              right: '80px'
            }}
          />
        ) : null}
        {!isMobile ? (
          <img
            src={decoratorSquare}
            alt=''
            sx={{
              position: 'absolute',
              zIndex: '-1',
              bottom: '3vh',
              right: '20vw',
              width: '10vw'
            }}
          />
        ) : null}
        <Main>
          <Text sx={{ variant: 'headings.h2', color: 'secondary', mt: 4 }}>
            Contact us
          </Text>
          <Text pb={5} sx={{ variant: 'text.large' }}>
            Have a question, or just want to say hi? Please fill out the form
            below to contact us.
          </Text>
          <FormStyled
            as='form'
            netlify-honeypot='bot-field'
            data-netlify='true'
            name='contact'
            gap={4}
            sx={{ variant: 'text.default', width: ['100%', '100%', '40vw'] }}
          >
            <input type='hidden' name='bot-field' />
            <input type='hidden' name='form-name' value='contact' />
            <Label
              sx={{
                variant: 'text.large'
              }}
            >
              Your full name
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Full Name'
              />
            </Label>
            <Label
              sx={{
                variant: 'text.large'
              }}
            >
              Your Email address
              <Input
                type='email'
                name='email'
                id='email'
                placeholder='Email Address'
              />
            </Label>
            <Label
              sx={{
                variant: 'text.large'
              }}
            >
              Message
              <MessageStyled
                name='message'
                id='message'
                placeholder='Message'
                rows='10'
              />
            </Label>
            <Button
              type='submit'
              sx={{
                maxWidth: '230px',
                height: '52px',
                variant: ['buttons.default'],
                fontWeight: 'bold',
                fontSize: 2,
                lineHeight: 'button',
                letterSpacing: 'normal'
              }}
            >
              Submit
            </Button>
          </FormStyled>
        </Main>
      </Layout>
    </React.Fragment>
  )
}

export default Contact
