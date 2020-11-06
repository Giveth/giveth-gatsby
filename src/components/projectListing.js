import React, { useContext } from 'react'
import { Heading, Box, Card, IconButton, Text } from 'theme-ui'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'
import Donate from '../components/donateForm'

import iconShare from '../images/icon-share.svg'
import iconHeart from '../images/icon-heart.svg'
import { TorusContext } from '../contextProvider/torusProvider'

const ProjectCard = styled(Card)`
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  width: 100%;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 0.5rem 1rem;
`

const Badge = styled.span`
  padding: 3px 11.76px;
  margin: 1rem 0.2rem;
  align-items: center;
  border: 1px solid ${theme.colors.bodyLight};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
`

const Dot = styled.span`
  height: 68px;
  width: 68px;
  display: grid;
  color: ${theme.colors.background};
  border: 6px solid ${theme.colors.background};
  border-radius: 50%;
  position: absolute;
  bottom: -34px;
  left: 24px;
  z-index: 1;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 10px;
`

const DotInner = styled.span`
  display: block;
  text-align: center;
  align-self: center;
  position: relative;
`

const Options = styled.span`
  font-family: 'Red Hat Text', sans-serif;
  color: ${theme.colors.background};
  display: flex;
  position: absolute;
  align-items: center;
  bottom: -54px;
  right: 24px;
`

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1rem 0;
  padding: 0rem 1rem;
`

const Categories = () => {
  const categories = ['covid-19', 'non-profit']
  return categories.map((category, index) => (
    <Badge key={index}>
      <Text
        sx={{ variant: 'text.default' }}
        style={{
          fontSize: '10px',
          color: theme.colors.bodyLight,
          fontWeight: '500'
        }}
      >
        {category.toUpperCase()}
      </Text>
    </Badge>
  ))
}

const ProjectListing = props => {
  const { balance } = useContext(TorusContext)
  return (
    <Box
      key={props.listingId + '_box'}
      style={{
        width: '100%',
        cursor: props.disabled ? 'default' : 'pointer',
        border: props.disabled ? null : `1px solid ${theme.colors.muted}`,
        borderRadius: '12px',
        boxShadow: props.shadowed ? '0px 28px 52px rgba(44, 13, 83, 0.2)' : null
      }}
      onClick={() => {
        !props.disabled && navigate(`/donate/${props?.id || '1'}`)
      }}
    >
      <ProjectCard key={props.listingId + '_card'}>
        {/* need to add options from the gallery. */}
        <div
          key={props.listingId + '_div'}
          src={props.image}
          style={{
            width: '100%',
            height: '186px',
            margin: '0 auto',
            borderRadius: '12px 12px 0px 0px',
            backgroundImage: `url(${props.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
          }}
          alt={props.name}
        >
          <Dot
            key={props.listingId + '_card'}
            style={{
              backgroundColor:
                props.raised === 0
                  ? theme.colors.attention
                  : theme.colors.secondary
            }}
          >
            {props.raised === 0 ? (
              <DotInner>
                <Text sx={{ variant: 'text.overlineSmall' }}>NEW</Text>
              </DotInner>
            ) : (
              <DotInner>
                <Text sx={{ variant: 'text.overlineSmall' }}>RAISED</Text>
                <Text sx={{ variant: 'text.microbold' }}>${props.raised}</Text>
              </DotInner>
            )}
          </Dot>
          <Options>
            <IconButton>
              <img src={iconHeart} alt='' />
            </IconButton>
            <IconButton>
              <img src={iconShare} alt='' />
            </IconButton>
          </Options>
        </div>
        <Heading
          sx={{ variant: 'headings.h6' }}
          style={{
            padding: '2.5rem 1rem 0 1rem',
            width: '260',
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.colors.secondary
          }}
          key={props.listingId + '_heading'}
        >
          {props.name}
          <Text
            sx={{ variant: 'text.default' }}
            style={{
              color: theme.colors.primary,
              alignSelf: 'center',
              minHeight: '28px',
              lineHeight: '150%',
              paddingTop: '4px'
            }}
          >
            This is a description
          </Text>
        </Heading>
        <CardContent>
          <Text
            sx={{ variant: 'text.default' }}
            style={{
              fontSize: '16px',
              color: theme.colors.bodyDark,
              // textOverflow: 'ellipsis',
              // wordWrap: 'break-word',
              // whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxHeight: '6rem',
              lineHeight: '1.2rem',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {
              /* Description String */

              props.description
            }
          </Text>
        </CardContent>
        <CardFooter>
          <Categories />
        </CardFooter>
      </ProjectCard>
      {
        // <Donate
        //   maxAmount={balance}
        //   doDonate={values => alert('donating' + values.amount)}
        // />
      }
    </Box>
  )
}

export default ProjectListing
