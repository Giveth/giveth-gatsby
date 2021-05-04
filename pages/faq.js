import { jsx, Text, Box } from "theme-ui";
import { fetchEntries } from "../src/utils/contentfulPosts";
import React from "react";
import Seo from "../src/components/seo";
import styled from "@emotion/styled";

import Layout from "../src/components/layout";
import ContentFaq from "../src/components/content/ContentFaq";

const Main = styled(Box)``;

const Faq = ({ faqs }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Layout>
      <Seo title="FAQ" />
      <Main>
        <Text sx={{ variant: "headings.h2", textAlign: "center" }}>FAQ</Text>
        <ContentFaq data={faqs} isopen />
      </Main>
    </Layout>
  );
};

export async function getServerSideProps() {
  // contentful
  const faqReq = await fetchEntries({
    contentType: "allContentfulFaqEntry",
  });
  const faqs = await faqReq.map((f) => {
    return f.fields;
  });

  return {
    props: {
      faqs: faqs || {},
    },
  };
}

export default Faq;

// export const query = graphql`
//   query Faq {
//     faqA: allContentfulFaqEntry(
//       sort: { fields: [createdAt], order: ASC }
//       filter: { category: { category: { eq: "General" } } }
//     ) {
//       edges {
//         node {
//           id
//           linkId
//           createdAt
//           question
//           answer {
//             json
//           }
//           category {
//             id
//             category
//           }
//         }
//       }
//     }
//   }
// `
