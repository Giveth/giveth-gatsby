import { client } from '../apollo/client'
import { DEACTIVATE_PROJECT } from '../apollo/gql/projects'

export async function deactivateProject (data) {
  const edit = await client.mutate({
    mutation: DEACTIVATE_PROJECT,
    variables: {
      projectId: parseFloat(projectId)
    }
  })
}
