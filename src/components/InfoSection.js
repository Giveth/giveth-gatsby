/** @jsx jsx */
import { jsx } from 'theme-ui'

import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Heading, Text } from 'theme-ui'
import theme from '../gatsby-plugin-theme-ui/index'
import styled from '@emotion/styled'

// import graphics
import decoratorCloud1 from '../images/decorator-cloud1.png'
import decoratorCloud2 from '../images/decorator-cloud2.png'
import decoratorFizzysquare from '../images/decorator-fizzy-square-rotated.png'
import decoratorAltruistic from '../images/decorator-a.png'
import decoratorDecentralized from '../images/decorator-b.png'
import decoratorCommunity from '../images/decorator-c.png'
import decoratorPuzzleguy from '../images/people-puzzle.png'

const Main = styled(Grid)`
  position: relative;
  @media (max-width: '850px') {
  }
  .intextlink {
    color: ${theme.colors.background};
    font-weight: 700;
    text-decoration: none;

    & :hover {
      color: ${theme.colors.primary};
    }
  }
  .semitransparent {
    opacity: 0.2;
  }
`

const InfoSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Main
      gap={2}
      rows={5}
      sx={{
        color: 'background',
        backgroundColor: 'secondary'
      }}
    >
      <Box
        pt={'100px'}
        pb={'60px'}
        sx={{ justifySelf: 'center', textAlign: 'center' }}
      >
        <Text pb={3} sx={{ variant: 'headings.h2' }}>
          What is Giveth?
        </Text>
        <Text pb={5} sx={{ variant: 'text.large', maxWidth: '580px' }}>
          A Decentralized Altruistic Community using technology to make the
          world a better place.
        </Text>
        <a
          href="https://medium.com/giveth/the-future-of-giving-is-crowdfunding-the-commons-ac265e3010b8"
          target="_blank"
        >
          <Button sx={{ variant: 'buttons.nofill', background: 'unset' }}>
            Read our story on the future of giving
          </Button>
        </a>
      </Box>
      <Grid
        columns={[1, 3, 3]}
        sx={{ justifyItems: 'center', textAlign: 'center' }}
      >
        <Box sx={{ maxWidth: '320px' }}>
          <img src={decoratorAltruistic} alt="" heigth="70px" />
          <Text sx={{ variant: 'headings.h4' }}>Altruistic</Text>
          <Text sx={{ variant: 'text.paragraph' }}>
            We’re building a completely free, open-source platform for
            communities, a disrupting force that can decentralize and facilitate
            altruism.
          </Text>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <img src={decoratorDecentralized} alt="" heigth="70px" />
          <Text sx={{ variant: 'headings.h4' }}>Decentralized</Text>
          <Text sx={{ variant: 'text.paragraph' }}>
            We experiment with decentralized Communication initiatives for
            future of the Communities.{' '}
          </Text>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <img src={decoratorCommunity} alt="" heigth="70px" />
          <Text sx={{ variant: 'headings.h4' }}>Community</Text>
          <Text sx={{ variant: 'text.paragraph' }}>
            Giving should be all about connecting the Givers with the Makers,
            the people who are making the change, and creating true and lasting
            connections between both.
          </Text>
        </Box>
      </Grid>
      <Box pt={4} pb={6} sx={{ justifySelf: 'center', textAlign: 'center' }}>
        <a href="https://giveth.io/join" target="_blank">
          <Button
            sx={{
              variant: 'buttons.default',
              fontSize: '2',
              letterSpacing: 'more'
            }}
          >
            Join the future of giving
          </Button>
        </a>
      </Box>
      <Box sx={{ justifySelf: 'center', textAlign: 'center' }}>
        <Text pb={3} sx={{ variant: 'headings.h2' }}>
          How it works
        </Text>
        <Text pb={5} sx={{ variant: 'text.large', maxWidth: '580px' }}>
          Our system cuts out bureaucracy and enables makers to create a high
          level of transparency and accountability towards Givers.
        </Text>
      </Box>
      <Grid gap={1} columns={[1, 3, 3]} sx={{ justifyItems: 'center' }}>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: 'end',
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px'
          }}
        >
          <Text sx={{ variant: 'headings.h4' }}>For Makers</Text>
          <Text pb={3} sx={{ variant: 'text.paragraph' }}>
            Create a Projct and get donations out of the Giveth system.{' '}
            <Link to="/create" className="intextlink">
              Create your project
            </Link>{' '}
            and start raising funds.
          </Text>
          <Link to="/create">
            <Button sx={{ variant: 'buttons.default' }}>
              Create a project
            </Button>
          </Link>
        </Grid>
        <Box pb={5}>
          <img src={decoratorPuzzleguy} alt="" />
        </Box>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: 'start',
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px'
          }}
        >
          <Text sx={{ variant: 'headings.h4' }}>For Givers</Text>
          <Text sx={{ variant: 'text.paragraph' }}>
            Use our platform to give donations to a cause or a project. Easily
            donate to the{' '}
            <Link to="/causes" className="intextlink">
              Cause
            </Link>{' '}
            or Project you most care about.
          </Text>
          <Link to="/donate">
            <Button sx={{ variant: 'buttons.default' }}>
              Donate to a project
            </Button>
          </Link>
        </Grid>
      </Grid>
      {!isMobile ? (
        <Fragment>
          <img
            src={decoratorCloud1}
            alt=""
            sx={{
              position: 'absolute',
              top: '150px',
              left: '70px'
            }}
            className="semitransparent"
          />
          <img
            src={decoratorCloud2}
            alt=""
            sx={{
              position: 'absolute',
              top: '60px',
              left: '260px'
            }}
            className="semitransparent"
          />
          <img
            src={decoratorCloud2}
            alt=""
            sx={{
              position: 'absolute',
              top: '130px',
              right: '40px'
            }}
            className="semitransparent"
          />
          <img
            src={decoratorFizzysquare}
            alt=""
            sx={{
              position: 'absolute',
              top: '70vh',
              right: '40px'
            }}
          />
        </Fragment>
      ) : null}
    </Main>
  )
}

export default InfoSection
