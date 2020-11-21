/** @jsx jsx */
import React from 'react'
import { Link } from 'gatsby'
import { ProjectContext } from '../../contextProvider/projectProvider'
import ProjectCard from '../projectListing'
import Pagination from 'react-js-pagination'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import { Box, Grid, Text, Flex, jsx } from 'theme-ui'
import DarkClouds from '../../images/svg/general/decorators/dark-clouds.svg'
import RaisedHand from '../../images/decorator-raised-one-hand.png'

const SpecialCard = styled(Link)`
  display: flex;
  width: 100%;
  height: 240px;
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

const RaisedHandImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 12px;

  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`

export const MyProjects = props => {
  return (
    <>
      <Grid p={4} columns={[1, 2]} style={{ justifyItems: 'center' }}>
        <ProjectCard
          name='Giveth DAC'
          image='https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png'
          raised={111}
          categories={['Blockchain 4 Good']}
          listingId='key1'
          key='key1'
        />
        <ProjectCard
          name='Aragon DAC'
          image='https://feathers.beta.giveth.io/uploads/3aa88b6ed3a6e0f54542086886194696a21c06b756864b97a1c1a0dcf58d4e17.png'
          raised={423}
          categories={['Blockchain 4 Good']}
          listingId='key2'
          key='key2'
        />
        <ProjectCard
          name='Fairdata Society'
          image='https://ipfs.giveth.io/ipfs/QmUCepVMUhCHhZ5mSEXqWgL3taxPU5gaUhczTZgA4JLyPk'
          raised={0}
          categories={['Social Technology']}
          listingId='key3'
          key='key3'
        />
        <SpecialCard to='/create' sx={{ cursor: 'pointer' }}>
          {' '}
          <DarkClouds
            style={{ position: 'absolute', top: '41px', right: '34px' }}
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
            <Text
              sx={{
                variant: 'text.default',
                color: 'bodyLight'
              }}
            >
              Start raising funds
            </Text>
            <Text sx={{ variant: 'headings.h4', color: 'background' }}>
              Create a Project
            </Text>
          </Box>
          <RaisedHandImg src={RaisedHand} />
        </SpecialCard>
      </Grid>
    </>
  )
}
