import React from 'react'
import { Avatar } from 'theme-ui'
import Jdenticon from 'react-jdenticon'
import 'react-toastify/dist/ReactToastify.css'

export default function CustomAvatar({ img, address = 'none', size }) {
  return (
    <>
      {img ? (
        <Avatar src={img} sx={{ width: size, height: size }} />
      ) : (
        <Jdenticon size='100' value={address} />
      )}
    </>
  )
}
