import React from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { ProjectContext } from '../../../contextProvider/projectProvider'
import { Button, Flex, Text } from 'theme-ui'
import theme from '../../../gatsby-plugin-theme-ui'

const Card = React.lazy(() => import('./card'))

dayjs.extend(localizedFormat)

const VerticalTimeline = styled.div`
  position: relative;
  margin: 1rem auto;
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: ${theme.colors.muted};
    top: 0;
    bottom: 0;
    left: 0;
    margin-right: 3px;
    margin-bottom: 240px;
  }
`

const Container = styled.div`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 100%;
  @media (max-width: 600px) {
    padding: 10px 0 10px 40px;
  }
`
const LeftInfo = styled(Flex)`
  flex-direction: column;
  text-align: center;
  padding: 0.5rem 0;
  background-color: ${theme.colors.background};
  position: absolute;
  top: 15px;
  z-index: 1;
`

const Timeline = ({
  content = [],
  addUpdate,
  project,
  isOwner,
  refreshQuery
}) => {
  const isSSR = typeof window === 'undefined'
  const newUpdateOption = true
  const projectCreationDate = dayjs(project?.creationDate)
  return (
    <VerticalTimeline>
      {newUpdateOption && isOwner && (
        <Container>
          <LeftInfo sx={{ left: '-23px' }}>
            <Text
              sx={{
                variant: 'text.small',
                fontWeight: '500',
                color: 'secondary'
              }}
            >
              NEW
            </Text>
            <Text
              sx={{
                variant: 'text.small',
                fontWeight: '500',
                color: 'secondary'
              }}
            >
              UPDATE
            </Text>
          </LeftInfo>
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <Card newUpdateOption={addUpdate} />
            </React.Suspense>
          )}
        </Container>
      )}
      {content
        ?.slice(0)
        .reverse()
        .map((i, index) => {
          const date = dayjs(i.createdAt)
          return (
            <Container key={index}>
              <LeftInfo sx={{ left: '-13px' }}>
                <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
                  {date?.format('MMM') || ''}
                </Text>
                <Text sx={{ variant: 'headings.h4' }}>
                  {' '}
                  {date?.format('DD') || ''}
                </Text>
                <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
                  {date?.format('YYYY') || ''}
                </Text>
              </LeftInfo>
              {!isSSR && (
                <React.Suspense fallback={<div />}>
                  <Card
                    content={i?.projectUpdate}
                    reactions={i?.reactions}
                    number={content.length - index}
                    project={project}
                    refreshQuery={refreshQuery}
                  />
                </React.Suspense>
              )}
            </Container>
          )
        })}
      <Container>
        <LeftInfo sx={{ left: '-13px' }}>
          <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
            {projectCreationDate?.format('MMM') || ''}
          </Text>
          <Text sx={{ variant: 'headings.h4' }}>
            {projectCreationDate?.format('DD') || ''}
          </Text>
          <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>
            {projectCreationDate?.format('YYYY') || ''}
          </Text>
        </LeftInfo>
        <Card
          specialContent={{
            title: 'Project Launched',
            content: projectCreationDate?.format('dddd LL') || ''
          }}
        />
      </Container>
    </VerticalTimeline>
  )
}

export default Timeline
