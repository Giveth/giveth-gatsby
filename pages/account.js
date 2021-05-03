import React from "react";
import AccountIndex from "../src/components/account";
// import Seo from "../src/components/seo";
import Layout from "../src/components/layout";
// TODO: ADD SEO
const AccountPage = (props) => {
  return (
    <Layout noHeader>
      {/* <Seo /> */}
      <AccountIndex />
    </Layout>
  );
};

export default AccountPage;
