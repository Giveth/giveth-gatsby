import { client } from "../../src/apollo/client";
import DonationView from "../../src/components/donate";
import Layout from "../../src/components/layout";

import { FETCH_PROJECT_BY_SLUG } from "../../src/apollo/gql/projects";

const Donate = (props) => {
  return (
    <Layout asDialog>
      <DonationView {...props} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { query } = props;

  // Fetch Project
  const { loading, error = null, data: fetchProject } = await client.query({
    query: FETCH_PROJECT_BY_SLUG,
    variables: { slug: query?.slug },
    fetchPolicy: "network-only",
  });

  const project = fetchProject?.projectBySlug;

  return {
    props: {
      project,
    },
  };
}

export default Donate;
