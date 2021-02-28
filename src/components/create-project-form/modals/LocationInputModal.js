import React, { useEffect } from 'react'
// import { Link } from 'gatsby'
import { Button, Input } from 'theme-ui'

export const LocationInputModal = ({
  showModal,
  setShowModal,
  setLocation
}) => {
  useEffect(() => {
    console.log('change')
  })
  return (
    <div
      css={{
        display: showModal ? 'flex' : 'none',
        position: 'absolute',
        left: '25%',
        top: '-30%',
        paddingTop: '0',
        flexDirection: 'column',
        width: '600px',
        backgroundColor: 'white',
        boxShadow: '0px 28px 52px rgba(44, 13, 83, 0.2)',
        borderRadius: '2px'
      }}
    >
      <Button
        type='button'
        onClick={() => setShowModal(false)}
        aria-label='close'
        sx={{
          position: 'absolute',
          top: '10px',
          right: '32px',
          fontSize: '3',
          fontFamily: 'body',
          color: 'secondary',
          background: 'unset',
          cursor: 'pointer'
        }}
      >
        Close
      </Button>
      <div id='locationField'>
        <Input
          id='autocomplete'
          placeholder='Search a Location'
          type='text'
          sx={{ fontFamily: 'body', width: '50%' }}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <div id='map' style={{ height: '350px' }} />
    </div>
  )
}
