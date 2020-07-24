require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

global.Buffer = global.Buffer || require('buffer').Buffer

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64')
  }
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString()
  }
}

module.exports = {
  siteMetadata: {
    title: 'Giveth Tor.us',
    description: 'The future of giving',
    author: '@giveth'
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Red Hat Display',
            variants: ['400', '500', '700']
          },
          {
            family: 'Red Hat Text',
            variants: ['400', '500', '700']
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
