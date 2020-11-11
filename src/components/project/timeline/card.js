import React, { useState, useContext } from 'react'
import {
  Avatar,
  Heading,
  Badge,
  Box,
  Button,
  Card,
  IconButton,
  Input,
  Flex,
  Text,
  Textarea
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
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const CreatorName = styled(Flex)`
  align-items: center;
  flex-direction: row;
`

const RaisedHandsImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 24px;
  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

const TimelineCard = props => {
  const [newTitle, setNewTitle] = useState(null)
  const [newInput, setNewInput] = useState(null)
  const { content } = props
  if (props.newUpdateOption) {
    return (
      <Box style={{ width: '100%' }}>
        <CardContainer>
          <Input
            variant='longInput'
            sx={{
              width: '100%',
              variant: 'headings.h3',
              color: 'secondary',
              padding: '1.125rem 0 0 1rem',
              '&::placeholder': {
                variant: 'headings.h3',
                color: 'bodyLight'
              }
            }}
            type='text'
            placeholder='Title'
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <Textarea
            variant='longInput'
            rows={4}
            sx={{
              width: '100%',
              fontFamily: 'body',
              padding: '1.125rem 1rem',
              resize: 'none',
              '&::placeholder': {
                variant: 'body',
                color: 'bodyLight'
              }
            }}
            type='text'
            placeholder='Write your update...'
            value={newInput}
            onChange={e => setNewInput(e.target.value)}
          />
          <Flex sx={{ my: 2, mx: 3, justifyContent: 'flex-end' }}>
            <Button
              sx={{
                variant: 'buttons.small',
                background: 'none',
                color: 'primary'
              }}
              onClick={() => {
                props.newUpdateOption({ title: newTitle, content: newInput })
                setNewTitle('')
                setNewInput('')
              }}
            >
              <Text variant='text.bold'>SUBMIT</Text>
            </Button>
          </Flex>
        </CardContainer>
      </Box>
    )
  }
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
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              {props?.specialContent?.title}
            </Text>
          </Box>

          <Text
            sx={{
              variant: 'text.default',
              pb: 4,
              color: 'bodyLight'
            }}
          >
            {props?.specialContent?.content}
          </Text>
          <RaisedHandsImg src={RaisedHands} />
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
              Update # {content?.id}
            </Text>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
              {content?.createdAt}
            </Text>
          </Top>
          {content?.title}
        </Heading>
        <CardContent>
          <Creator>
            <CreatorName>
              <Avatar src='https://www.filepicker.io/api/file/4AYOKBTnS8yxt5OUPS5M' />
              <Text
                sx={{
                  variant: 'text.paragraph',
                  color: 'secondary',
                  mx: 2
                }}
              >
                User Name
              </Text>
            </CreatorName>
            <Badge variant='altOutline' sx={{ mt: [2, 0, 0] }}>
              Creator
            </Badge>
          </Creator>
          <Text sx={{ variant: 'text.default' }}>{content?.content}</Text>
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
