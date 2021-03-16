import { client } from '../apollo/client'
import { DEACTIVATE_PROJECT } from '../apollo/gql/projects'

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
