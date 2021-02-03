export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(getLocalStorageUserLabel())
    ? JSON.parse(window.localStorage.getItem(getLocalStorageUserLabel()))
    : {}

export function setUser (user) {
  return window.localStorage.setItem(
    getLocalStorageUserLabel(),
    JSON.stringify(user)
  )
}

export function handleLogout () {
  logout()
}

export const checkIfLoggedIn = () => {
  const user = getUser()

  console.log(`debug: checkIfLoggd in user : ${JSON.stringify(user, null, 2)}`)
  console.log(
    `debug: checkIfLoggd in !!user.walletAddresses : ${JSON.stringify(
      !!user.walletAddresses,
      null,
      2
    )}`
  )

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

export function getLocalStorageUserLabel () {
  const gatsbyUser = process.env.GATSBY_LOCAL_USER_LABEL
    ? process.env.GATSBY_LOCAL_USER_LABEL + '_' + process.env.ENVIRONMENT
    : 'gatsbyUser' + '_' + process.env.ENVIRONMENT

  return gatsbyUser
}

export function getLocalStorageTokenLabel () {
  const tokenLabel = getLocalStorageUserLabel() + '_token'

  return tokenLabel
}

export function getUserToken () {
  const userToken = window.localStorage.getItem(getLocalStorageTokenLabel())
  return userToken || ''
}
