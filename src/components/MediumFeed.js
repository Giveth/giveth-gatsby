import { useStaticQuery, graphql } from 'gatsby'

export const useMediumFeed = () => {
  const mediumData = useStaticQuery(graphql`
    query MediumQuery {
      allMediumPost(limit: 2, sort: { fields: createdAt, order: DESC }) {
        edges {
          node {
            id
            createdAt
            title
            previewContent {
              subtitle
            }
            author {
              name
            }
            virtuals {
              readingTime
            }
            uniqueSlug
          }
        }
      }
    }
  `)

  return mediumData
}
