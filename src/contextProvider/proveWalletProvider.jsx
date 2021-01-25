import React, { useContext, useEffect, useState } from 'react'
import * as Auth from '../services/auth'
import { TorusContext } from './torusProvider'
import { useMutation } from '@apollo/client'
import { DO_LOGIN, VALIDATE_TOKEN } from '../apollo/gql/auth'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'

const proveWalletContext = React.createContext({})

const ProveWalletProvider = props => {
  const { user, isLoggedIn, signMessage } = useContext(TorusContext)
  const [doLogin] = useMutation(DO_LOGIN)
  const [validateToken] = useMutation(VALIDATE_TOKEN)
  const [isWalletProved, setIsWalletProved] = useState(
    isLoggedIn && !!localStorage.getItem('token')
  )

  useEffect(() => {
    setIsWalletProved(isLoggedIn && !!localStorage.getItem('token'))
  }, [isLoggedIn])

  const proveWallet = async () => {
    console.log(`In proveWallet -> isWalletProved is  ---> : ${isWalletProved}`)
    const token = localStorage.getItem('token')
    console.log('ProveWallet:', isLoggedIn && !token, user)

    console.log('isLoggedIn', isLoggedIn)
    if (isLoggedIn) {
      console.log('token', token)

      try {
        let fetchToken = true
        if (token) {
          console.log('Do Validate token ')
          const isValid = await validateToken()
          if (isValid) {
            console.log('Token is valid', token)
            fetchToken = false
          }
        }

        console.log(`do fetchToken ---> : ${fetchToken}`)
        if (fetchToken) {
          console.log(`Do signedMessage ---> : ${signedMessage}`)
          const signedMessage = await signMessage('our_secret')
          console.log(`Did signedMessage ---> : ${signedMessage}`)
          if (signMessage) {
            const loginResponse = await doLogin({
              variables: {
                walletAddress: user?.addresses[0],
                signature: signedMessage,
                email: user?.email,
                avatar: user?.profileImage,
                name: user?.name,
                hostname: window.location.hostname
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
            if (userIDFromDB) Auth.setUser({ ...user, userIDFromDB })
          }
        }
        localStorage.setItem('token', token)

        setIsWalletProved(!!token)
      } catch (error) {
        console.error(
          `Error while proving wallet : ${JSON.stringify(error, null, 2)}`
        )
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
