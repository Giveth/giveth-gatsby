import React from 'react'
import AccountIndex from '../components/account'
import Seo from '../components/seo'
import Layout from '../components/layout'

const AccountPage = props => {
  return (
    <Layout noHeader>
      <Seo />
      <AccountIndex />
    </Layout>
  )
}

export default AccountPage
