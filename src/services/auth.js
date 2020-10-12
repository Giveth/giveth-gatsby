const gatsbyUser = process.env.GATSBY_LOCAL_USER_LABEL || 'gatsbyUser'
export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(gatsbyUser)
    ? JSON.parse(window.localStorage.getItem(gatsbyUser))
    : {}

export function setUser (user) {
  return window.localStorage.setItem(gatsbyUser, JSON.stringify(user))
}

export const handleLogin = ({ username, password }) => {
  if (username === 'john' && password === 'pass') {
    return setUser({
      username: 'john',
      name: 'Johnny',
      email: 'johnny@example.org'
    })
  }

  return false
}

export function handleLogout () {
  localStorage.removeItem(gatsbyUser)
}

export const checkIfLoggedIn = () => {
  const user = getUser()

  return !!user.addresses
}

export const logout = (callback = () => {}) => {
  if (isBrowser()) {
    window.localStorage.removeItem(gatsbyUser)
  }
  callback()
}
