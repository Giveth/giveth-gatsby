import React from 'react'
import { Link } from 'gatsby'
import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import ProjectListing from '../components/projectListing'
import { useQuery } from '@apollo/react-hooks'
import imgPeopleHeader from '../images/people-header.png'

import { FETCH_PROJECTS } from '../apollo/gql/projects'

// placeholder image
import NoImage from '../images/no-image-available.jpg'

const IndexPage = () => {
  const { data } = useQuery(FETCH_PROJECTS)

  return (
    <Layout>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: '1440px',
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <Grid gap={2} p={5} columns={[2, '1fr 1fr']}>
          <Box>
            {' '}
            <Heading sx={{ variant: ['headings.h3'] }}>
              Sustainable fundraising for
            </Heading>
            <Heading sx={{ variant: ['headings.h3', 'fontWeights.bold'] }}>
              <b>social impact</b>
            </Heading>
            <Text sx={{ variant: ['text.default'] }}>
              Our mission is to connect people, ideas, and resources to
              facilitate and incentivize social resources with a transparent
              framework for distributing funds.
            </Text>
            <Link to='/create'>
              <Button mt={4} p={4} sx={{ variant: 'buttons.default' }}>
                Start raising funds
              </Button>
            </Link>
          </Box>
          <Box>
            <img src={imgPeopleHeader} alt={''} />
          </Box>
        </Grid>
      </div>
      <Box pt={4} sx={{ variant: 'grayBox' }}>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: '1440px',
            padding: `0 1.0875rem 1.45rem`
          }}
        >
          <Grid p={4} columns={[1, 2, 3]} style={{ justifyItems: 'center' }}>
            <ProjectListing
              name='Giveth DAC'
              image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
              raised={1223}
              category='Blockchain 4 Good'
              listingId={'key1'}
              key={'key1'}
            />
            <ProjectListing
              name='Aragon DAC'
              image='https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png'
              raised={423}
              category='Blockchain 4 Good'
              listingId={'key2'}
              key={'key2'}
            />
            <ProjectListing
              name='Fairdata Society'
              image='https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk'
              raised={0}
              category='Social Technology'
              listingId={'key3'}
              key={'key3'}
            />
            <ProjectListing
              name='Unicorn DAC'
              image='https://feathers.beta.giveth.io/uploads/5906e1be14c47c0a18b44a29fe8873ddfb6440a8a212cf42bacb84b7e2e1c0c1.png'
              raised={10004}
              category='All the things'
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
                  donateAddress={project.donateAddress}
                  image={NoImage}
                />
              ))}
          </Grid>
        </div>
      </Box>
    </Layout>
  )
}

export default IndexPage
