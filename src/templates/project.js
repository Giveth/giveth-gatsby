/** @jsx jsx */
import React from 'react'
import { Flex, Text, jsx } from 'theme-ui'
import Seo from '../components/seo'
import Layout from '../components/layout'
import { ProjectDonatorView } from '../components/project'
import { useWallet } from '../contextProvider/WalletProvider'

const ShowComponents = ({ pageContext }) => {
  const { user } = useWallet()
  const statusId = pageContext?.project?.status?.id
  const isAdmin = statusId === user?.id
  return (
    <>
      {/* {statusId && statusId !== '5' && !isAdmin ? (
        <Flex sx={{ justifyContent: 'center', pt: 5 }}>
          <Text variant='headings.h4' sx={{ color: 'secondary' }}>
            Project Not Available
          </Text>
        </Flex>
      ) : ( */}
      <ProjectDonatorView pageContext={{ project: pageContext?.project }} />
      {/* )} */}
    </>
  )
}

const Project = ({ pageContext }) => {
  return (
    <Layout>
      <Seo
        title={
          pageContext?.project?.title
            ? `Check out ${pageContext?.project?.title}`
            : 'Check out this project!'
        }
        image={pageContext?.project?.image}
      />
      <ShowComponents pageContext={pageContext} />
    </Layout>
  )
}

export default Project
