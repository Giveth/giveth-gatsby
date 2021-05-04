const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken
})

export async function fetchEntries({ contentType }) {
  try {
    const entries = await client.getEntries({
      content_type: contentType
    })
    if (entries.items) return entries.items
  } catch (error) {
    return null
  }
}

export default { fetchEntries }
