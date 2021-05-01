import React from "react";
import { client } from "../src/apollo/client";
import { useState } from "react";
import Layout from "../src/components/layout";
// import Seo from '../components/seo'
import Hero from "../src/components/home/HeroSection";
import InfoSection from "../src/components/home/InfoSection";
import UpdatesSection from "../src/components/home/UpdatesSection";
import HomeTopProjects from "../src/components/home/HomeTopProjects";
import { PopupContext } from "../src/contextProvider/popupProvider";

import { FETCH_ALL_PROJECTS } from "../src/apollo/gql/projects";

const IndexContent = ({
  hideInfo,
  content,
  location,
  topProjects,
  categories,
  allProject,
}) => {
  const popup = React.useContext(PopupContext);
  // const [afterRenderProjects, setAfterRenderProjects] = useState(null)
  const [popupShown, setPopupShown] = useState(false);
  // useEffect(() => {
  //   if (location?.state?.welcome && !popupShown) {
  //     const extra = location?.state?.flashMessage || false
  //     popup.triggerPopup('WelcomeLoggedOut', extra)
  //     setPopupShown(true)
  //   }
  // }, [])
  return (
    <>
      <Hero content={content} />
      <HomeTopProjects
        fromHomePage
        projects={topProjects}
        categories={categories}
        totalCount={allProject?.totalCount}
      />
      {!hideInfo === true ? <InfoSection content={content} /> : null}
      <UpdatesSection content={content} />
    </>
  );
};

const IndexPage = (props) => {
  const { data, topProjects } = props;
  // const { markdownRemark, topProjects, allProject } = data;
  const hideInfo = process.env.HIDE_INFO_SECTION
    ? process.env.HIDE_INFO_SECTION
    : false;
  return (
    <Layout isHomePage="true">
      {/* <Seo title='Home' /> */}
      <IndexContent
        hideInfo={hideInfo}
        // content={content}
        // html={null}
        // location={location}
        topProjects={topProjects}
        categories={topProjects?.categories}
        allProject={null}
      />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { loading, error = null, data: response } = await client.query({
    query: FETCH_ALL_PROJECTS,
    variables: { limit: 3 },
  });
  return {
    props: {
      topProjects: response?.projects,
    },
  };
}

export default IndexPage;
