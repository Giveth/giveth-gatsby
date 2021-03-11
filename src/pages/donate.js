/** @jsx jsx */
import React from 'react'
import { Grid, Spinner, Text, jsx } from 'theme-ui'
import styled from '@emotion/styled'
import Seo from '../components/seo'
import { useQuery } from '@apollo/client'
import Layout from '../components/layout'
import DonationIndex from '../components/donate'
import { FETCH_PROJECT_BY_SLUG } from '../apollo/gql/projects'

const Content = styled(Grid)`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`
const ProjectNotFound = () => {
  return <Text>Project Not Found</Text>
}

const Donate = props => {
  const { id } = props
  const { loading, error, data } = useQuery(FETCH_PROJECT_BY_SLUG, {
    variables: { slug: id }
  })

  return (
    <Layout asDialog>
      <Seo
        title={
          data?.projectBySlug?.title
            ? `Make a donation to ${data?.projectBySlug?.title}!`
            : 'Make a donation today!'
        }
        image={data?.projectBySlug?.image}
      />
      <Content style={{ justifyItems: 'center' }}>
        {error ? (
          <Text sx={{ color: 'background' }}>Error</Text>
        ) : loading ? (
          <Spinner variant='spinner.medium' />
        ) : data?.projectBySlug ? (
          <DonationIndex {...props} project={data.projectBySlug} />
        ) : (
          <ProjectNotFound />
        )}
      </Content>
    </Layout>
  )
}

export default Donate
