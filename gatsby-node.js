/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// IMPORTANT
// Using the [ bracket ] syntax over the project folder indicates
// that those pages will be rendered exclusively client side,
// so it makes no sense to do this at build time.

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const projectResults = await graphql(`
//     query {
//       giveth {
//         projects {
//           id
//           title
//           description
//           slug
//           creationDate
//           admin
//           image
//           walletAddress
//           categories {
//             name
//           }
//         }
//       }
//     }
//   `)
//   const projectPageTemplate = require.resolve('./src/templates/project.js')
//   if (projectResults.data) {
//     projectResults.data.giveth.projects.forEach(project => {
//       console.log(
//         'theproject ====>',
//         project.title,
//         'theslug===>',
//         project.slug
//       )

//       createPage({
//         path: `/project/${project.slug}`,
//         component: projectPageTemplate,
//         context: {
//           // entire project is passed down as context
//           project: project
//         }
//       })
//     })
//   }
// }
