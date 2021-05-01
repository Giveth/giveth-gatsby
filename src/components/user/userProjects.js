import React from 'react'
import { Text, Flex, Box, Link, Button, Grid } from 'theme-ui'
import ProjectCard from '../../components/projectCard'

export const UserProjects = props => {
  const { projects } = props

  const Empty = ({ name }) => {
    return (
      <Flex
        sx={{
          flexDirection: 'column',
          textAlign: 'center',
          m: 'auto',
          alignSelf: 'center'
        }}
      >
        <Text variant='headings.h5' color='secondary' mt={4}>
          {name || 'This user'} hasn't created a project yet
        </Text>
        <Text variant='text.default' color='secondary' mt={3}>
          Don't stop here! There are other projects you can donate to.
        </Text>
        <Link href='/projects'>
          <Button sx={{ variant: 'buttons.default', fontSize: 2, mt: 4 }}>
            BROWSE PROJECTS
          </Button>
        </Link>
      </Flex>
    )
  }

  return (
    <Box
      sx={{
        backgroundColor: 'softGray',
        mt: 0,
        pt: 3,
        pb: 4,
        px: 4
      }}
    >
      {projects?.length > 0 ? (
        <Grid
          p={[0, 4, 4]}
          columns={[1, 2, 3]}
          style={{
            margin: 0,
            columnGap: '2.375em',
            justifyItems: 'safe center'
          }}
        >
          {projects
            ?.slice()
            .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
            .map((project, index) => (
              <ProjectCard shadowed project={project} raised={0} />
            ))}
        </Grid>
      ) : (
        <Empty />
      )}
    </Box>
  )
}
