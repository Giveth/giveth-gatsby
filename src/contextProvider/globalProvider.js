import React from 'react'
import { ProjectProvider } from './projectProvider'

export const GlobalProvider = props => {
  return <ProjectProvider>{props.children}</ProjectProvider>
}
