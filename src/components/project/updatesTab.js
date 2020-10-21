import React from 'react'
import styled from '@emotion/styled'
import { ProjectContext } from '../../contextProvider/projectProvider'
import { Button, Flex, Text } from 'theme-ui'
import theme from '../../gatsby-plugin-theme-ui'

import Timeline from './timeline'

export const UpdatesTab = ({ showModal, setShowModal }) => {
  return (
    <>
      <Timeline />
    </>
  )
}
