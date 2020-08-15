import React from 'react'
import { Text, Flex } from 'theme-ui'
import { animated } from 'react-spring'

const HighFive = () => {
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
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
    </Flex>
  )
}

export default HighFive
