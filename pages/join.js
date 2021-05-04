import { jsx, Flex, Grid } from "theme-ui";
import { fetchEntries } from "../src/utils/contentfulPosts";
import Layout from "../src/components/layout";
// import Seo from '../src/components/seo'
import Hero from "../src/components/content/JoinPageHero";
import JoinChatCard from "../src/components/content/JoinPageCard";

const JoinPage = ({ joinChat }) => {
  return (
    <Layout>
      {/* <Seo title='Join our community' /> */}
      <Hero />
      <Flex sx={{ justifyContent: "center", backgroundColor: "lightestBlue" }}>
        <Grid
          mt="2rem"
          p={[1, 2, 6]}
          columns={[1, 1, 2]}
          sx={{ maxWidth: "80vw" }}
        >
          <JoinChatCard data={joinChat} />
        </Grid>
      </Flex>
    </Layout>
  );
};

export async function getServerSideProps() {
  // contentful
  const joinReq = await fetchEntries({
    contentType: "contentJoinChatprovider",
  });
  const joinChat = await joinReq.map((j) => {
    return j.fields;
  });

  return {
    props: {
      joinChat: joinChat || {},
    },
  };
}

export default JoinPage;
