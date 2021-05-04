/** @jsx jsx */
import { Button, jsx } from 'theme-ui'
import * as React from 'react'
import WidgetBot from '@widgetbot/react-embed'
import Collapsible from 'react-collapsible'
import styled from '@emotion/styled'

const Crate = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0px;
`

const SupportWidget = () => (
  <Crate>
    <Collapsible
      trigger={<Button>Get Support</Button>}
      style={{ padding: '1rem' }}
    >
      <WidgetBot
        server='679428761438912522'
        channel='785176817916968973'
        style={{ width: '33vw', height: '500px' }}
      />
    </Collapsible>
  </Crate>
)

export default SupportWidget
