import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import web3Obj from '../components/helper'
import { Grid, Box } from 'theme-ui'

//xdai
//rinkeby
// web3Obj.initialize('production', 'istanbul')
const ethConfig = {
  buildEnv: 'production',
  host: 'rinkeby'
}
const xdaiConfig = {
  buildEnv: 'production',
  host: 'https://xdai.poanetwork.dev',
  chainId: 100,
  networkName: 'xDai' // optional
}

web3Obj.initialize(xdaiConfig)

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
      <h1>Giveth Tor.us</h1>
      <Grid width={[128, null, 192]}>
        <Box bg='primary'>
          Giveth DAC
          <br />
          <br />
          <button
            onClick={() => {
              web3Obj.torus.showWallet('transfer')
            }}
          >
            donate
          </button>
        </Box>
        <Box bg='muted'>
          Aragon DAC
          <br />
          <br />
          <button
            onClick={() => {
              web3Obj.torus.showWallet('transfer')
            }}
          >
            donate
          </button>
        </Box>
        <Box bg='primary'>
          Open source blockchain explorer
          <br />
          <br />
          <button
            onClick={() => {
              web3Obj.torus.showWallet('transfer')
            }}
          >
            donate
          </button>
        </Box>
        <Box bg='muted'>
          Unicorn DAC
          <br />
          <br />
          <button
            onClick={() => {
              web3Obj.torus.showWallet('transfer')
            }}
          >
            donate
          </button>
        </Box>
      </Grid>
    </div>
  </Layout>
)

export default IndexPage
