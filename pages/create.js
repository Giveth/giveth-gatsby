import { client } from "../src/apollo/client";
import { GET_CATEGORIES } from "../src/apollo/gql/projects";
import CreateProject from "../src/components/create-project-form/createProject";

function CreateIndex({ categories }) {
  return <CreateProject categories={categories} />;
}

export async function getServerSideProps() {
  const { loading, error = null, data: response } = await client.query({
    query: GET_CATEGORIES,
  });
  return {
    props: {
      categories: response?.categories,
    },
  };
}

export default CreateIndex;
