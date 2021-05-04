import React from 'react'
import Image from 'next/image'
import { Grid, Box, Heading, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
// import { useMediumFeed } from './MediumFeed'
import MailchimpSignup from './MailchimpSignup'

// apply style to elements
const Main = styled(Grid)`
  position: relative;
`
const Container = styled(Box)`
  margin: 0 auto;
  max-width: 1440px;
`

const UpdatesSection = ({ mediumPosts }) => {
  // import Object containing the last two Medium Posts with a hook
  // const mediumPosts = useMediumFeed()

  // use Media Query to check device width
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  // return null
  return (
    <React.Fragment>
      {isMobile ? null : (
        <div
          className='semitransparent'
          style={{
            float: 'right',
            translate: '-30px 150px'
          }}
        >
          <Image
            src='/images/decorator-elements.svg'
            width='100%'
            height='100%'
          />
        </div>
      )}
      <Container p={[2, 3, 5]} sx={{ position: 'relative' }}>
        <Main>
          <Heading sx={{ variant: 'headings.h3' }}>
            Get the latest updates
          </Heading>
          <Text
            sx={{ variant: 'text.larger', maxWidth: '780px', color: 'colors' }}
          >
            Subscribe to our newsletter and get all updates straight to your
            mailbox!
          </Text>
          <MailchimpSignup />
          <Text sx={{ variant: 'text.overline' }}>From our Blog</Text>
          <Grid columns={[[1, 2, 2], 'auto auto']} sx={{ maxWidth: '80vw' }}>
            {/**
             * Map medium content nodes from node Object and destructure to variables
             * */}
            {mediumPosts?.map(node => {
              // const {
              //   id,
              //   title,
              //   previewContent,
              //   author,
              //   createdAt,
              //   virtuals,
              //   uniqueSlug
              // } = node
              // const published = new Date(createdAt.toString())

              // const minutesToRead = Math.round(virtuals.readingTime)
              const minutesToRead = ''

              // const meta = `${minutesToRead} min read`
              const meta = ``

              return (
                <Grid
                  columns={(1, 'auto')}
                  rows={6}
                  key={node?.guid}
                  sx={{ maxWidth: '500px' }}
                  p={[2, 0, 0]}
                >
                  <Text
                    as='a'
                    href={node?.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      variant: 'headings.h5',
                      color: 'secondary',
                      textDecoration: 'none'
                    }}
                  >
                    {node?.title}
                  </Text>
                  <Text sx={{ variant: 'text.large', color: 'secondary' }}>
                    {/* {previewContent.subtitle} */}
                  </Text>
                  <Grid rows={2} gap={0}>
                    <Text sx={{ variant: 'text.medium', color: 'bodyDark' }}>
                      {node?.author}
                    </Text>

                    <Text sx={{ variant: 'text.medium', color: 'bodyDark' }}>
                      {/* {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }).format(node?.pubDate)} */}
                      {node?.pubDate}
                      {' - '}
                      {/* {meta} */}
                    </Text>
                  </Grid>
                  <Text
                    as='a'
                    href={node?.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{ variant: 'links.readmore' }}
                  >
                    Read more
                  </Text>
                </Grid>
              )
            })}
          </Grid>
        </Main>
      </Container>
    </React.Fragment>
  )
}

export default UpdatesSection
