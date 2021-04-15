/** @jsx jsx */
import { useWallet } from '../../contextProvider/WalletProvider'
import { Text, jsx } from 'theme-ui'
import { wallets } from '../../wallets'
import LoginModal from './loginModal'
import { useState } from 'react'

const LoginButton = props => {
  const [showOptions, setShowOptions] = useState(false)
  const [isComponentVisible, setIsComponentVisible] = useState(false)

  // const {
  //   ref,
  //   isComponentVisible,
  //   setIsComponentVisible
  // } = useComponentVisible(false)
  const { login, ethEnabled } = useWallet()
  return (
    <div>
      <Text
        p='10px'
        sx={{ variant: 'text.medium', color: 'primary', cursor: 'pointer' }}
        onClick={() =>
          ethEnabled
            ? setIsComponentVisible(!isComponentVisible)
            : login({ walletProvider: 'torus' })
        }
      >
        Sign in
      </Text>
      {
        // <AccountDetails>
        // Object.keys(wallets).map((walletProvider, index) => {
        //   return (
        //     <MenuTitle
        //       key={index}
        //       sx={{
        //         variant: 'text.medium',
        //         textTransform: 'capitalize',
        //         ':hover': {
        //           color: 'primary'
        //         }
        //       }}
        //       className='shadow boxheight'
        //       onClick={() => login({ walletProvider })}
        //     >
        //       {walletProvider}
        //     </MenuTitle>
        //   )
        // })
        // </AccountDetails>
      }
      {isComponentVisible && wallets ? (
        <LoginModal
          close={() => setIsComponentVisible(false)}
          isOpen={isComponentVisible}
        />
      ) : null}
    </div>
  )
}

export default LoginButton
