import gql from 'graphql-tag'

const UPLOAD_FILE = gql`
  mutation($image: Upload!) {
    upload(image: $image) 
  }
`

export { UPLOAD_FILE }
