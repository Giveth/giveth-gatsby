import React from 'react'
import { Link } from 'gatsby'
import { Text, Flex, Image, Box } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_PROJECT } from '../../apollo/gql/projects'
import ProjectListing from '../projectListing'
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'

const HighFive = ({
  projectId,
  projectImage,
  projectTitle,
  projectDescription
}) => {
  // const { loading, error, data } = useQuery(FETCH_PROJECT, {
  //   variables: { id: projectId }
  // })

  // console.log({ loading, error, data })
  // if (loading) return <h3>loading</h3>

  // const { project } = data
  // console.log({ project })
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        mt: '150px'
      }}
    >
      <Text
        sx={{
          fontSize: 11,
          fontFamily: 'body',
          color: 'secondaryDark',
          fontWeight: 'bold'
        }}
      >
        High five!
      </Text>
      <Text
        sx={{
          fontSize: 6,
          fontFamily: 'body',
          color: 'secondary',
          mt: '16px'
        }}
      >
        Your project is published and ready to raise funds.
      </Text>

      <Flex>
        <Box sx={{ mt: '100px', width: '50%' }}>
          <ProjectListing
            disabled
            shadowed
            name={projectTitle}
            description={projectDescription}
            image={projectImage}
            raised={0}
            category='Blockchain 4 Good'
            listingId='key1'
            key='key1'
          />
        </Box>

        <Box sx={{ mt: '40%', ml: '10%', width: '40%' }}>
          <Text
            sx={{
              fontSize: 3,
              fontFamily: 'body',
              color: 'secondary',
              my: '30px'
            }}
          >
            Tell everyone about it.
          </Text>
          <Flex sx={{ my: '30px', justifyContent: 'space-evenly' }}>
            <FaTwitter size='24px' />
            <FaFacebook size='24px' />
            <FaLinkedin size='24px' />
          </Flex>
          <Link to={`/projects/${project[0]?.slug}`}>
            <Text
              sx={{
                fontSize: 3,
                fontFamily: 'body',
                color: 'secondary',
                mt: '16px'
              }}
            >
              View my project
            </Text>
          </Link>
          <Link to='/'>
            <Text
              sx={{
                fontSize: 3,
                fontFamily: 'body',
                color: 'secondary',
                mt: '16px'
              }}
            >
              {' '}
              Go to Homepage
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}

export default HighFive
