/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'

import styled from '@emotion/styled'

const Crate = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0px;
`

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <Crate>
      <widgetbot
        server='679428761438912522'
        channel='835168432520429578'
        width='800'
        height='600'
        shard='https://emerald.widgetbot.io'
      ></widgetbot>

      <script src='https://cdn.jsdelivr.net/npm/@widgetbot/html-embed'></script>
    </Crate>
  ])
}

export { wrapRootElement } from './src/apollo/wrapRootElement'
