/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/donate/)) {
    page.matchPath = '/donate/*'
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/project/)) {
    page.matchPath = '/project/:id'
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\//)) {
    page.context = {
      site: process.env.GATSBY_SITE_ID + '-home'
    }
    // Update the page.
    createPage(page)
  }
  if (page.path.match(/^\/projects/)) {
    page.matchPath = '/projects/*'
    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectResults = await graphql(`
    query {
      giveth {
        projects {
          id
          title
          description
          slug
          creationDate
          admin
          image
          walletAddress
          categories {
            name
          }
        }
      }
    }
  `)
  const projectPageTemplate = require.resolve('./src/templates/project.js')
  if (projectResults.data) {
    projectResults.data.giveth.projects.forEach(project => {
      createPage({
        path: `/project/${project.slug}`,
        component: projectPageTemplate,
        context: {
          // entire project is passed down as context
          project: project
        }
      })
    })
  }
}

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `File`) {
    // console.log(node)
  }
}
