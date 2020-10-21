import React, { useState, useContext } from 'react'
import {
  Avatar,
  Heading,
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  Flex,
  Text
} from 'theme-ui'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'

import theme from '../../../gatsby-plugin-theme-ui'

import iconShare from '../../../images/icon-share.svg'
import iconHeart from '../../../images/icon-heart.svg'
import DarkClouds from '../../../images/svg/general/decorators/dark-clouds.svg'
import RaisedHands from '../../../images/decorator-raised-hands.png'

const CardContainer = styled(Card)`
  position: relative;
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
  width: 100%;
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

const CardContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  word-wrap: break-word;
  padding: 0.5rem 1.5rem 0 1.5rem;
`

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1rem 0 0.5rem 0;
  padding: 0rem 1rem;
`
const Top = styled(Flex)`
  padding: 0.5rem 0 1rem 0;
  justify-content: space-between;
`

const Creator = styled(Flex)`
  text-align: center;
  align-items: center;
  margin: 1rem 0;
`

const TimelineCard = props => {
  if (props.specialContent) {
    return (
      <Box style={{ width: '100%' }}>
        <SpecialCardContainer>
          <DarkClouds
            style={{ position: 'absolute', top: '41px', left: '42px' }}
          />
          <Box
            sx={{
              width: '60%',
              pb: 2,
              pt: 4,
              zIndex: 2,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              {props?.specialContent?.title}
            </Text>
          </Box>

          <Text sx={{ variant: 'text.default', pb: 4, color: 'bodyLight' }}>
            Feb 26, 2020
          </Text>
          <img
            src={RaisedHands}
            style={{ position: 'absolute', bottom: 0, right: '24px' }}
          />
        </SpecialCardContainer>
      </Box>
    )
  }
  return (
    <Box style={{ width: '100%' }}>
      <CardContainer>
        <Heading
          sx={{ variant: 'headings.h4' }}
          style={{
            padding: '1rem 1rem 0 1.5rem',
            width: '260',
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.colors.secondary
          }}
          key={props.listingId + '_heading'}
        >
          <Top>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
              Update #
            </Text>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
              May 15, 2020
            </Text>
          </Top>
          Name
        </Heading>
        <CardContent>
          <Creator>
            <Avatar src='https://www.filepicker.io/api/file/4AYOKBTnS8yxt5OUPS5M' />
            <Text sx={{ variant: 'text.paragraph', color: 'secondary', mx: 2 }}>
              Description
            </Text>
            <Badge variant='altOutline'>Creator</Badge>
          </Creator>
          <Text sx={{ variant: 'text.default' }}>Some content in here</Text>
        </CardContent>
        <CardFooter>
          <IconButton>
            <img src={iconHeart} alt='' />
          </IconButton>
          <IconButton>
            <img src={iconShare} alt='' />
          </IconButton>
        </CardFooter>
      </CardContainer>
      {
        // <Donate
        //   maxAmount={balance}
        //   doDonate={values => alert('donating' + values.amount)}
        // />
      }
    </Box>
  )
}

export default TimelineCard
