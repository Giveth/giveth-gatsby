import React, { useContext, useEffect, useState } from 'react'
import * as Auth from '../services/auth'
import { client } from '../apollo/client'
import { DO_LOGIN, VALIDATE_TOKEN } from '../apollo/gql/auth'

export async function getToken (user, signedMessage) {
  console.log('In getToken')

  if (signedMessage) {
    // const loginResponse = await doLogin({
    //   variables: {
    //     walletAddress: user?.addresses[0],
    //     signature: signedMessage,
    //     email: user?.email,
    //     avatar: user?.profileImage,
    //     name: user?.name,
    //     hostname: window.location.hostname
    //   }
    // })
    try {
      const { data } = await client.mutate({
        mutation: DO_LOGIN,
        variables: {
          walletAddress: user?.addresses[0],
          signature: signedMessage,
          email: user?.email,
          avatar: user?.profileImage,
          name: user?.name,
          hostname: window.location.hostname
        }
      })

      console.log(`get toke response data : ${JSON.stringify(data, null, 2)}`)

      const token = data?.loginWallet?.token
      const userIDFromDB = data?.loginWallet?.user?.id
      console.log(
        `{ token, userIDFromDB } : ${JSON.stringify(
          { token, userIDFromDB },
          null,
          2
        )}`
      )

      if (!userIDFromDB) throw new Error('No userId returned from the database')
      return {
        userIDFromDB,
        token
      }
    } catch (error) {
      console.log('Error in token login', error)
      throw new Error(error)
    }
  }
}
