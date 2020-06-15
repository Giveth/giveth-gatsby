import React from 'react'
import { Heading, Box, Card, Text, ThemeProvider } from 'theme-ui'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'
import Donate from '../components/donateForm'

const ProjectCard = styled(Card)`
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  padding: 1rem;
  border-radius: 6px;
  width: 220px;
`

const ProjectListing = props => (
  <ThemeProvider theme={theme}>
    <ProjectCard style={{}}>
      <img
        src={props.image}
        style={{ width: '190px', height: '100px', margin: '0 auto' }}
        alt={props.name}
      />
      <Heading
        sx={{ variant: 'headings.h6' }}
        style={{
          width: '220px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {props.name}
      </Heading>
      <br />
      <Text sx={{ variant: 'text.default' }}>
        Textdescriptions should be included in the data model as a blurb.
      </Text>
      <Donate doDonate={values => alert('donating' + values.amount)} />
    </ProjectCard>
  </ThemeProvider>
)

export default ProjectListing
