import React from 'react'
import { Container, NavLink, Text } from 'theme-ui'
import styled from '@emotion/styled'
import theme from '../gatsby-plugin-theme-ui/index'

import LeftArrow from '../images/svg/general/left-arrow.svg'
import Confetti from '../images/svg/donation/confetti.svg'

import decoratorClouds from '../images/decorator-clouds.svg'

const Main = styled.main`
  padding: 4.063rem 4.5rem 0 4.5rem;
  display: flex;
  justify-content: center;
`

const DialogContainer = styled(Container)`
  min-height: 100vh;
`

const Clouds = styled.img`
  position: absolute;
  right: 0;
`
const LeftConfetti = styled(Confetti)`
  position: absolute;
  left: 3.875rem;
  top: 8.875rem;
  @media (max-width: 1100px) {
    left: auto;
    top: 9rem;
    right: 0.99rem;
  }
`

const BackButton = styled(NavLink)`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 7rem;
  position: absolute;
  left: 4.875rem;
  top: 4.875rem;
  @media (max-width: 600px) {
    left: 2rem;
  }
`

const DialogContent = styled.div`
  margin: 3.813rem 0 0 0;
`

export default function Dialog({ children }) {
  return (
    <DialogContainer p={4} color='white' bg={theme.colors.secondary}>
      <LeftConfetti />
      <Clouds src={decoratorClouds} alt='' className='hide' />
      <BackButton href='/'>
        <LeftArrow />
        <Text
          sx={{ variant: 'text.default' }}
          style={{
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
            paddingLeft: '17px'
          }}
        >
          Giveth
        </Text>
      </BackButton>
      <Main>
        <DialogContent>{children}</DialogContent>
      </Main>
    </DialogContainer>
  )
}
