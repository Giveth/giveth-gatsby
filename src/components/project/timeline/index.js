import React from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../../contextProvider/projectProvider'
import { Button, Flex, Text } from 'theme-ui'
import Card from './card'
import theme from '../../../gatsby-plugin-theme-ui'

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

const Timeline = () => {
  const content = [1, 2, 3]
  const newUpdateOption = true
  return (
    <VerticalTimeline>
      {newUpdateOption && (
        <Container>
          <LeftInfo sx={{ left: '-23px' }}>
            <Text sx={{ variant: 'text.small', color: 'bodyDark' }}>NEW</Text>
            <Text sx={{ variant: 'text.small', color: 'bodyDark' }}>
              UPDATE
            </Text>
          </LeftInfo>
          <Card newUpdateOption />
        </Container>
      )}
      {content.map((i, index) => (
        <Container key={index}>
          <LeftInfo sx={{ left: '-13px' }}>
            <Text sx={{ variant: 'text.small', color: 'bodyLight' }}>WED</Text>
            <Text sx={{ variant: 'headings.h4' }}>2</Text>
          </LeftInfo>
          <Card
            specialContent={
              index + 1 === content.length
                ? { title: 'Project Launched' }
                : false
            }
          />
        </Container>
      ))}
    </VerticalTimeline>
  )
}

export default Timeline
