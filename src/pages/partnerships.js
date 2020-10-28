/** @jsx jsx */
import { jsx, Flex, Image, Grid, Text, Box, Button } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { FaMediumM, FaGithub } from 'react-icons/fa'
import useMediaQuery from 'react-responsive'

import Layout from '../components/layout'

const Main = styled(Box)``

const Partnerships = ({ data }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Layout>
      <Main>
        <Text sx={{ variant: 'headings.h2', textAlign: 'center' }}>
          Partnerships
        </Text>
      </Main>
    </Layout>
  )
}

export default Partnerships
