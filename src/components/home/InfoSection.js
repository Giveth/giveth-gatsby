/** @jsx jsx */
import { Link } from 'gatsby'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Text, jsx } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui/index'
import styled from '@emotion/styled'

// import graphics
import decoratorCloud1 from '../../images/decorator-cloud1.svg'
import decoratorCloud2 from '../../images/decorator-cloud2.svg'
import decoratorFizzysquare from '../../images/decorator-fizzy-square-rotated.svg'
import DecoratorAltruistic from '../../images/svg/general/decorators/a.svg'
import DecoratorDecentralized from '../../images/svg/general/decorators/b.svg'
import DecoratorCommunity from '../../images/svg/general/decorators/c.svg'
import decoratorPuzzleguy from '../../images/people-puzzle.svg'

const Main = styled(Grid)`
  position: relative;
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

const Decorator = styled.div`
  position: absolute;
`

const InfoSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 825px)' })
  return (
    <Main
      gap={2}
      rows={5}
      sx={{
        color: 'background',
        backgroundColor: 'secondary',
        alignItems: 'center',
        px: ['2rem', '8.75rem', '8.75rem'],
        pb: ['5rem', 0, 0],
        mb: ['2rem', 0, 0]
      }}
    >
      <Box
        sx={{
          justifySelf: 'center',
          textAlign: 'center',
          pt: '100px',
          px: [0, '14rem', '14rem'],
          color: 'background'
        }}
      >
        <Text pb={3} sx={{ variant: 'headings.h2', color: 'background' }}>
          What is Giveth?
        </Text>
        <Text
          pb={5}
          sx={{
            variant: 'text.large',
            color: 'background'
          }}
        >
          A Decentralized Altruistic Community using blockchain technology to
          make the world a better place.
        </Text>
        <a
          href='https://medium.com/giveth/the-future-of-giving-is-crowdfunding-the-commons-ac265e3010b8'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            sx={{
              variant: 'buttons.nofillGray',
              color: 'bodyLight',
              fontSize: 14,
              background: 'unset',
              px: '3rem',
              py: '0.875rem',
              mb: '6rem'
            }}
          >
            Read our story on the future of giving
          </Button>
        </a>
      </Box>
      <Grid
        columns={[1, 3, 3]}
        sx={{ justifyItems: 'center', textAlign: 'center' }}
      >
        <Box sx={{ maxWidth: '320px' }}>
          <DecoratorAltruistic />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            Altruistic
          </Text>
          <Text
            sx={{
              variant: 'text.paragraph',
              color: 'background'
            }}
          >
            We build tools for the common good and support others in doing so as
            well. On the Giveth DApp, 100% of the funds donated go to the cause
            the donor intended to support.
          </Text>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <DecoratorDecentralized />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            Decentralized
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            We are an open, non-hierarchical global initiative - empowering
            communities with novel decentralized technologies to address their
            collective needs.{' '}
          </Text>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <DecoratorCommunity />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            Community
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            We build tools that can create strong bonds and alignment for people
            and the planet. We see donations as an opportunity to connect Givers
            to the people on the ground doing the good work.
          </Text>
        </Box>
      </Grid>
      <Box pt={4} pb={6} sx={{ justifySelf: 'center', textAlign: 'center' }}>
        <a
          href='https://giveth.io/join'
          target='_blank'
          rel='noopener noreferrer'
        >
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
        <Text pb={3} sx={{ variant: 'headings.h2', color: 'background' }}>
          How it works
        </Text>
        <Text
          pb={5}
          sx={{ variant: 'text.large', maxWidth: '580px', color: 'background' }}
        >
          Our system connects the people on the ground directly to the Givers,
          and provides a level of transparency and accountability no other
          platform can offer.
        </Text>
      </Box>
      <Grid gap={1} columns={[1, 3, 3]} sx={{ justifyItems: 'center' }}>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: ['center', 'end', 'end'],
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px',
            maxHeight: '400px'
          }}
        >
          <Text sx={{ variant: 'headings.h4', color: 'background' }}>
            For Makers
          </Text>
          <Text pb={3} sx={{ variant: 'text.paragraph', color: 'background' }}>
            Create a Project and get donations in crypto.{' '}
            <Link to='/create' className='intextlink'>
              Create your project
            </Link>{' '}
            and start raising funds.
          </Text>
          <Link to='/create'>
            <Button
              sx={{ variant: 'buttons.default', fontSize: 2, mt: '1.5rem' }}
            >
              Create a project
            </Button>
          </Link>
        </Grid>
        <Box sx={{ position: 'relative', bottom: '-12px' }}>
          {isMobile ? (
            <div sx={{ height: '20px' }} />
          ) : (
            <img src={decoratorPuzzleguy} alt='' />
          )}
        </Box>
        <Grid
          p={2}
          rows={3}
          sx={{
            justifySelf: ['center', 'start', 'start'],
            alignContent: 'start',
            textAlign: 'center',
            maxWidth: '360px'
          }}
        >
          <Text sx={{ variant: 'headings.h4', color: 'background' }}>
            For Givers
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            Use our platform to give donations to a cause or a project. Easily
            donate to the{' '}
            <Link to='/projects' className='intextlink'>
              project
            </Link>{' '}
            you most care about.
          </Text>
          <Link to='/projects'>
            <Button
              sx={{ variant: 'buttons.default', fontSize: 2, mt: '1.5rem' }}
            >
              Donate to a project
            </Button>
          </Link>
        </Grid>
      </Grid>
      {!isMobile ? (
        <Decorator>
          <img
            src={decoratorCloud1}
            alt=''
            sx={{
              position: 'absolute',
              top: '150px',
              left: '70px'
            }}
            className='semitransparent'
          />
          <img
            src={decoratorCloud2}
            alt=''
            sx={{
              position: 'absolute',
              top: '60px',
              left: '260px'
            }}
            className='semitransparent'
          />
          <img
            src={decoratorCloud2}
            alt=''
            sx={{
              position: 'absolute',
              top: '130px',
              right: '40px'
            }}
            className='semitransparent'
          />
          <img
            src={decoratorFizzysquare}
            alt=''
            sx={{
              position: 'relative',
              top: '710px',
              right: '-90vw'
            }}
          />
        </Decorator>
      ) : null}
    </Main>
  )
}

export default InfoSection
