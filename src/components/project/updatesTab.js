import React, { useEffect } from 'react'
import {
  GET_PROJECT_UPDATES,
  ADD_PROJECT_UPDATE
} from '../../apollo/gql/projects'
import { useMutation, useQuery } from '@apollo/client'
import { ProjectContext } from '../../contextProvider/projectProvider'
import Toast from '../toast'
import Timeline from './timeline'

const UpdatesTab = ({ showModal, setShowModal, project, isOwner }) => {
  const [addUpdateMutation] = useMutation(ADD_PROJECT_UPDATE)
  const { currentProjectView, setCurrentProjectView } = React.useContext(
    ProjectContext
  )

  const { data, error } = useQuery(GET_PROJECT_UPDATES, {
    variables: {
      projectId: parseFloat(project?.id),
      take: 100,
      skip: 0
    },
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (data) {
      setCurrentProjectView({
        ...currentProjectView,
        updates: data?.getProjectUpdates
      })
    }
  }, [data])

  const addUpdate = async ({ title, content }) => {
    try {
      if (!title || !content)
        return Toast({ content: 'Fields should not be empty', type: 'error' })
      // check if file is too large
      const contentSize = encodeURI(content).split(/%..|./).length - 1
      if (contentSize > 32000) {
        // 32Kb max maybe too much?
        return Toast({
          content: `Content is too heavy`,
          type: 'error'
        })
      }
      const { data } = await addUpdateMutation({
        variables: {
          projectId: parseFloat(project?.id),
          title,
          content
        },
        refetchQueries: [
          {
            query: GET_PROJECT_UPDATES,
            variables: {
              projectId: parseFloat(project?.id),
              take: 100,
              skip: 0
            }
          }
        ]
      })
      console.log({ data })
    } catch (error) {
      console.error('addUpdate')
      console.log({ error })
      alert(JSON.stringify(error?.message))
    }
  }

  return (
    <>
      <Timeline
        content={currentProjectView?.updates}
        addUpdate={addUpdate}
        project={project}
        isOwner={isOwner}
        refreshQuery={GET_PROJECT_UPDATES}
      />
    </>
  )
}

export default UpdatesTab
