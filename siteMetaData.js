const siteId = process.env.GATSBY_SITE_ID
let siteMetaData

if (siteId === 'giveth') {
  siteMetaData = {
    title: 'Giveth Donation Application',
    description: 'Building the Future of Giving #Blockchain4Good',
    author: '@giveth'
  }
} else if (siteId === 'co2ken') {
  siteMetaData = {
    title: 'CO2ken tokenized carbon',
    description: 'Decarbonizing the Ethereum ecosystem',
    author: '@co2ken'
  }
} else {
  throw Error('Invalid process.env.GATSBY_SITE_ID', process.env.GATSBY_SITE_ID)
}
module.exports = {
  siteMetaData
}
