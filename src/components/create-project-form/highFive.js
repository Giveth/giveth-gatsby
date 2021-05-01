import React from 'react'
import Link from 'next/link'
import { Text, Flex, Box } from 'theme-ui'
import ProjectListing from '../projectListing'
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

const HighFive = ({
  project,
  addedProject,
  projectId,
  projectImage,
  projectTitle,
  projectDescription,
  newProject
}) => {
  const shareTitle = `Make a donation today to ${project?.title}!`
  const url = `${window.location.origin}/project/${addedProject?.slug}`

  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        mt: '100px',
        mx: ['2px', 0, 0]
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

      <Flex
        sx={{
          width: ['100%', '80%', '80%'],
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: ['column', 'row', 'row']
        }}
      >
        <Box
          sx={{ minWidth: '20vw', mt: '100px', width: ['80%', '40%', '30%'] }}
        >
          <ProjectListing
            disabled
            shadowed
            name={projectTitle}
            description={projectDescription}
            image={projectImage || addedProject?.image}
            raised={0}
            categories={project?.categories}
            listingId='key1'
            key='key1'
          />
        </Box>

        <Box
          sx={{
            mt: [0, '20%', '20%'],
            mb: ['20%', 0, 0],
            ml: [0, '10%', '10%'],
            width: ['60%', '20%', '20%']
          }}
        >
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
            <TwitterShareButton
              title={shareTitle}
              url={url}
              hashtags={['giveth']}
            >
              <FaTwitter size='24px' />
            </TwitterShareButton>
            <FacebookShareButton quote={shareTitle} url={url} hashtag='#giveth'>
              <FaFacebook size='24px' />
            </FacebookShareButton>
            <LinkedinShareButton
              title={shareTitle}
              summary={project?.description}
              url={url}
            >
              <FaLinkedin size='24px' />
            </LinkedinShareButton>
          </Flex>
          {/* not working yet <Link to={`/create`} onClick={newProject}>
            <Text
              sx={{
                fontSize: 3,
                fontFamily: 'body',
                color: 'secondary',
                mt: '16px'
              }}
            >
              Add another project
            </Text>
          </Link> */}
          <Link to={`/project/${addedProject?.slug}`}>
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
          <Link href='/'>
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
