/** @jsx jsx */
import { jsx, Flex, Image, Grid, Text, Box, Button } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'

import useMediaQuery from 'react-responsive'

import Layout from '../components/layout'

import { FaMediumM, FaGithub } from 'react-icons/fa'
import decoratorPuzzle from '../images/decorator-puzzlepieces.svg'

const Main = styled(Grid)`
  justify-content: start;
  padding-left: 140px;
`
const ContentItem = styled(Grid)`
  justify-items: center;
  padding: 1.5rem;
  width: 250px;
  height: 250px;
  border: 1px solid ${theme.colors.muted};
  border-radius: 12px;
`

const Decorator = styled.div`
  position: absolute;
`

const Partnerships = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })

  return (
    <Layout>
      {!isMobile ? (
        <Decorator>
          <img
            src={decoratorPuzzle}
            alt=''
            sx={{
              position: 'absolute',
              right: '-90vw'
            }}
          />
        </Decorator>
      ) : null}
      <Main sx={{ width: '70%' }}>
        <Text sx={{ variant: 'headings.h2' }}>Partnerships</Text>
        <Text
          sx={{
            variant: 'text.large'
          }}
        >
          We have many partnerships in the Ethereum Community. Many use our
          smart contracts, some have been audited by us, others are Givers, all
          of them are our friends.
        </Text>
        <Text
          sx={{
            variant: 'text.default'
          }}
        >
          God blessed them and said to them, “Be fruitful and increase in
          number; fill the earth and subdue it. Rule over the fish in the sea
          and the birds in the sky and over every living creature that moves on
          the ground.” Then God said, “I give you every seed-bearing plant on
          the face of the whole earth and every tree that has fruit with seed in
          it. They will be yours for food. And to all the beasts of the earth
          and all the birds in the sky and all the creatures that move along the
          ground—everything that has the breath of life in it—I give every green
          plant for food.” And it was so.
        </Text>
        <Text
          pt={5}
          sx={{
            variant: 'text.large'
          }}
        >
          Our partners and friends{' '}
        </Text>
        <Grid columns={3} gap={4} sx={{ maxWidth: '800px' }}>
          {data.contentFriends.edges.map(edges => (
            <Link
              to={edges.node.link}
              sx={{
                variant: 'headings.h6',
                textDecoration: 'none',
                textAlign: 'center',
                color: 'secondaryDark'
              }}
              key={edges.node.id}
            >
              <ContentItem>
                <img width='50px' src={edges.node.logo.file.url} />
                <Text>{edges.node.description}</Text>
              </ContentItem>
            </Link>
          ))}
        </Grid>
        <Text>Todo: "Partner with us Element"</Text>
      </Main>
    </Layout>
  )
}

export default Partnerships

export const query = graphql`
  query FriendsQuery {
    contentFriends: allContentfulFriendslogos {
      edges {
        node {
          id
          link
          description
          logo {
            file {
              url
            }
          }
        }
      }
    }
  }
`
