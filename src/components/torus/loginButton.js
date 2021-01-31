/** @jsx jsx */
import styled from '@emotion/styled'
import { useWallet } from '../../contextProvider/WalletProvider'
import { Text, jsx } from 'theme-ui'
import { wallets } from '../../wallets'
import useComponentVisible from '../../utils/useComponentVisible'
import theme from '../../gatsby-plugin-theme-ui/index'
import { useState, useContext } from 'react'

const AccountDetails = styled.div`
  width: 200px;
  position: absolute;
  padding: 5px 0;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.background};
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(107, 117, 167, 0.3);
  border-radius: 6px;
  z-index: 205;
  right: 0px;
  top: 60px;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-gap: 0px 1rem;
  .shadow {
    box-shadow: 0px 1px 0px #f5f5f5;
  }
  .boxheight {
    display: flex;
    align-self: center;
    padding-top: 11px;
    padding-bottom: 11px;
  }
`

const MenuTitle = styled(Text)`
  align-self: center;
  padding-left: 16px;
  align-content: center;
  cursor: pointer;
  color: ${theme.colors.secondary};
`

const Container = styled.div`
  width: 70px;
  height: 48px;
  display: grid;
  place-content: center;
`

const LoginButton = props => {
  const [showOptions, setShowOptions] = useState(false)
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const { login } = useWallet()
  return (
    <Container ref={ref}>
      <Text
        p='10px'
        sx={{ variant: 'text.medium', color: 'primary', cursor: 'pointer' }}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        Sign in
      </Text>
      {isComponentVisible && wallets && (
        <AccountDetails>
          {Object.keys(wallets).map((walletProvider, index) => {
            return (
              <MenuTitle
                key={index}
                sx={{
                  variant: 'text.medium',
                  textTransform: 'capitalize',
                  ':hover': {
                    color: 'primary'
                  }
                }}
                className='shadow boxheight'
                onClick={() => login({ walletProvider })}
              >
                {walletProvider}
              </MenuTitle>
            )
          })}
        </AccountDetails>
      )}
    </Container>
  )
}

export default LoginButton
