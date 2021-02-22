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
    createPage({
      path: '/donate',
      matchPath: '/donate/:id',
      component: require.resolve('./src/pages/donate.js')
    })
  }
  if (page.path.match(/^\/project/)) {
    createPage({
      path: '/project',
      matchPath: '/project/:id',
      component: require.resolve('./src/pages/project.js')
    })
  }
  if (page.path.match(/^\/user/)) {
    createPage({
      path: '/user',
      matchPath: '/user/:address',
      component: require.resolve('./src/pages/user.js')
    })
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
  const { createRedirect, createPage } = actions

  createRedirect({
    fromPath: '/donate',
    toPath: `/donate/${process.env.GATSBY_SITE_ID}`,
    redirectInBrowser: true,
    isPermanent: true
  })

  createRedirect({
    fromPath: '/project',
    toPath: `/project/${process.env.GATSBY_SITE_ID}`,
    redirectInBrowser: true,
    isPermanent: true
  })

  // Mateo: This is being done on the client for now, not generated on the server.
  // const projectResults = await graphql(`
  //   query {
  //     giveth {
  //       projects {
  //         id
  //         title
  //         description
  //         slug
  //         creationDate
  //         admin
  //         image
  //         walletAddress
  //         categories {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `)
  // const projectPageTemplate = require.resolve('./src/templates/project.js')
  // if (projectResults.data) {
  //   projectResults.data.giveth.projects.forEach(project => {
  //     createPage({
  //       path: `/project/${project.slug}`,
  //       component: projectPageTemplate,
  //       context: {
  //         // entire project is passed down as context
  //         project: project
  //       }
  //     })
  //   })
  // }
}

exports.onCreateNode = ({ node }) => {
  if (node.internal.type === `File`) {
    // console.log(node)
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\@toruslabs\/torus-embed/,
            use: loaders.null()
          },
          {
            test: /web3/,
            use: loaders.null()
          },
          {
            test: /\@sentry\/gatsby/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
