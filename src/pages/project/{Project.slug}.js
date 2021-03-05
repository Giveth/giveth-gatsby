/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { jsx, Flex, Spinner } from 'theme-ui'
import { graphql } from 'gatsby'
import { FETCH_PROJECT_BY_SLUG } from '../../apollo/gql/projects'
import { ProjectDonatorView } from '../../components/project'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const Project = props => {
  const { project } = props.data

  return (
    <Layout>
      <Seo
        title={
          project?.title
            ? `Check out ${project?.title}`
            : 'Check out this project!'
        }
        image={project?.image}
      />
      <ProjectDonatorView pageContext={{ project }} />
    </Layout>
  )
}

export default Project

export const query = graphql`
  {
    project {
      id
      title
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      categories {
        name
      }
      donations {
        transactionId
        toWalletAddress
        fromWalletAddress
        anonymous
        amount
        valueUsd
        user {
          id
          firstName
          lastName
          avatar
        }
        project {
          title
        }
        createdAt
        currency
      }
    }
  }
`
