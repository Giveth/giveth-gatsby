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
    <Layout isHomePage='true'>
      <SEO title='Home' />
      <Hero />
      <HomeTopProjects />
      <InfoSection />
      <UpdatesSection />
    </Layout>
  )
}

export default IndexPage
