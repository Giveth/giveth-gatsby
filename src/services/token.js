import React, { useContext, useEffect, useState } from 'react'
import * as Auth from '../services/auth'
import { client } from '../apollo/client'
import { DO_LOGIN, VALIDATE_TOKEN } from '../apollo/gql/auth'
import Web3 from 'web3'

export async function getToken (user, signedMessage) {
  if (signedMessage) {
    try {
      const { data } = await client.mutate({
        mutation: DO_LOGIN,
        variables: {
          walletAddress: Web3.utils.toChecksumAddress(user?.getWalletAddress()),
          signature: signedMessage,
          email: user?.email,
          avatar: user?.profileImage,
          name: user?.name,
          hostname: window.location.hostname
        }
      })

      const token = data?.loginWallet?.token
      const userIDFromDB = data?.loginWallet?.user?.id

      if (!userIDFromDB) throw new Error('No userId returned from the database')
      return {
        data: {
          userIDFromDB,
          profile: data?.loginWallet?.user
        },
        token
      }
    } catch (error) {
      console.log('Error in token login', error)
      throw new Error(error)
    }
  }
}
