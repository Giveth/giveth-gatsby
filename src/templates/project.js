import React, { useState } from 'react'
import Layout from '../components/layout'
import { Flex, Image, Text, Box, Button } from 'theme-ui'
import testImg from '../images/giveth-test-image.png'
import { GrCircleInformation } from 'react-icons/gr'
import { IconContext } from 'react-icons'
import { Link } from 'gatsby'

const ProjectPageTemplate = ({ pageContext }) => {
  const [currentTab, setCurrentTab] = useState('description')
  return (
    <Layout>
      <Flex>
        <Image
          src={testImg}
          sx={{
            objectFit: 'cover',
            objectPosition: 'top',
            width: '85%',
            margin: 'auto',
            height: '250px',
            borderRadius: '10px'
          }}
        />
      </Flex>
      <Flex sx={{ width: '80%', margin: 'auto' }}>
        <Box sx={{ width: '70%' }}>
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
                {pageContext.project.title}
              </Text>
              <Text
                sx={{
                  fontSize: 6,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'primary',
                  mt: '10px'
                }}
              >
                Project organisition
              </Text>
            </Box>
          </Flex>
          <Flex
            sx={{
              my: '20px',
              alignItems: 'center',
              backgroundColor: '#F0F6FC',
              borderColor: '#3F91E4',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <IconContext.Provider value={{ color: '#3F91E4' }}>
              <GrCircleInformation size='21px' />
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: '#3F91E4',
                  ml: '16px'
                }}
              >
                This is a notification banner to highlight some important
                information about the project.
              </Text>
            </IconContext.Provider>
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
                setCurrentTab('description')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'description' ? '#C2449F' : null,
                  borderBottomStyle:
                    currentTab === 'description' ? 'solid' : null
                }}
              >
                Description
              </Text>
            </Button>
            <Button
              variant='nofill'
              type='button'
              onClick={e => {
                e.preventDefault()
                setCurrentTab('updates')
              }}
            >
              <Text
                sx={{
                  color: '#303B72',
                  paddingBottom: '30px',
                  borderBottomColor:
                    currentTab === 'updates' ? '#C2449F' : null,
                  borderBottomStyle: currentTab === 'updates' ? 'solid' : null
                }}
              >
                Updates
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
                Donations
              </Text>
            </Button>
          </Flex>
          <Box sx={{ mt: '30px' }}>
            {currentTab === 'description' ? (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                {pageContext.project.description}
              </Text>
            ) : currentTab === 'updates' ? (
              <Text
                sx={{
                  fontSize: 3,
                  fontFamily: 'body',
                  fontWeight: 'body',
                  color: 'black'
                }}
              >
                Updates
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
                Donations
              </Text>
            )}
          </Box>
        </Box>
        <Flex
          sx={{
            width: '30%',
            flexDirection: 'column',
            alignContent: 'center'
          }}
        >
          <Button
            variant='default'
            sx={{ paddingTop: '20px', paddingBottom: '20px' }}
          >
            <Text>Donate</Text>
          </Button>
          <Flex
            sx={{
              justifyContent: 'space-around',
              fontFamily: 'heading',
              textTransform: 'uppercase',
              my: '20px'
            }}
          >
            <Text>Givers: 24</Text>
            <Text>Donations: 65</Text>
          </Flex>
          <Flex sx={{ justifyContent: 'space-evenly' }}>
            {['Non-Profit', 'SDG Impact'].map(category => {
              return (
                <Text
                  sx={{
                    color: 'primary',
                    borderColor: 'primary',
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    display: 'inline',
                    fontSize: 1,
                    fontFamily: 'body',
                    mt: '9px',
                    backgroundColor: 'white',
                    borderRadius: '18px',
                    paddingY: 1,
                    paddingX: 2,
                    textAlign: 'center'
                  }}
                >
                  {category}
                </Text>
              )
            })}
          </Flex>

          <Flex sx={{ justifyContent: 'center' }}>
            <Link to='/'>
              <Text
                sx={{
                  color: 'primary',
                  textDecoration: 'none',
                  mt: '10px'
                }}
              >
                View similar projects
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>

      {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
    </Layout>
  )
}

export default ProjectPageTemplate
