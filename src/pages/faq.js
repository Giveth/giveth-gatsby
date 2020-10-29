/** @jsx jsx */
import { jsx, Flex, Image, Grid, Text, Box, Button } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { FaMediumM, FaGithub } from 'react-icons/fa'
import useMediaQuery from 'react-responsive'

import Layout from '../components/layout'
import ContentFaq from '../components/ContentFaq'

const Main = styled(Box)``

const Faq = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Layout>
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
