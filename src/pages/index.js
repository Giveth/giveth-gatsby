/** @jsx jsx */
import { jsx } from 'theme-ui'

import React from 'react'
import { Link } from 'gatsby'
import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import Layout from '../components/layout'
import ProjectListing from '../components/projectListing'
import { useQuery } from '@apollo/react-hooks'

// import decorative graphics
import imgPeopleHeader from '../images/people-header.png'
import decoratorLeaf from '../images/decorator-leaf.png'

import { FETCH_PROJECTS } from '../apollo/gql/projects'

// placeholder image
import NoImage from '../images/no-image-available.jpg'

const HeroSection = styled(Grid)`
  grid-template-columns: 1fr auto;
  @media (max-width: '850px') {
    grid-template-columns: 1fr;
  }
`

const HeroImage = styled.div`
  width: 50vw;
  height: 80vh;
  background: url(${imgPeopleHeader});
  background-position: left top;
  background-repeat: no-repeat;
`

const HeroText = styled(Box)`
  position: absolute;
  padding-left: 80px;
`

const ProjectSection = styled(Box)``

const IndexPage = () => {
  const { data } = useQuery(FETCH_PROJECTS)
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' })

  return (
    <Layout>
      <img
        src={decoratorLeaf}
        alt=""
        sx={{ position: 'absolute', top: '60vh', left: '-70px' }}
      />
      <HeroSection>
        <div id="placeholder"></div>
        <HeroText>
          {' '}
          <Heading
            sx={{
              variant: 'headings.h1',
              fontWeight: 'regular',
              color: 'secondaryDark'
            }}
          >
            Sustainable fundraising for
          </Heading>
          <Heading
            sx={{
              variant: 'headings.h1',
              fontWeight: 'bold',
              color: 'secondaryDark'
            }}
          >
            social impact
          </Heading>
          <Text
            pt={4}
            pb={2}
            sx={{
              variant: 'text.large',
              width: ['100%', null, '45%'],
              color: 'secondary',
              lineHeight: 'taller'
            }}
          >
            Our mission is to connect people, ideas, and resources to facilitate
            and incentivize social impact with a transparent framework for
            distributing funds.
          </Text>
          <Grid
            rows={2}
            sx={{
              width: '290px'
            }}
          >
            <Link to="/donate">
              <Button
                mt={4}
                p={4}
                sx={{
                  width: '290px',
                  variant: 'buttons.default'
                }}
              >
                Donate
              </Button>
            </Link>
            <Link
              to="/create"
              sx={{
                variant: 'links.nav',
                justifySelf: 'center'
              }}
            >
              <Text
                sx={{
                  justifySelf: 'center'
                }}
              >
                Start raising funds for your project
              </Text>
            </Link>
          </Grid>
        </HeroText>
        {isMobile ? null : (
          <Box>
            <HeroImage alt={''} />
          </Box>
        )}
      </HeroSection>

      <ProjectSection pt={4} sx={{ variant: 'grayBox' }}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: '1440px',
            padding: `0 1.0875rem 1.45rem`
          }}
        >
          <Grid p={4} columns={[1, 2, 3]} style={{ justifyItems: 'center' }}>
            <ProjectListing
              name="Giveth DAC"
              image="https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png"
              raised={1223}
              category="Blockchain 4 Good"
              listingId={'key1'}
              key={'key1'}
            />
            <ProjectListing
              name="Aragon DAC"
              image="https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png"
              raised={423}
              category="Blockchain 4 Good"
              listingId={'key2'}
              key={'key2'}
            />
            <ProjectListing
              name="Fairdata Society"
              image="https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk"
              raised={0}
              category="Social Technology"
              listingId={'key3'}
              key={'key3'}
            />
            <ProjectListing
              name="Unicorn DAC"
              image="https://feathers.beta.giveth.io/uploads/5906e1be14c47c0a18b44a29fe8873ddfb6440a8a212cf42bacb84b7e2e1c0c1.png"
              raised={10004}
              category="All the things"
              listingId={'key4'}
              key={'key4'}
            />
            {data &&
              data.projects &&
              data.projects &&
              data.projects.map((project, index) => (
                <ProjectListing
                  listingId={project.title + '-' + index}
                  key={project.title + '-' + index}
                  name={project.title}
                  image={NoImage}
                />
              ))}
          </Grid>
        </div>
      </ProjectSection>
    </Layout>
  )
}

export default IndexPage
