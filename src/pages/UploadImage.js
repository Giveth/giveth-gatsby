import React, { useState } from 'react'
import { Button, Input, Text } from 'theme-ui'
import { pinFile } from '../services/Pinata'

const containerStyles = {
  margin: 'auto',
  maxWidth: 300,
  display: 'flex',
  justifyContent: 'center',
  marginTop: '55px'
}

const UploadImage = () => {
  const allowedFileTypes = ['image/jpeg', 'image/png']
  const [error, setError] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState()
  const [image, setImage] = useState()

  const showError = error => {
    setError(error)
    setLink('')
    setFile(undefined)
    setImage(undefined)
  }

  const onFileChange = event => {
    const { files } = event.target
    if (files.length > 0) {
      const [file] = files
      if (!allowedFileTypes.includes(file.type)) {
        showError('File type is not supported')
        return
      }
      setError(undefined)
      setFile(file)
      const reader = new FileReader()
      reader.onload = e => {
        const { result } = e.target
        setImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = () => {
    if (file && image) {
      pinFile(file)
        .then(response => {
          setError('')
          setLink('https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash)
        })
        .catch(e => {
          showError(e)
        })
    }
  }

  return (
    <div>
      {!!image && (
        <div style={containerStyles}>
          <img
            src={image}
            style={{ margin: 'auto', display: 'block', maxWidth: '800px' }}
            alt={'no alt :('}
          />
        </div>
      )}

      {/*upload image*/}
      <div style={containerStyles}>
        <Input
          sx={{
            variant: 'borderless'
          }}
          name='imageFile'
          mb={3}
          placeholder='Choose Image'
          style={{ fontSize: '1.5em' }}
          type='file'
          onChange={onFileChange}
        />
      </div>

      <div style={containerStyles}>
        <Button
          mt={2}
          p={2}
          sx={{
            width: '190px',
            variant: 'buttons.default',
            margin: '0 auto'
          }}
          onClick={uploadFile}
        >
          Upload
        </Button>
      </div>
      <div style={containerStyles}>
        <div>
          {error && <Text>Error: {JSON.stringify(error, null, 2)}</Text>}
        </div>
        <div>
          {link && (
            <span>
              File uploaded to: <a href={link}>{link}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImage
