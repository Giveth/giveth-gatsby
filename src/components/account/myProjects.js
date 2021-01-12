/** @jsx jsx */
import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'
import { useQueryParams, StringParam } from 'use-query-params'
import ProjectCard from '../projectListing'
import ProjectEdition from './projectEdition/index'
import styled from '@emotion/styled'
import theme from '../../gatsby-plugin-theme-ui'
import { Box, Grid, Text, jsx } from 'theme-ui'
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

const MyProjects = props => {
  const { projects, edit } = props
  const [editProject, setEditProject] = useState(edit)
  const { isWalletProved, proveWallet } = useContext(ProveWalletContext)
  const [query, setQuery] = useQueryParams({
    view: StringParam,
    data: StringParam
  })

  const setProject = val => {
    setQuery({ view: 'projects', data: val.slug })
    setEditProject(val)
  }
  if (editProject) {
    return (
      <ProjectEdition
        project={editProject}
        goBack={() => setQuery({ view: 'projects', data: 'all' })}
      />
    )
  }

  if (!isWalletProved) {
    return (
      <>
        <Text sx={{ variant: 'headings.h4', color: 'secondary', mt: 4 }}>
          Let's first verify your wallet{' '}
          <a
            sx={{
              color: 'primary',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={proveWallet}
          >
            here
          </a>
        </Text>
      </>
    )
  }
  return (
    <>
      <Grid p={4} columns={[1, 2]} style={{ justifyItems: 'center' }}>
        {projects?.map((item, index) => {
          return (
            <ProjectCard
              action={() => setProject(item)}
              name={item?.title}
              description={item?.description}
              image={item?.image}
              raised={111}
              categories={item?.categories}
              listingId={index}
              key={index}
            />
          )
        })}
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

export default MyProjects
