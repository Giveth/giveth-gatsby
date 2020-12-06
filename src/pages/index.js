/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/home/HeroSection'
import InfoSection from '../components/home/InfoSection'
import UpdatesSection from '../components/home/UpdatesSection'
import HomeTopProjects from '../components/home/HomeTopProjects'

const IndexPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const content = frontmatter

  return (
    <Layout isHomePage='true'>
      <SEO title='home' />
      <Hero content={content} />
      <HomeTopProjects />
      <InfoSection />
      <UpdatesSection />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($site: String!) {
    markdownRemark(frontmatter: { slug: { eq: $site } }) {
      html
      frontmatter {
        slug
        mainHead
        headBold
        mainText
        mainButton
        mainButtonText
      }
    }
  }
`
export default IndexPage
