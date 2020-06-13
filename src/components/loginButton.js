import React from 'react'

const buttonStyle = {
  background: '#C2459F',
  backgroundImage: 'linear-gradient(to bottom, #C2459F, #492657)',
  borderRadius: '20px',
  color: '#FFFFFF',
  fontSize: '20px',
  fontWeight: '100',
  padding: '20px',
  boxShadow: '1px 1px 20px 0px #000000',
  textShadow: '1px 1px 20px #000000',
  border: 'solid #492657 1px',
  cursor: 'pointer',
  textAlign: 'center',
  position: 'absolute',
  right: '20px',
  top: '40px'
}

const LoginButton = props => (
  <button style={buttonStyle} onClick={props.login}>
    Log in
  </button>
)

export default LoginButton
