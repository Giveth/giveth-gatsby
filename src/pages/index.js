/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import UpdatesSection from '../components/UpdatesSection'
import HomeTopProjects from '../components/HomeTopProjects'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Home'>
        <Hero />
        <HomeTopProjects />
        <InfoSection />
        <UpdatesSection />
      </SEO>
    </Layout>
  )
}

export default IndexPage
