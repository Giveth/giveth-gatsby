/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
var slugify = require('slugify')

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/donate/)) {
    page.matchPath = '/donate/:projectId'

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
        }
      }
    }
  `)
  const projectPageTemplate = require.resolve('./src/templates/project.js')
  projectResults.data.giveth.projects.forEach(project => {
    console.log(
      'theproject ====>',
      project.title,
      'theslug===>',
      slugify(project.title)
    )

    createPage({
      path: `/projects/${slugify(project.title)}`,
      component: projectPageTemplate,
      context: {
        // entire project is passed down as context
        project: project
      }
    })
  })
}
