import React from 'react'
import ProjectProvider from './projectProvider'

const GlobalProvider = props => {
  return (
    <>
      <ProjectProvider>{props.children}</ProjectProvider>
    </>
  )
}

export default GlobalProvider
