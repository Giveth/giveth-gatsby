/** @jsx jsx */
import { jsx, Text, Box } from 'theme-ui'
import { graphql } from 'gatsby'
import React from 'react'
import Seo from '../components/seo'
import styled from '@emotion/styled'
// import useMediaQuery from 'react-responsive'

import Layout from '../components/layout'
import ContentFaq from '../components/content/ContentFaq'

const Main = styled(Box)``

const Faq = ({ data }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Layout>
      <Seo title='FAQ' />
      <Main>
        <Text sx={{ variant: 'headings.h2', textAlign: 'center' }}>FAQ</Text>
        <ContentFaq data={data.faqA.edges} isopen />
      </Main>
    </Layout>
  )
}

export default Faq

export const query = graphql`
  query Faq {
    faqA: allContentfulFaqEntry(
      sort: { fields: [createdAt], order: ASC }
      filter: { category: { category: { eq: "General" } } }
    ) {
      edges {
        node {
          id
          linkId
          createdAt
          question
          answer {
            json
          }
          category {
            id
            category
          }
        }
      }
    }
  }
`
