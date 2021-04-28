/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React, { useState } from 'react'

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents([
    <>
      <widgetbot
        server='679428761438912522'
        channel='835168432520429578'
        width='800'
        height='600'
        shard='https://emerald.widgetbot.io'
        id='widgetbot'
      ></widgetbot>

      <script src='https://cdn.jsdelivr.net/npm/@widgetbot/html-embed'></script>
    </>
  ])
}

export { wrapRootElement } from './src/apollo/wrapRootElement'
