import { jsx, Flex, Grid } from "theme-ui";

import Layout from "../src/components/layout";
// import Seo from '../src/components/seo'
import Hero from "../src/components/content/JoinPageHero";
import JoinChatCard from "../src/components/content/JoinPageCard";

const JoinPage = ({ data }) => {
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
          <JoinChatCard data={data?.contentChats?.edges} />
        </Grid>
      </Flex>
    </Layout>
  );
};

export default JoinPage;

// export const query = graphql`
//   query JoinChatQuery {
//     contentChats: allContentfulContentJoinChatprovider(
//       sort: { order: ASC, fields: createdAt }
//     ) {
//       edges {
//         node {
//           id
//           platformTitle
//           descriptionText
//           onboardingLink
//           platformLogo {
//             id
//             file {
//               url
//               fileName
//               contentType
//             }
//           }
//           cardBackgroundImage {
//             id
//             file {
//               url
//               fileName
//               contentType
//             }
//           }
//         }
//       }
//     }
//   }
// `
