/** @jsx jsx */
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import { Grid, Box, Button, Image, Text, jsx } from 'theme-ui'
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

const InfoSection = ({ content }) => {
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
          {content.infoHead}
        </Text>
        <Text
          pb={5}
          sx={{
            variant: 'text.large',
            color: 'background'
          }}
        >
          {content.infoSubtitle}
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
            {content.infoButtonText}
          </Button>
        </a>
      </Box>
      <Grid
        columns={[1, 3, 3]}
        sx={{ justifyItems: 'center', textAlign: 'center' }}
      >
        <Box sx={{ maxWidth: '320px' }}>
          <DecoratorDecentralized />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            {content.feature2}
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            {content.feature2Text}
          </Text>
        </Box>
        <Box sx={{ maxWidth: '320px' }}>
          <DecoratorAltruistic />
          <Text
            sx={{
              variant: 'headings.h4',
              color: 'background',
              py: '1.5rem'
            }}
          >
            {content.feature1}
          </Text>
          <Text
            sx={{
              variant: 'text.paragraph',
              color: 'background'
            }}
          >
            {content.feature1Text}
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
            {content.feature3}
          </Text>
          <Text sx={{ variant: 'text.paragraph', color: 'background' }}>
            {content.feature3Text}
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
            {content.featureCta}
          </Button>
        </a>
      </Box>
      <Box sx={{ justifySelf: 'center', textAlign: 'center' }}>
        <Text pb={3} sx={{ variant: 'headings.h2', color: 'background' }}>
          {content.infoHead2}
        </Text>
        <Text
          pb={5}
          sx={{ variant: 'text.large', maxWidth: '580px', color: 'background' }}
        >
          {content.infoSubtitle2}
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
            {content.userType1Title}
          </Text>
          <Text pb={3} sx={{ variant: 'text.paragraph', color: 'background' }}>
            Create a project and get donations in crypto.{' '}
            <Link href='/create' className='intextlink'>
              Create your project
            </Link>{' '}
            and start raising funds.
          </Text>
          <Link href='/create'>
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
            <Image src={decoratorPuzzleguy} alt='' />
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
            <Link href='/projects' className='intextlink'>
              project
            </Link>{' '}
            you most care about.
          </Text>
          <Link href='/projects'>
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
