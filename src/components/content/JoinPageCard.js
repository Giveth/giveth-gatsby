import React from 'react'
import { Heading, Grid, Button, Card, Text } from 'theme-ui'
import Link from 'next/link'
import styled from '@emotion/styled'

import theme from '../../utils/theme-ui/index'

const CardContainer = styled(Card)`
  background-color: ${theme.colors.background};
  margin-bottom: 30px;
  border-radius: 12px;
  max-width: 550px;
  overflow: hidden;
  position: relative;
`

const CardContent = styled.span`
  display: flex;
  flex: 1;
  word-wrap: break-word;
  padding: 2rem 1rem;
  position: relative;
`

const Background = styled.img`
  opacity: 0.1;
  background: none;
  position: absolute;
  right: -3rem;
  top: 3rem;
`

const Logo = styled.img`
  align-self: center;
  justify-self: center;
  margin: 2rem;
`

const JoinChatCard = ({ data }) => (
  <>
    {data?.map(join => {
      return (
        <CardContainer key={join.platformLogo.sys.id + '_card'}>
          <Background
            key={join.platformLogo.sys.id + '_div'}
            src={join.cardBackgroundImage.fields.file.url}
            style={{ width: '70%' }}
            alt=''
          />
          <Grid columns={[2, '1fr auto']}>
            <div>
              <Heading
                sx={{ variant: 'headings.h6' }}
                style={{
                  padding: '2.5rem 1rem 0 1rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: theme.colors.secondary,
                  background: 'none',
                  position: 'relative'
                }}
                key={join.platformLogo.sys.id + '_heading'}
              >
                {join.platformTitle}
              </Heading>

              <CardContent>
                <Text
                  sx={{ variant: 'text.default' }}
                  style={{
                    fontSize: '16px',
                    color: theme.colors.bodyDark,
                    lineHeight: '1.2rem',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {
                    /* Description String */

                    join.descriptionText
                  }
                </Text>
              </CardContent>
              <Link href={join.onboardingLink}>
                <Button
                  mt={2}
                  mb={'2rem'}
                  ml={'1rem'}
                  sx={{
                    variant: 'buttons.default'
                  }}
                  style={{
                    alignSelf: 'center',
                    minHeight: '28px',
                    lineHeight: '150%',
                    position: 'relative'
                  }}
                >
                  Join us on {join.platformTitle}
                </Button>
              </Link>
            </div>
            <Logo
              src={join.platformLogo.fields.file.url}
              alt={join.platformTitle + ' logo'}
              width='90px'
            />
          </Grid>
        </CardContainer>
      )
    })}
  </>
)

export default JoinChatCard
