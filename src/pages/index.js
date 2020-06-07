import React from 'react'
import { Link } from 'gatsby'
import { Grid, Box } from 'theme-ui'
import { Heading } from 'theme-ui'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import ProjectListing from '../components/projectListing'

const IndexPage = () => (
  <Layout>
    <div
      sx={{
        // applies width 100% to all viewport widths,
        // width 50% above the first breakpoint,
        // and 25% above the next breakpoint
        width: ['100%', '50%', '25%']
      }}
    >
      <SEO title='Home' />
      <Heading as='h1'>Giveth</Heading>
      <Heading as='h3'>The future of giving</Heading>
      <br />
      <br />
      <Grid width={[128, null, 192]}>
        <ProjectListing
          name='Giveth DAC'
          image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
        />
        <ProjectListing
          name='Aragon DAC'
          image='https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png'
        />
        <ProjectListing
          name='OSBE DAC'
          image='https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk'
        />
        <ProjectListing
          name='Unicorn DAC'
          image='https://feathers.beta.giveth.io/uploads/5906e1be14c47c0a18b44a29fe8873ddfb6440a8a212cf42bacb84b7e2e1c0c1.png'
        />
      </Grid>
    </div>
  </Layout>
)

export default IndexPage
