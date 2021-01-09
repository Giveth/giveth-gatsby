import React, { createContext, useState, useContext } from 'react'

const PopupContext = createContext()

export const PopupProvider = ({ children }) => {
  const [value, setValue] = useState()
  const triggerPopup = (type, extra) => setValue({ type, extra })
  const clearPopup = () => setValue()

  return (
    <PopupContext.Provider value={{ value, triggerPopup, clearPopup }}>
      {children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
