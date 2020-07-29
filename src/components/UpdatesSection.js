/** @jsx jsx */
import { Grid, Box, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediumFeed } from './MediumFeed'
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
        <Box>
          {mediumPosts.allMediumPost.edges.map(({ node }) => {
            const { id, title } = node
            return (
              <Grid key={id}>
                <Text>{title}</Text>
              </Grid>
            )
          })}
        </Box>
      </Box>
    </Main>
  )
}

export default UpdatesSection
