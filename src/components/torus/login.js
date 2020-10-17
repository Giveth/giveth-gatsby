import React, { useContext } from 'react'
import { TorusContext } from '../../contextProvider/torusProvider'
import LoginButton from './loginButton'
import UserDetails from './userDetails'

const Login = props => {
  const { isLoggedIn, login, logout, user, balance } = useContext(TorusContext)
  if (!isLoggedIn) {
    return <LoginButton login={login} />
  } else {
    return <UserDetails logout={logout} user={user} balance={balance} />
  }
}
export default Login
