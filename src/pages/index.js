/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/home/HeroSection'
import InfoSection from '../components/home/InfoSection'
import UpdatesSection from '../components/home/UpdatesSection'
import HomeTopProjects from '../components/home/HomeTopProjects'

const IndexPage = () => {
  return (
    <Layout isHomePage='true'>
      <SEO title='home' />
      <Hero />
      <HomeTopProjects />
      <InfoSection />
      <UpdatesSection />
    </Layout>
  )
}

export default IndexPage
