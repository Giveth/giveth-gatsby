import React, { useContext } from 'react'
import { TorusContext } from '../../contextProvider/torusProvider'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

const Login = () => {
  const { isLoggedIn } = useContext(TorusContext)
  if (!isLoggedIn) {
    return <LoginButton />
  } else {
    return <UserDetails />
  }
}
export default Login
