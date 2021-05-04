/** @jsx jsx */
import { Button, jsx } from 'theme-ui'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Collapsible from 'react-collapsible'
import styled from '@emotion/styled'

const Crate = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0px;
`

const SupportChatWidget = () => {
  return (
    <Crate>
      <Collapsible
        trigger={<Button>Get Support</Button>}
        style={{ padding: '1rem' }}
      >
        <widgetbot
          server='299881420891881473'
          channel='355719584830980096'
          width='800'
          height='600'
        ></widgetbot>
      </Collapsible>
    </Crate>
  )
}

export default SupportChatWidget
