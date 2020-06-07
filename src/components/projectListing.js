/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Heading, Box } from 'theme-ui'
import Donate from '../components/donateForm'

const ProjectListing = props => (
  <>
    <Box>
      <Heading as='h3'>{props.name}</Heading>
      <img src={props.image} style={{ height: '123px' }} />
      <br />
      <Donate doDonate={values => alert('donating' + values.amount)} />
    </Box>
  </>
)

export default ProjectListing
