import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export const useMediumFeed = () => {
  const  mediumData = useStaticQuery(graphql`
    query MediumQuery {
      allMediumPost(limit: 2, sort: {fields: createdAt, order: DESC}) {
        edges {
          node {
            id
            title
            mediumUrl
            content {
              subtitle
            }
          }
        }
      }
    }
  `)

  return mediumData
}
