import React, { useEffect, useState } from "react";
import { client } from "../../src/apollo/client";
import { jsx, Text, Flex, Spinner } from "theme-ui";
import Layout from "../../src/components/layout";
// import Seo from '../src/components/seo'
import { PublicProfileView } from "../../src/components/user";
import { FETCH_USER_PROJECTS } from "../../src/apollo/gql/projects";
import { GET_USER_BY_ADDRESS } from "../../src/apollo/gql/auth";
import { WALLET_DONATIONS } from "../../src/apollo/gql/donations";

const User = (props) => {
  const { user } = props;

  return (
    <Layout>
      {/* <Seo title={user?.name ? `${user?.name} at Giveth` : 'Giveth Profile'} /> */}
      {user ? (
        <PublicProfileView {...props} />
      ) : (
        <Flex sx={{ m: "auto" }}>
          <Text variant="headings.h3" color="secondary">
            No user found
          </Text>
        </Flex>
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const { query } = props;

  const { data: userData } = await client.query({
    query: GET_USER_BY_ADDRESS,
    variables: {
      address: query?.address?.toLowerCase(),
    },
  });
  const user = userData?.userByAddress;

  // GET PROJECTS
  const { data: userProjects } = await client.query({
    query: FETCH_USER_PROJECTS,
    variables: { admin: parseFloat(user?.id || -1) },
    fetchPolicy: "network-only",
  });

  const projects = userProjects?.projects?.filter(
    (i) => i?.admin === userData?.id
  );

  // GET DONATIONS
  const { data: userDonations } = await client.query({
    query: WALLET_DONATIONS,
    variables: { fromWalletAddresses: [query?.address] },
    fetchPolicy: "network-only",
  });
  const donations = userDonations?.donationsFromWallets;

  return {
    props: {
      user,
      projects,
      donations,
    },
  };
}

export default User;
