import React, { useContext, useState, useEffect } from 'react'
import { useWallet } from '../../contextProvider/WalletProvider'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

const Login = () => {
  const { isLoggedIn } = useWallet()

  if (!isLoggedIn) {
    return <LoginButton />
  } else {
    return <UserDetails />
  }
}
export default Login
