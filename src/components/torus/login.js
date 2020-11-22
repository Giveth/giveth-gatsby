import React, { useContext, useState } from 'react'
import { TorusContext } from '../../contextProvider/torusProvider'
import { ProveWalletContext } from '../../contextProvider/proveWalletProvider'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

const Login = () => {
  const [checkedOnce, setCheckedOnce] = useState(false)
  const { isLoggedIn } = useContext(TorusContext)
  const { proveWallet, isWalletProved } = useContext(ProveWalletContext)

  if (!checkedOnce && isLoggedIn) {
    // Check to prove wallet only once
    if (!isWalletProved) {
      if (
        window.confirm(
          'To setup your wallet on our servers we need to validate your wallet, do you want to sign it now?'
        )
      ) {
        setCheckedOnce(true)
        proveWallet()
      } else {
        return setCheckedOnce(true)
      }
    }
  }

  if (!isLoggedIn) {
    return <LoginButton />
  } else {
    return <UserDetails />
  }
}
export default Login
