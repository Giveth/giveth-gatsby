import React, { useContext } from 'react'
import { Heading, Box, Card, IconButton, Text } from 'theme-ui'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'
import Donate from '../components/donateForm'

import iconShare from '../images/icon-share.svg'
import iconHeart from '../images/icon-heart.svg'
import { TorusContext } from '../contextProvider/torusProvider'

const ProjectCard = styled(Card)`
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 6px;
  width: 100%;
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
const CardFooter = styled.span`
  display: grid;
  grid-template-columns: 1fr auto auto;
  justify-content: flex-end;
  align-items: center;
  padding: 0rem 1rem;
`

const ProjectListing = props => {
  const { balance } = useContext(TorusContext)
  return (
    <Box key={props.listingId + '_box'} style={{ width: '100%' }}>
      <ProjectCard key={props.listingId + '_card'}>
        <div
          key={props.listingId + '_div'}
          src={props.image}
          style={{
            width: '100%',
            height: '186px',
            margin: '0 auto',
            borderRadius: '6px 6px 0px 0px',
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
        </div>
        <Heading
          sx={{ variant: 'headings.h6' }}
          style={{
            padding: '2.5rem 1rem 1rem 1rem',
            width: '260',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          key={props.listingId + '_heading'}
        >
          {props.name}
        </Heading>
        <br />

        <CardFooter>
          <Text
            sx={{ variant: 'text.default' }}
            style={{ color: theme.colors.muted, alignSelf: 'center' }}
          >
            {props.category}
          </Text>
          <IconButton>
            <img src={iconHeart} alt={''} />
          </IconButton>
          <IconButton>
            <img src={iconShare} alt={''} />
          </IconButton>
        </CardFooter>
      </ProjectCard>
      <Donate
        maxAmount={balance}
        doDonate={values => alert('donating' + values.amount)}
      />
    </Box>
  )
}

export default ProjectListing
