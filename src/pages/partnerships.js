/** @jsx jsx */
import { jsx, Flex, Grid, Text, Box, Button } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import React from 'react'
import Seo from '../components/seo'
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import styled from '@emotion/styled'

import useMediaQuery from 'react-responsive'

import Layout from '../components/layout'

import { FaMediumM, FaGithub } from 'react-icons/fa'
import decoratorPuzzle from '../images/decorator-puzzlepieces.svg'
import DarkClouds from '../images/svg/general/decorators/dark-clouds.svg'
import RaisedHands from '../images/decorator-raised-one-hand.png'

const Main = styled(Grid)`
  justify-content: start;
  padding: 10vw;
  @media (max-width: 500px) {
    margin: 1rem;
    padding: 0vw;
  }
`
const ContentItem = styled(Grid)`
  grid-template-rows: auto auto 1fr;
  grid-gap: 1rem;
  justify-items: center;
  padding: 1.5rem;
  width: 250px;
  height: 250px;
  border: 1px solid ${theme.colors.muted};
  border-radius: 12px;
`

const Decorator = styled.div`
  position: absolute;
  @media (max-width: 500px) {
    display: none;
  }
`
const RaisedHandsImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

const SpecialCardContainer = styled(Flex)`
  width: 100%;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
`

const Partnerships = ({ data }) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { title, description, file } = node.data.target.fields
        const mimeType = file['en-US'].contentType
        const mimeGroup = mimeType.split('/')[0]

        switch (mimeGroup) {
          case 'image':
            return (
              <img
                title={title ? title['en-US'] : null}
                alt={description ? description['en-US'] : null}
                src={file['en-US'].url}
              />
            )
          case 'application':
            return (
              <a
                alt={description ? description['en-US'] : null}
                href={file['en-US'].url}
              >
                {title ? title['en-US'] : file['en-US'].details.fileName}
              </a>
            )
          default:
            return (
              <span style={{ backgroundColor: 'black', color: 'white' }}>
                {' '}
                {mimeType} embedded asset{' '}
              </span>
            )
        }
      }
    }
  }

  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })

  return (
    <Layout>
      <Seo title='Our partnerships' />
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
      <Main sx={{ width: ['90%', '90%', '70%'] }}>
        <Text sx={{ variant: 'headings.h2' }}>
          {data.contentPartnerships.nodes[0].title}
        </Text>
        <Text
          sx={{
            variant: 'text.large'
          }}
        >
          {data.contentPartnerships.nodes[0].subtitle}
        </Text>
        <Text
          sx={{
            variant: 'text.default'
          }}
        >
          {documentToReactComponents(
            data.contentPartnerships.nodes[0].moreInfo.json
          )}
        </Text>
        <Text
          pt={5}
          sx={{
            variant: 'text.large'
          }}
        >
          Our partners and friends{' '}
        </Text>
        <Grid
          columns={[1, 2, 3]}
          gap={4}
          sx={{ justifySelf: ['center', 'auto', 'auto'], maxWidth: '800px' }}
        >
          {data.contentFriends.edges.map(edges => (
            <ContentItem key={edges.node.id}>
              <a
                to={edges.node.link}
                sx={{
                  textDecoration: 'none',
                  textAlign: 'center',
                  color: 'secondaryDark'
                }}
              >
                <img
                  width='auto'
                  height='50px'
                  src={edges.node.logo.file.url}
                />

                <Text pt={2} sx={{ variant: 'headings.h6' }}>
                  {edges.node.name}
                </Text>
                <Text pt={3} sx={{ variant: 'text.default' }}>
                  {edges.node.description}
                </Text>
              </a>
            </ContentItem>
          ))}
        </Grid>

        <SpecialCardContainer sx={{ maxWidth: '800px' }}>
          <DarkClouds
            style={{ position: 'absolute', top: '41px', right: '42px' }}
          />
          <Box
            sx={{
              width: '60%',
              pb: 2,
              pt: 4,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              Partner with us
            </Text>
          </Box>

          <Text
            sx={{
              variant: 'text.default',
              pb: 4,
              color: 'bodyLight'
            }}
          >
            We're always open for new partnerships
          </Text>
          <Link to='/contact'>
            <Button
              mt={1}
              p={3}
              sx={{
                width: '200px',
                variant: 'buttons.default'
              }}
            >
              Contact Us
            </Button>
          </Link>
          <RaisedHandsImg src={RaisedHands} />
        </SpecialCardContainer>
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
          name
          description
          link
          logo {
            file {
              url
            }
          }
        }
      }
    }
    contentPartnerships: allContentfulContentPartnerships {
      nodes {
        title
        subtitle
        moreInfo {
          json
        }
      }
    }
  }
`
