const gatsbyUser = process.env.GATSBY_LOCAL_USER_LABEL || 'gatsbyUser'
export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(gatsbyUser)
    ? JSON.parse(window.localStorage.getItem(gatsbyUser))
    : {}

export function setUser (user) {
  return window.localStorage.setItem(gatsbyUser, JSON.stringify(user))
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
    window.localStorage.removeItem(gatsbyUser)
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('create-form')
    // TODO: let's check if we should remove everything or just be careful
    // window.localStorage.clear()
  }
  callback()
}
