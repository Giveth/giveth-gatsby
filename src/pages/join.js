/** @jsx jsx */
import { jsx, Flex, Grid } from 'theme-ui'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../components/content/JoinPageHero'
import HomeTopProjects from '../components/HomeTopProjects'
import JoinChatCard from '../components/content/JoinPageCard'

const JoinPage = ({ data }) => {
  return (
    <Layout>
      <SEO title='join' />
      <Hero />
      <Flex sx={{ justifyContent: 'center', backgroundColor: 'lightestBlue' }}>
        <Grid p={6} columns={2} sx={{ maxWidth: '80vw' }}>
          <JoinChatCard data={data.contentChats.edges} />
        </Grid>
      </Flex>
    </Layout>
  )
}

export default JoinPage

export const query = graphql`
  query JoinChatQuery {
    contentChats: allContentfulContentJoinChatprovider {
      edges {
        node {
          id
          platformTitle
          descriptionText
          onboardingLink
          platformLogo {
            id
            file {
              url
              fileName
              contentType
            }
          }
          cardBackgroundImage {
            id
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`
