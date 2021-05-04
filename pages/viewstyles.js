import React from "react";
import { Grid, Button, Heading, Text, IconButton } from "theme-ui";
import styled from "@emotion/styled";

import ProjectCard from "../src/components/projectCard";

// import placeholder image
const noImage = "/images/no-image-available.jpg";

// import image assets
const iconUser = "/images/icon-user.svg";
const iconVerticalLine = "/images/icon-vertical-line.svg";
const iconSearch = "/images/icon-search.svg";
const iconShare = "/images/icon-share.svg";
const iconHeart = "/images/icon-heart.svg";
const iconStreamlineGas = "/images/icon-streamline-gas.svg";
const imgPeopleAnnounce = "/images/people-announce.svg";
const imgPeopleHeader = "/images/people-header.svg";
const imgPeoplePuzzle = "/images/people-puzzle.svg";
const imgPeopleStretching = "/images/people-stretching.png";
const imgDecoratorCloud1 = "/images/decorator-cloud1.svg";
const imgDecoratorCloud2 = "/images/decorator-cloud2.svg";
const imgDecoratorElements = "/images/decorator-elements.svg";
const imgDecoratorFizzy = "/images/decorator-fizzy-square.svg";
const imgDecoratorFizzyRot = "/images/decorator-fizzy-square-rotated.svg";
const imgDecoratorLeaf = "/images/decorator-leaf.svg";
// import UserDetails from '../components/torus/userDetails'
import { WalletProvider } from "../src/contextProvider/WalletProvider";

const StyleGuide = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  margin: 1rem;
`;

const Container = styled.div`
  padding: 1rem;
  button {
    margin: 0.5rem;
  }
`;

const ViewStyles = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "0 1.0875rem 1.45rem",
      }}
    >
      <div
        sx={{
          // applies width 100% to all viewport widths,
          // width 50% above the first breakpoint,
          // and 25% above the next breakpoint
          width: ["100%", "50%", "25%"],
        }}
      >
        <WalletProvider>
          <Grid gap={1} columns={[2, "1fr 1fr"]}>
            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Headings</Text>
              <Container>
                <Heading sx={{ variant: "headings.display" }}>Display</Heading>
                <Heading sx={{ variant: "headings.h1" }}>Heading 1</Heading>
                <Heading sx={{ variant: "headings.h2" }}>Heading 2</Heading>
                <Heading sx={{ variant: "headings.h3" }}>Heading 3</Heading>
                <Heading sx={{ variant: "headings.h4" }}>Heading 4</Heading>
                <Heading sx={{ variant: "headings.h5" }}>Heading 5</Heading>
                <Heading sx={{ variant: "headings.h6" }}>Heading 6</Heading>
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Bodytext</Text>
              <Container>
                <Text sx={{ variant: "text.default" }}>
                  DEFAULT: Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classical literature, discovered the
                  undoubtable source.
                </Text>
                <br />
                <Text sx={{ variant: "text.small" }}>
                  SMALL: Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classical literature, discovered the
                  undoubtable source.
                </Text>
                <br />
                <Text sx={{ variant: "text.medium" }}>
                  MEDIUM: Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classical literature, discovered the
                  undoubtable source.
                </Text>
                <br />
                <Text sx={{ variant: "text.large" }}>
                  LARGE: Contrary to popular belief, Lorem Ipsum is not simply
                  random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old. Richard
                  McClintock, a Latin professor at Hampden-Sydney College in
                  Virginia, looked up one of the more obscure Latin words,
                  consectetur, from a Lorem Ipsum passage, and going through the
                  cites of the word in classical literature, discovered the
                  undoubtable source.
                </Text>
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Other</Text>
              <Container>
                <Text sx={{ variant: "text.quote" }}>Quote</Text>
                <Text sx={{ variant: "text.overline" }}>Overline</Text>
                <Text sx={{ variant: "text.overlineSmall" }}>
                  Overline small
                </Text>
                <Text sx={{ variant: "text.caption" }}>Caption</Text>
                <Text sx={{ variant: "text.microbold" }}>Microbold</Text>
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Buttons</Text>
              <Container>
                <Button sx={{ variant: "buttons.default" }}>default</Button>
                <Button sx={{ variant: "buttons.small", bg: "accent" }}>
                  small
                </Button>
                <Button sx={{ variant: "buttons.tiny", bg: "secondary" }}>
                  tiny
                </Button>
                <Button sx={{ variant: "buttons.tertiary" }}>tertiary</Button>
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Components</Text>
              <Container>
                <Grid width={[128, null, 192]}>
                  <ProjectCard
                    fromViewStyle
                    name="Giveth DAC"
                    image="https://feathers.beta.giveth.io/uploads/368b8ef30b9326adc4a490c4506189f905cdacef63b999f9b042a853ab12a5bb.png"
                    raised={1223}
                    category="Blockchain 4 Good"
                  />
                </Grid>
                {/* <UserDetails
                  user={{
                    publicAddress: '0x701d0ECB3BA780De7b2b36789aEC4493A426010a',
                    profileImage: './avatar.jpg'
                  }}
                  balance='34 xDAI'
                /> */}
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Icons</Text>
              <Container>
                <IconButton>
                  <img src={iconHeart} alt="" />
                </IconButton>
                <br />
                <IconButton>
                  <img src={iconShare} alt="" />
                </IconButton>
                <br />
                <IconButton>
                  <img src={iconUser} alt="" />
                </IconButton>
                <br />
                <img src={iconVerticalLine} alt="" />
                <br />
                <IconButton>
                  <img src={iconSearch} alt="" />
                </IconButton>
                <IconButton>
                  <img src={iconStreamlineGas} alt="" />
                </IconButton>
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>
                Illustrations - People
              </Text>
              <Container>
                <img src={imgPeopleHeader} alt="" width="400px" />
                <br />
                <img src={imgPeopleAnnounce} alt="" />
                <br />
                <img src={imgPeoplePuzzle} alt="" />
                <br />
                <img src={imgPeopleStretching} alt="" />
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>
                Illustrations - Elements
              </Text>
              <Container>
                <img src={imgDecoratorCloud1} alt="" />
                <br />
                <img src={imgDecoratorCloud2} alt="" />
                <br />
                <img src={imgDecoratorElements} alt="" />
                <br />
                <img src={imgDecoratorFizzyRot} alt="" />
                <br />
                <img src={imgDecoratorFizzy} alt="" />
                <br />
                <img src={imgDecoratorLeaf} alt="" />
              </Container>
            </StyleGuide>

            <StyleGuide>
              <Text sx={{ variant: "text.styleGuide" }}>Other Assets</Text>
              <Container>
                <img src={noImage} alt="" />
              </Container>
            </StyleGuide>
          </Grid>
        </WalletProvider>
      </div>
    </div>
  );
};

export default ViewStyles;
