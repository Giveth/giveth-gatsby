import React, { useContext, useEffect, useState } from 'react'
import * as Auth from '../services/auth'
import { TorusContext } from './torusProvider'
import { useMutation } from '@apollo/react-hooks'
import { DO_LOGIN } from '../apollo/gql/auth'

const proveWalletContext = React.createContext({})

const ProveWalletProvider = props => {
  const { user, isLoggedIn, signMessage } = useContext(TorusContext)
  const [doLogin] = useMutation(DO_LOGIN)
  const [isWalletProved, setIsWalletProved] = useState(
    isLoggedIn && !!localStorage.getItem('token')
  )

  useEffect(() => {
    setIsWalletProved(isLoggedIn && !!localStorage.getItem('token'))
  }, [isLoggedIn])

  const proveWallet = async () => {
    console.log(
      'proveWallet:',
      isLoggedIn && !localStorage.getItem('token'),
      user
    )
    if (isLoggedIn && !localStorage.getItem('token')) {
      const signedMessage = await signMessage('our_secret')
      if (signMessage) {
        try {
          const loginResponse = await doLogin({
            variables: {
              walletAddress: user?.addresses[0],
              signature: signedMessage,
              email: user?.email,
              avatar: user?.profileImage,
              name: user?.name
            }
          })

          console.log(
            `didlogin - loginResponse ---> : ${JSON.stringify(
              loginResponse,
              null,
              2
            )}`
          )
          const token = loginResponse?.data?.loginWallet?.token
          const userIDFromDB = loginResponse?.data?.loginWallet?.user?.id
          console.log({ token, userIDFromDB })
          if (token) localStorage.setItem('token', token)
          if (userIDFromDB) Auth.setUser({ ...user, userIDFromDB })
        } catch (error) {
          console.error(`error1  : ${JSON.stringify(error, null, 2)}`)
        }

        setIsWalletProved(!!localStorage.getItem('token'))
      }
    }
  }

  return (
    <proveWalletContext.Provider
      value={{
        proveWallet,
        isWalletProved
      }}
    >
      {props.children}
    </proveWalletContext.Provider>
  )
}

export const ProveWalletContext = proveWalletContext
export default ProveWalletProvider
