/** @jsx jsx */
import { jsx, Flex, Box } from 'theme-ui'
import React from 'react'
import AccountTop from '../../components/account/AccountTop'
import AccountNav from '../../components/account/AccountNavSimple'
// import AccountBody from '../../components/account/AccountBody'
import Layout from '../../components/layout'
// import MyProjects from '../../components/account/myProjects'
// import { FETCH_USER_PROJECTS } from '../../apollo/gql/projects'
import { useWallet } from '../../contextProvider/WalletProvider'
// import { useQuery } from '@apollo/client'

const ProjectListing = props => {
  const { user, isLoggedIn } = useWallet()
  console.log(user, isLoggedIn)
  // console.log(`user in ProjectListing : ${JSON.stringify(user, null, 2)}`)
  console.log(`user in ProjectListing :`)

  //Render
  // const { data: userProjects } = useQuery(FETCH_USER_PROJECTS, {
  //   variables: { admin: parseFloat(1 || -1) }
  // })
  // const projectsList = userProjects?.projects
  return null
  // return <MyProjects projects={[]} />
}
const AccountPage = props => {
  return (
    <React.Fragment>
      <Layout noHeader>
        <AccountTop />
        <Flex
          sx={{
            mx: '5%',
            fontFamily: 'heading',
            flexDirection: ['column', 'row', 'row']
          }}
        >
          <AccountNav
            query={{ view: 'projects', data: 'all' }}
            userDonationsCount={5}
            projectsListCount={3}
          />
          <Box
            sx={{
              width: ['100%', null, '70%'],
              mt: ['100px', '140px', '140px']
            }}
          >
            <ProjectListing />
          </Box>
          {/* <AccountBody
          projectsList={projectsList}
          setQuery={setQuery}
          query={query}
          isSSR={isSSR}
          userDonations={userDonations}
          projectsList={projectsList}
        /> */}
        </Flex>
      </Layout>
    </React.Fragment>
  )
}

export default AccountPage
