import React, { useState, useEffect } from 'react'
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
  Text
} from 'theme-ui'
import dayjs from 'dayjs'
import { GET_USER } from '../../../apollo/gql/auth'
import {
  TOGGLE_UPDATE_REACTION,
  GET_PROJECT_UPDATES
} from '../../../apollo/gql/projects'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useApolloClient } from '@apollo/client'
import styled from '@emotion/styled'

import theme from '../../../gatsby-plugin-theme-ui'

import Jdenticon from 'react-jdenticon'
import iconShare from '../../../images/icon-share.svg'
import iconHeart from '../../../images/icon-heart.svg'
import DarkClouds from '../../../images/svg/general/decorators/dark-clouds.svg'
import RaisedHands from '../../../images/decorator-raised-hands.png'

import RichTextViewer from '../../richTextViewer'

const RichTextInput = React.lazy(() => import('../../richTextInput'))

dayjs.extend(localizedFormat)

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
  align-items: center;
  justify-content: flex-start;
  margin: -0.5rem 0 0.5rem 0;
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
  const [user, setUser] = useState(null)
  const { content, reactions, number } = props
  const client = useApolloClient()
  const isSSR = typeof window === 'undefined'

  const react = async () => {
    try {
      await client?.mutate({
        mutation: TOGGLE_UPDATE_REACTION,
        variables: {
          reaction: 'heart',
          updateId: parseFloat(props?.content?.id)
        },
        refetchQueries: [
          {
            query: props?.refreshQuery,
            variables: {
              projectId: parseFloat(props?.project?.id),
              take: 100,
              skip: 0
            }
          }
        ]
      })
      // return Toast({ content: 'You liked it!', type: 'success' })
      return true
    } catch (error) {
      console.log({ error })
    }
  }
  const likedByUser = reactions?.find(r => r?.userId === user?.id)
  useEffect(() => {
    const setup = async () => {
      if (props?.specialContent || !props?.content) return
      try {
        const userInfo = await client?.query({
          query: GET_USER,
          variables: {
            userId: parseInt(props?.content?.userId)
          }
        })
        setUser(userInfo?.data?.user)
      } catch (error) {
        console.log({ error })
      }
    }
    setup()
  }, [])

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
          {/* <Textarea
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
          /> */}
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <RichTextInput
                style={{
                  width: '100%',
                  height: '400px',
                  fontFamily: 'body',
                  padding: '1.125rem 1rem',
                  borderRadius: '12px',
                  resize: 'none',
                  '&::placeholder': {
                    variant: 'body',
                    color: 'bodyLight'
                  }
                }}
                value={newInput}
                placeholder='Write your update...'
                onChange={(newValue, delta, source) => {
                  try {
                    setNewInput(newValue)
                  } catch (error) {
                    console.log({ error })
                  }
                }}
                // onChange={e => getLength(e)}
                // maxLength={2000}
              />
            </React.Suspense>
          )}
          <Flex sx={{ my: 2, mx: 3, justifyContent: 'flex-end' }}>
            <Button
              sx={{
                cursor: 'pointer',
                variant: 'buttons.small',
                background: 'none',
                color: 'primary',
                marginTop: '3rem',
                zIndex: 5
              }}
              onClick={async () => {
                const res = await props.newUpdateOption({
                  title: newTitle,
                  content: newInput
                })
                if (res !== false) {
                  setNewTitle('')
                  setNewInput('')
                }
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
              Update # {number}
            </Text>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
              {
                // dayjs(content?.createdAt)
              }
            </Text>
          </Top>
          {content?.title}
        </Heading>
        <CardContent>
          {user && (
            <Creator>
              <CreatorName>
                {user?.avatar ? (
                  <Avatar src={user?.avatar} />
                ) : (
                  <Jdenticon size='24' value={user?.walletAddress} />
                )}
                <Text
                  sx={{
                    variant: 'text.paragraph',
                    color: 'secondary',
                    mx: 2
                  }}
                >
                  {user?.name || ''}
                </Text>
              </CreatorName>
              <Badge variant='altOutline' sx={{ mt: [2, 0, 0] }}>
                Creator
              </Badge>
            </Creator>
          )}
          <RichTextViewer content={content?.content} />
          {
            // <Text sx={{ variant: 'text.default' }}>{content?.content}</Text>
          }
        </CardContent>
        <CardFooter>
          <IconButton onClick={react} sx={{ cursor: 'pointer' }}>
            <img
              src={iconHeart}
              alt=''
              style={{
                '-webkit-filter': likedByUser
                  ? 'invert(40%) grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)'
                  : null
              }}
            />
          </IconButton>
          <Text sx={{ variant: 'text.default', ml: -2 }}>
            {' '}
            {reactions?.length > 0 ? reactions?.length : ''}{' '}
          </Text>
          {/* <IconButton>
            <img src={iconShare} alt='' />
          </IconButton> */}
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
