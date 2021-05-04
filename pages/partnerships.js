import { jsx, Flex, Grid, Text, Box, Button } from "theme-ui";
import theme from "../src/utils/theme-ui";
import { fetchEntries } from "../src/utils/contentfulPosts";
import React from "react";
import Seo from "../src/components/seo";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "@emotion/styled";

import useMediaQuery from "react-responsive";

import Layout from "../src/components/layout";

import { FaMediumM, FaGithub } from "react-icons/fa";

const Main = styled(Grid)`
  justify-content: start;
  padding: 10vw;
  @media (max-width: 500px) {
    margin: 1rem;
    padding: 0vw;
  }
`;
const ContentItem = styled(Grid)`
  grid-template-rows: auto auto 1fr;
  grid-gap: 1rem;
  justify-items: center;
  padding: 1.5rem;
  width: 250px;
  height: 250px;
  border: 1px solid ${theme.colors.muted};
  border-radius: 12px;
`;

const Decorator = styled.div`
  position: absolute;
  @media (max-width: 500px) {
    display: none;
  }
`;
const RaisedHandsImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  @media (max-width: 800px) {
    display: none;
    align-items: flex-start;
  }
`;

const SpecialCardContainer = styled(Flex)`
  width: 100%;
  min-height: 240px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  background-color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.muted};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0.5rem 0;
`;

const Partnerships = ({ friendsLogos, partners }) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const mimeType = file["en-US"].contentType;
        const mimeGroup = mimeType.split("/")[0];

        switch (mimeGroup) {
          case "image":
            return (
              <img
                title={title ? title["en-US"] : null}
                alt={description ? description["en-US"] : null}
                src={file["en-US"].url}
              />
            );
          case "application":
            return (
              <a
                alt={description ? description["en-US"] : null}
                href={file["en-US"].url}
              >
                {title ? title["en-US"] : file["en-US"].details.fileName}
              </a>
            );
          default:
            return (
              <span style={{ backgroundColor: "black", color: "white" }}>
                {" "}
                {mimeType} embedded asset{" "}
              </span>
            );
        }
      },
    },
  };
  console.log({ friendsLogos, partners });
  // return null;
  const isMobile = useMediaQuery({ query: "(max-width: 825px)" });
  return (
    <Layout>
      <Seo title="Our partnerships" />
      {!isMobile ? (
        <Decorator>
          <img
            src={"/images/decorator-puzzlepieces.svg"}
            alt=""
            style={{
              position: "absolute",
              right: "-90vw",
            }}
          />
        </Decorator>
      ) : null}
      <Main sx={{ width: ["90%", "90%", "70%"] }}>
        <Text sx={{ variant: "headings.h2" }}>{partners[0].title}</Text>
        <Text
          sx={{
            variant: "text.large",
          }}
        >
          {partners[0].subtitle}
        </Text>
        <Text
          sx={{
            variant: "text.default",
          }}
        >
          {documentToReactComponents(partners[0].moreInfo.json)}
        </Text>
        <Text
          pt={5}
          sx={{
            variant: "text.large",
          }}
        >
          Our partners and friends{" "}
        </Text>
        <Grid
          columns={[1, 2, 3]}
          gap={4}
          sx={{ justifySelf: ["center", "auto", "auto"], maxWidth: "800px" }}
        >
          {friendsLogos?.map((friend) => (
            <ContentItem key={friend.logo.sys.id}>
              <a
                to={friend.link}
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                  color: "secondaryDark",
                }}
              >
                <Flex sx={{ flexDirection: "column" }}>
                  <img
                    width="100%"
                    height="50px"
                    style={{ objectFit: "contain" }}
                    src={friend.logo.fields.file.url}
                  />

                  <Text pt={2} sx={{ variant: "headings.h6" }}>
                    {friend.name}
                  </Text>
                  <Text pt={3} sx={{ variant: "text.default" }}>
                    {friend.description}
                  </Text>
                </Flex>
              </a>
            </ContentItem>
          ))}
        </Grid>

        <SpecialCardContainer sx={{ maxWidth: "800px" }}>
          <img
            src="/images/svg/general/decorators/dark-clouds.svg"
            style={{ position: "absolute", top: "41px", right: "42px" }}
          />
          <Box
            sx={{
              width: "60%",
              pb: 2,
              pt: 4,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <Text sx={{ variant: "headings.h4", color: "background" }}>
              Partner with us
            </Text>
          </Box>

          <Text
            sx={{
              variant: "text.default",
              pb: 4,
              color: "bodyLight",
            }}
          >
            We're always open for new partnerships
          </Text>
          <Link href="/contact">
            <Button
              mt={1}
              p={3}
              sx={{
                width: "200px",
                variant: "buttons.default",
              }}
            >
              Contact Us
            </Button>
          </Link>
          <RaisedHandsImg src={"/images/decorator-raised-one-hand.png"} />
        </SpecialCardContainer>
      </Main>
    </Layout>
  );
};

export async function getServerSideProps() {
  // contentful
  const friendsReq = await fetchEntries({ contentType: "friendslogos" });
  const friendsLogos = await friendsReq.map((f) => {
    return f.fields;
  });

  const partnershipsReq = await fetchEntries({
    contentType: "contentPartnerships",
  });
  console.log(JSON.stringify(partnershipsReq));
  const partnerships = await partnershipsReq?.map((p) => {
    return p.fields;
  });

  return {
    props: {
      friendsLogos: friendsLogos || {},
      partners: partnerships || {},
    },
  };
}

export default Partnerships;
