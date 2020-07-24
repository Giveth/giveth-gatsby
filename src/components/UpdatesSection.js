/** @jsx jsx */
import React from 'react'
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Input, Heading, Text, jsx } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import styled from '@emotion/styled'
import { useMediumFeed } from './MediumFeed'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import MailchimpSignup from './MailchimpSignup'

const Main = styled(Grid)`
  position: relative;
`

const UpdatesSection = () => {
  const mediumPosts = useMediumFeed()

  return (
    <Main>
      <Box>
        <Heading>
          Always get the latest updates by subscribing to our newsletter.
        </Heading>
        <MailchimpSignup />
        <Box>{mediumPosts.allMediumPost.edges.map(({node}) => {
          const {id, title} = node
          return (
            <Grid>
              <Text key={id}>{title}</Text>
            </Grid>
            )})}
        </Box>
      </Box>
    </Main>
  )
}

export default UpdatesSection
