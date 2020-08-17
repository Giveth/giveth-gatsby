/**
 * Pinata cloud functions helper
 */
const Https = require('https')

const Axios = require('axios')
const FormData = require('form-data')

export const pinFile = file => {
  // we gather a local file for this example, but any valid readStream source will work here.
  const data = new FormData()
  data.append('file', file)

  // You'll need to make sure that the metadata is in the form of a JSON object
  // that's been converted to a string. metadata is optional
  if (file.name) {
    const metadata = JSON.stringify({
      name: file.name
    })
    data.append('pinataMetadata', metadata)
  }
  const axios = Axios.create({
    httpsAgent: new Https.Agent({
      rejectUnauthorized: false
    })
  })
  return axios.post('Https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
    maxContentLength: 'Infinity', // this is needed to prevent Axios from throw error with large files
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
    }
  })
}
