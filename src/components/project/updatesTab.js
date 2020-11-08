import React from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../contextProvider/projectProvider'
import {
  GET_PROJECT_UPDATES,
  ADD_PROJECT_UPDATE
} from '../../apollo/gql/projects'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Flex, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'

import Timeline from './timeline'

export const UpdatesTab = ({ showModal, setShowModal, project }) => {
  const client = useApolloClient()
  const [addUpdateMutation] = useMutation(ADD_PROJECT_UPDATE)
  const [updates, setUpdates] = React.useState(null)

  const { data, loading } = useQuery(GET_PROJECT_UPDATES, {
    variables: {
      projectId: parseInt(project?.id),
      take: 100,
      skip: 0
    }
  })

  console.log({ data })

  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const addUpdate = async ({ title, content }) => {
    try {
      if (!title || !content) return alert('Fields should not be empty')
      const { data } = await addUpdateMutation({
        variables: {
          projectId: parseFloat(project?.id),
          title,
          content
        },
        refetchQueries: [
          {
            query: GET_PROJECT_UPDATES,
            variables: { projectId: parseInt(project?.id), take: 100, skip: 0 }
          }
        ],
        awaitRefetchQueries: true
      })
    } catch (error) {
      console.log({ error })
      alert(JSON.stringify(error?.message))
    }
  }

  return (
    <>
      <Timeline
        content={data?.getProjectUpdates}
        addUpdate={addUpdate}
        project={project}
      />
    </>
  )
}
