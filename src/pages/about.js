/** @jsx jsx */
import { jsx, Flex, Image, Grid, Text, Box, Button } from 'theme-ui'
import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { FaMediumM, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

import Layout from '../components/layout'
import ContentTeam from '../components/ContentTeam'
import teamImg from '../images/giveth-team-image.png'

const DonateButton = styled(Button)`
  position: relative;
  top: -40px;
  border: 10px solid white;
`

const AboutPage = ({ data }) => {
  const [currentTab, setCurrentTab] = useState('mission')
  return (
    <Layout>
      <Flex>
        <Image
          src={teamImg}
          sx={{
            objectFit: 'cover',
            objectPosition: 'top',
            width: '85%',
            margin: 'auto',
            height: '600px',
            borderRadius: '10px'
          }}
        />
      </Flex>
      <Flex
        sx={{ width: '80%', justifyContent: 'space-between', margin: 'auto' }}
      >
        <Grid sx={{ width: '50%' }}>
          <Flex>
            <Box sx={{ mt: '20px' }}>
              <Text
                sx={{
                  fontSize: 9,
                  fontFamily: 'heading',
                  fontWeight: 'bold',
                  color: 'secondary'
                }}
              >
                About us
              </Text>
              <Text
                sx={{
                  variant: 'text.large'
                }}
              >
                We are a community focused on making the world a better place
                through the use of blockchain technology!
              </Text>
            </Box>
          </Flex>

          <Flex
            sx={{
              width: '60%',
              justifyContent: 'space-between',
              height: '60px',
              mt: '20px'
            }}
          >
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('mission')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'mission' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'mission' ? 'solid' : null
                }}
              >
                Mission & Vision
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('history')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'history' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'history' ? 'solid' : null
                }}
              >
                History
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('donation')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'donation' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'donation' ? 'solid' : null
                }}
              >
                Team
              </Text>
            </Button>
          </Flex>
          <Grid sx={{ mt: '30px' }}>
            {currentTab === 'mission' ? (
              <>
                <Text
                  sx={{
                    variant: 'text.default'
                  }}
                >
                  Giveth is a community of Makers that is building the Giveth
                  Galaxy, our ever-extending collection of initiatives that is
                  driving Blockchain for Good innovation. Giveth strives to
                  model the DAC concept as one of the first non-profit
                  blockchain based entities.
                </Text>
                <Text
                  sx={{
                    variant: 'text.quote'
                  }}
                >
                  Giveth is a Decentralized Altruistic Community (DAC) focused
                  on using blockchain technology for good, to make the world a
                  better place.
                </Text>
                <Text
                  sx={{
                    variant: 'headings.h5'
                  }}
                >
                  Giveth promotes Altruism
                </Text>
                <Text
                  sx={{
                    variant: 'text.default'
                  }}
                >
                  Giveth is building a DApp, a completely free, open-source
                  platform for DACs, a disrupting force that can decentralize
                  and facilitate altruism. Giveth supports many other
                  decentralized Social Coding initiatives that are adding value
                  to the world but may not have a direct profit motive.
                </Text>
                <Text
                  sx={{
                    variant: 'headings.h5'
                  }}
                >
                  Giveth pushes Decentralization
                </Text>
                <Text
                  sx={{
                    variant: 'text.default'
                  }}
                >
                  Giveth is the primordial DAC of the DApp and models this
                  through internally and externally stimulating decentralized
                  Governance initiatives and experiments for future DACs. Giveth
                  experiments with decentralized Communication initiatives for
                  future DACs
                </Text>
                <Text
                  sx={{
                    variant: 'headings.h5'
                  }}
                >
                  Giveth believes in the power of Community
                </Text>
                <Text
                  sx={{
                    variant: 'text.default'
                  }}
                >
                  Giveth believes there can be no true change without Community.
                  That is why the Giveth DApp strives to enable trust within
                  communities by increasing transparency and accountability
                  through blockchain technology. Giving should be all about
                  connecting the Givers with the Makers, the people who are
                  making the change, and creating true and lasting connections
                  between both. Giveth is more than the sum of its parts: while
                  decentralized, our shared values create the energy and
                  inspiration needed to make the world a better place. We call
                  ourselves the Giveth Unicorns. We call the entirety of the 4
                  Giveth circles (Dapp Development, Social Coding, Governance,
                  Communication) the Giveth DAC.
                </Text>
              </>
            ) : currentTab === 'history' ? (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                <Text
                  pb={3}
                  sx={{
                    variant: 'text.body'
                  }}
                >
                  The Giveth Decentralized Altruistic Community (DAC) is an
                  eclectic mix of people from the Ethereum and nonprofit worlds.
                  They are dedicated to building the tools that will make it
                  easy for anyone to build a global community around a cause. In
                  fact, this core team is using the Giveth Platform to build a
                  community around the Giveth idea itself! If you want to help
                  create the solution, join our community.
                </Text>
                <Text
                  pb={3}
                  sx={{
                    variant: 'text.body'
                  }}
                >
                  We are Altruistic, we are entirely open-source and love to
                  reach out proactively to similar initiatives, which we see as
                  potential collaborators as opposed to competitors. The Giveth
                  DAC works with volunteers, and genius developers who are
                  working for a fraction of what they could be earning at
                  for-profit Ethereum projects. To help us in building Giveth,
                  please visit the contributors guide.
                </Text>
                <Text
                  pb={3}
                  sx={{
                    variant: 'text.body'
                  }}
                >
                  We are a Community. The individual members of the Giveth DAC
                  call themselves Unicorns and are a rag tag group of white hat
                  hackers and social pioneers trying to make the world a better
                  place. Our common goal is to develop the Giveth platform, the
                  team’s drive is defined as supporting transparency,
                  open-source development, co-creation and collaboration. See
                  Team Organization for more information.
                </Text>{' '}
                <Text
                  sx={{
                    variant: 'text.body'
                  }}
                >
                  We are moving towards a fully Decentralized governance system.
                  We have been using our different iterations of our DApp to
                  compensate the team members’ efforts in a way that shows
                  milestone achievements towards the common vision. We believe
                  in the self-organizing power of holacracy, which we apply in
                  the organization of tasks, our Slack channels and during our
                  governance meetings. Visit Governance model for more
                  information.
                </Text>
              </Text>
            ) : (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                <ContentTeam headerdata={data.contentTeam.edges} />
              </Text>
            )}
          </Grid>
        </Grid>
        <Flex
          sx={{
            width: '30%',
            flexDirection: 'column',
            alignContent: 'center'
          }}
        >
          <DonateButton
            variant='default'
            sx={{
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >
            <Text>Support Giveth</Text>
          </DonateButton>
          <Flex
            sx={{
              justifyContent: 'space-around',
              fontFamily: 'heading',
              textTransform: 'uppercase',
              my: '-20px',
              mb: '10px'
            }}
          >
            <Text>Givers: 24</Text>
            <Text>Donations: 65</Text>
          </Flex>
          <Flex pt={3} sx={{ justifyContent: 'center' }}>
            <Text
              sx={{
                variant: 'text.medium',
                color: 'secondary',
                textDecoration: 'none',
                mt: '10px'
              }}
            >
              Find us elsewhere
            </Text>
          </Flex>
          <Grid
            pt={2}
            sx={{
              gridTemplateColumns: 'repeat(4, auto)',
              fontSize: '40px',
              justifyContent: 'center',
              fontFamily: 'heading',
              '*': {
                outline: ' none'
              }
            }}
          >
            <FaTwitter size={'30px'} />
            <FaLinkedin size={'30px'} />
            <FaMediumM size={'30px'} />
            <FaGithub size={'30px'} />
          </Grid>
        </Flex>
      </Flex>

      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query TeamQuery {
    contentTeam: allContentfulContentTeam {
      edges {
        node {
          portrait {
            id
            file {
              url
              fileName
              contentType
            }
          }
          headline1
          headline2
          socialMedium
          socialTwitter
        }
      }
    }
  }
`
