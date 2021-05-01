/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('isomorphic-fetch')
const webpack = require(`webpack`)
const { setContext } = require('@apollo/client/link/context')
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client')

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    }
  }
})

const httpLink = new HttpLink({ uri: process.env.GATSBY_APOLLO_SERVER, fetch })

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

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
  const projectResults = await graphql(`
    query {
      giveth {
        projects {
          id
          title
          description
          image
          slug
          creationDate
          admin
          walletAddress
          impactLocation
          balance
          qualityScore
          totalDonations
          totalHearts
          status {
            id
            symbol
            name
            description
          }
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
            createdAt
            currency
          }
          reactions {
            reaction
            id
            projectUpdateId
            userId
          }
        }
        categories {
          name
        }
      }
    }
  `)
  const projectPageTemplate = require.resolve('./src/templates/project.js')
  const donatePageTemplate = require.resolve('./src/templates/donate.js')

  if (projectResults.data) {
    projectResults.data.giveth.projects.forEach(project => {
      console.log(`creating /project/${project.slug}`)
      createPage({
        path: `/project/${project.slug}`,
        component: projectPageTemplate,
        context: {
          // entire project is passed down as context
          project
        }
      })
      createPage({
        path: `/donate/${project.slug}`,
        component: donatePageTemplate,
        context: {
          // entire project is passed down as context
          project
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
          // {
          //   test: /\.js$/,
          //   exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
          //   loader: 'babel-loader',
          //   query: {}
          // }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          'window.Quill': 'quill',
          Quill: 'quill/dist/quill.js'
        })
      ]
    })
  }
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType
}) => {
  const { createNode } = actions
  try {
    const { data } = await client.query({
      query: gql`
        query {
          projects {
            id
            title
            description
            image
            slug
            creationDate
            admin
            walletAddress
            impactLocation
            balance
            qualityScore
            totalDonations
            totalHearts
            status {
              id
              symbol
              name
              description
            }
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
              createdAt
              currency
            }
            reactions {
              reaction
              id
              projectUpdateId
              userId
            }
          }
          categories {
            name
          }
        }
      `
    })

    const { projects, categories } = data

    if (projects && projects.length) {
      createNode({
        id: 'giveth',
        projects: projects,
        parent: null,
        children: [],
        internal: {
          type: 'Projects',
          content: JSON.stringify(projects),
          contentDigest: createContentDigest(projects)
        }
      })

      projects.forEach(project => {
        createNode({
          ...project,
          id: createNodeId(`Project-${project.id}`),
          parent: null,
          children: [],
          internal: {
            type: 'Project',
            content: JSON.stringify(project),
            contentDigest: createContentDigest(project)
          }
        })
      })
      categories.forEach(category => {
        createNode({
          ...category,
          id: createNodeId(`Project-${category.id}`),
          parent: null,
          children: [],
          internal: {
            type: 'Category',
            content: JSON.stringify(category),
            contentDigest: createContentDigest(category)
          }
        })
      })
    } else {
      console.error('No projects during build')
    }
    return
  } catch (e) {
    console.error('Error getting project data')
    console.error(e)
    return
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Projects implements Node {
      projects: [Project]
    }
    type Status implements Node {
      id: ID!
      symbol: String!
      name: String
      description: String
    }
    type Project implements Node {
      id: ID!
      title: String!
      description: String!
      slug: String!
      image: String
      admin: String
      walletAddress: String
      balance: Float
      creationDate: String!
      # create relationships between Project and Donation nodes
      # donations: Donation @link(from: "author.name" by: "name")
      donations: [Donation]
      impactLocation: String
      categories: [Category]
      reactions: [Reaction]
      status: [Status]
      qualityScore: Float
      totalDonations: Float
      totalHearts: Float
    }
    type Category implements Node {
      id: ID!
      name: String
      value: String!
      source: String!
    }
    type Reaction implements Node {
      id: ID!
      projectUpdateId: Float
      userId: Float
      reaction: String!
    }
    type Donation implements Node {
      id: ID!
      transactionId: String
      toWalletAddress: String!
      fromWalletAddress: String!
      anonymous: Boolean!
      amount: Float!
      valueUsd: Float
      user: User!
      project: Project!
      createdAt: Date @dateformat
      currency: String
    }
    type User implements Node {
      id: ID!
      firstName: String
      lastName: String
      avatar: String
    }
    `)
}
