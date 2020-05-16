import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import web3Obj from '../components/helper'

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
    <SEO title='Home' />
    <h1>Giveth Tor.us</h1>
    <Link to='/iframe/'>Torus iframe</Link>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
     */}
  </Layout>
)

export default IndexPage
