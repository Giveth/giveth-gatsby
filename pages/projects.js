import React, { useState } from "react";
import { client } from "../src/apollo/client";
import Layout from "../src/components/layout";

import ProjectsList, {
  OrderByDirection,
  OrderByField,
} from "../src/components/ProjectsList";

import { FETCH_ALL_PROJECTS } from "../src/apollo/gql/projects";

const Project = (props) => {
  const { projects, categories, totalCount } = props;
  const [limit, setLimit] = useState(12);
  const [orderByField, setOrderByField] = useState(OrderByField.Balance);
  return (
    <Layout>
      {/* <Seo title='Projects' /> */}
      <ProjectsList
        projects={projects}
        categories={categories}
        totalCount={totalCount}
        maxLimit={limit}
        selectOrderByField={(orderByField) => {
          setLimit(2);
          setOrderByField(orderByField);
        }}
      />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  // Fetch Project
  const { loading, error = null, data: fetchProject } = await client.query({
    query: FETCH_ALL_PROJECTS,
    fetchPolicy: "network-only",
  });
  const projects = Array.from(fetchProject?.projects).filter(
    (i) => i?.status?.id === "5"
  );
  return {
    props: {
      projects,
      categories: projects?.categories || null,
      totalCount: projects?.length,
    },
  };
}

export default Project;
