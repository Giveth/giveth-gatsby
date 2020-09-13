import React from 'react'
import { Text, Flex, Image, Box } from 'theme-ui'
import ProjectListing from '../projectListing'

const HighFive = ({ projectImage }) => {
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
        <Box sx={{ mt: '100px', width: '60%' }}>
          <ProjectListing
            disabled
            name='testproject'
            description='testproject'
            image={projectImage}
            raised={0}
            category='Blockchain 4 Good'
            listingId='key1'
            key='key1'
          />
        </Box>

        <Box sx={{ mt: '100px', ml: '30px' }}>
          <Text
            sx={{
              fontSize: 2,
              fontFamily: 'body',
              color: 'secondary',
              mt: '16px'
            }}
          >
            Tell everyone about it.
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default HighFive
