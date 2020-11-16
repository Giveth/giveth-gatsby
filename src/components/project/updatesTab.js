import React from 'react'
import {
  GET_PROJECT_UPDATES,
  ADD_PROJECT_UPDATE
} from '../../apollo/gql/projects'
import { useMutation, useQuery } from '@apollo/react-hooks'

import Timeline from './timeline'

const UpdatesTab = ({ showModal, setShowModal, project, isOwner }) => {
  const [addUpdateMutation] = useMutation(ADD_PROJECT_UPDATE)

  const { data } = useQuery(GET_PROJECT_UPDATES, {
    variables: {
      projectId: parseInt(project?.id),
      take: 100,
      skip: 0
    }
  })

  console.log({ data })

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
        isOwner={isOwner}
      />
    </>
  )
}

export default UpdatesTab
