import { client } from '../apollo/client'
import { ACTIVATE_PROJECT, DEACTIVATE_PROJECT } from '../apollo/gql/projects'

export async function deactivateProject(data, onSuccess) {
  try {
    const { projectId } = data
    const edit = await client.mutate({
      mutation: DEACTIVATE_PROJECT,
      variables: {
        projectId: parseFloat(projectId)
      }
    })
    if (edit?.data?.deactivateProject) {
      onSuccess()
    }
  } catch (error) {
    console.log({ error })
  }
}

export async function toggleProjectActivation(data, isActive, onSuccess) {
  try {
    const { projectId } = data
    const edit = await client.mutate({
      mutation: !isActive ? ACTIVATE_PROJECT : DEACTIVATE_PROJECT,
      variables: {
        projectId: parseFloat(projectId)
      }
    })
    const response = !isActive
      ? edit?.data?.activateProject
      : edit?.data?.deactivateProject
    if (response) {
      onSuccess(!isActive ? 'Project Activated' : 'Project Deactivated')
    }
    return response
  } catch (error) {
    console.log({ error })
  }
}
