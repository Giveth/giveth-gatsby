import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(2px)',
    '-webkit-backdrop-filter': 'blur(2px)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: 0,
    borderRadius: '12px',
    borderColor: 'transparent',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    filter: 'drop-shadow(0px 4px 68px #DFDAE8)'
  }
}

function CustomModal(props) {
  console.log(props)
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
      contentLabel={props.contentLabel}
    >
      {props.children}
    </Modal>
  )
}

export default CustomModal
