export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(getLocalStorageUserLabel())
    ? JSON.parse(window.localStorage.getItem(getLocalStorageUserLabel()))
    : {}

export function setUser(user) {
  return window.localStorage.setItem(
    getLocalStorageUserLabel(),
    JSON.stringify(user)
  )
}

export function handleLogout() {
  logout()
}

export const checkIfLoggedIn = () => {
  const user = getUser()

  return !!user.walletAddresses
}

export const logout = (callback = () => {}) => {
  if (isBrowser()) {
    window.localStorage.removeItem(getLocalStorageUserLabel())
    window.localStorage.removeItem(getLocalStorageTokenLabel())
    window.localStorage.removeItem('create-form')
    // TODO: let's check if we should remove everything or just be careful
    // window.localStorage.clear()
  }
  callback()
}

export function getLocalStorageUserLabel() {
  const nextUser = process.env.NEXT_LOCAL_USER_LABEL
    ? process.env.NEXT_LOCAL_USER_LABEL + '_' + process.env.ENVIRONMENT
    : 'nextUser' + '_' + process.env.ENVIRONMENT

  return nextUser
}

export function getLocalStorageTokenLabel() {
  const tokenLabel = getLocalStorageUserLabel() + '_token'

  return tokenLabel
}

export function getUserToken() {
  const userToken = window.localStorage.getItem(getLocalStorageTokenLabel())
  return userToken || ''
}
