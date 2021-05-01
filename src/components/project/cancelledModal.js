import React from 'react'
import { Flex, Text } from 'theme-ui'
import Modal from 'react-modal'
import Link from 'next/link'

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 235, 255, 0.25)',
    backdropFilter: 'blur(2px)',
    '-webkit-backdrop-filter': 'blur(2px)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '12px',
    borderColor: 'transparent',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

function CancelledModal(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      <Flex sx={{ p: 3, flexDirection: 'column' }}>
        <Text variant='headings.h6' color='secondary' sx={{ mb: 2 }}>
          This project is currently cancelled...
        </Text>

        <Text variant='headings.h5' color='secondary'>
          Check out these other{' '}
          <Link
            sx={{ textDecoration: 'none', textDecorationLine: 'none' }}
            href='/projects'
          >
            <Text
              variant='headings.h5'
              color='primary'
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              projects!
            </Text>
          </Link>
        </Text>
      </Flex>
    </Modal>
  )
}

export default CancelledModal
