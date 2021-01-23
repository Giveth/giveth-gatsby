import React, { useContext } from 'react'
import { Heading, Box, Card, Flex, Button, Text } from 'theme-ui'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'

import theme from '../gatsby-plugin-theme-ui/index'
// import Donate from '../components/donateForm'

// import iconShare from '../images/icon-share.svg'
// import iconHeart from '../images/icon-heart.svg'
// import { TorusContext } from '../contextProvider/torusProvider'

import ProjectImageGallery1 from '../images/svg/create/projectImageGallery1.svg'
import ProjectImageGallery2 from '../images/svg/create/projectImageGallery2.svg'
import ProjectImageGallery3 from '../images/svg/create/projectImageGallery3.svg'
import ProjectImageGallery4 from '../images/svg/create/projectImageGallery4.svg'

const CardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  width: 100%;
`

const ProjectCard = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  min-height: 400px;
  border-radius: 12px;
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 0.5rem 1rem;
`

const Badge = styled.span`
  padding: 3px 11.76px;
  margin: 0.2rem;
  align-items: center;
  border: 1px solid ${theme.colors.bodyLight};
  border-radius: 48px;
  color: ${theme.colors.bodyLight};
`

const Dot = styled.span`
  display: grid;
  height: 68px;
  width: 68px;
  color: ${theme.colors.background};
  border: 6px solid ${theme.colors.background};
  border-radius: 50%;
  margin: -10% 0 0 24px;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 10px;
`

const DotInner = styled.span`
  text-align: center;
  align-self: center;
`

const AltCardContent = styled.span`
  position: absolute;
  bottom: 0;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`

// const Options = styled.span`
//   font-family: 'Red Hat Text', sans-serif;
//   color: ${theme.colors.background};
//   display: flex;
//   position: absolute;
//   align-items: center;
//   bottom: -54px;
//   right: 24px;
// `

const CardFooter = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem 0.5rem;
`

const Categories = ({ categories }) => {
  return categories.length
    ? categories.map((category, index) => {
        if (!category) return null
        return (
          <Badge key={index}>
            <Text
              sx={{
                variant: 'text.default',
                fontSize: '10px',
                color: 'bodyLight',
                fontWeight: '500',
                textTransform: 'uppercase'
              }}
            >
              {category?.name}
            </Text>
          </Badge>
        )
      })
    : null
}

const ProjectListing = props => {
  // const { balance } = useContext(TorusContext)
  const [hoverStyle, setHoverStyle] = React.useState(false)
  return (
    <Box
      key={props.listingId + '_box'}
      style={{
        width: '100%',
        flexDirection: 'row'
      }}
      onMouseOver={() => setHoverStyle(true)}
      onMouseLeave={() => setHoverStyle(false)}
    >
      <CardContainer>
        <ProjectCard
          key={props.listingId + '_card'}
          onClick={() => {
            if (hoverStyle) return
            !props.disabled &&
              (props?.action
                ? props.action()
                : navigate(`/donate/${props?.id}`))
          }}
          style={{
            cursor: props.disabled || hoverStyle ? 'default' : 'pointer',
            border: props.disabled ? null : `1px solid ${theme.colors.muted}`,
            boxShadow:
              props.shadowed || hoverStyle
                ? '0px 28px 52px rgba(44, 13, 83, 0.2)'
                : null
          }}
        >
          {/* need to add options from the gallery. */}
          <div key={props.listingId + '_div'}>
            <div
              src={props.image}
              style={{
                width: '100%',
                height: '186px',
                borderRadius: '12px 12px 0px 0px',
                backgroundImage: /^\d+$/.test(props.image)
                  ? `url('/assets/create/projectImageGallery${props.image.toString()}.svg')`
                  : `url(${props.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              alt={props.name}
              onError={ev =>
                (ev.target.src =
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17JlsfL6JrGYQ2Ze5ptTTuawx5J4axpWkIw&usqp=CAU')
              }
            />

            <Dot
              key={props.listingId + '_card'}
              style={{
                backgroundColor:
                  props.raised === 0
                    ? theme.colors.attention
                    : theme.colors.secondary
              }}
            >
              {props.raised === 0 ? (
                <DotInner>
                  <Text
                    sx={{
                      variant: 'text.overlineSmall',
                      color: 'background'
                    }}
                  >
                    NEW
                  </Text>
                </DotInner>
              ) : (
                <DotInner>
                  {/* <Text sx={{ variant: 'text.overlineSmall', color: 'background' }}>
                    RAISED
                  </Text>
                  <Text sx={{ variant: 'text.microbold', color: 'white' }}>
                    ${props?.raised}
                  </Text> */}
                  <Text
                    sx={{
                      variant: 'text.overlineSmall',
                      color: 'background'
                    }}
                  >
                    ACTIVE
                  </Text>
                </DotInner>
              )}
            </Dot>
            {/* <Options>
            <IconButton>
              <img src={iconHeart} alt='' />
            </IconButton>
            <IconButton>
              <img src={iconShare} alt='' />
            </IconButton>
          </Options> */}
          </div>
          <Heading
            sx={{ variant: 'headings.h6' }}
            style={{
              padding: '1rem 1rem 0 1rem',
              width: '260',
              height: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme.colors.secondary
            }}
            key={props.listingId + '_heading'}
          >
            {props?.name}
            <Text
              sx={{ variant: 'text.default' }}
              style={{
                color: theme.colors.primary,
                alignSelf: 'center',
                minHeight: '28px',
                lineHeight: '150%',
                paddingTop: '4px'
              }}
            >
              {/* {props?.description} */}
            </Text>
          </Heading>
          {props?.withEditHover && hoverStyle && (
            <AltCardContent>
              <Button
                sx={{
                  variant: 'buttons.nofill',
                  backgroundColor: 'secondary',
                  color: 'background',
                  mt: 2
                }}
                onClick={() => {
                  props?.action()
                }}
              >
                EDIT
              </Button>
              <Text
                sx={{
                  variant: 'text.default',
                  my: 2,
                  mx: 'auto',
                  cursor: 'pointer',
                  color: 'primary'
                }}
                onClick={() => {
                  !props.disabled && navigate(`/project/${props?.slug}`)
                }}
              >
                Learn more{' '}
              </Text>
            </AltCardContent>
          )}
          <CardContent>
            <Text
              sx={{ variant: 'text.default' }}
              style={{
                fontSize: '16px',
                color: theme.colors.bodyDark,
                // textOverflow: 'ellipsis',
                // wordWrap: 'break-word',
                // whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxHeight: '6rem',
                lineHeight: '1.2rem',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {
                /* Description String */

                props?.description
              }
            </Text>
          </CardContent>
          {props?.categories && props.categories.length > 0 && (
            <CardFooter>
              <Categories categories={props?.categories} />
            </CardFooter>
          )}
        </ProjectCard>
        {
          // <Donate
          //   maxAmount={balance}
          //   doDonate={values => alert('donating' + values.amount)}
          // />
        }
      </CardContainer>
    </Box>
  )
}

export default ProjectListing
