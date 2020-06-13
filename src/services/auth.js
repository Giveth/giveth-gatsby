const gatsbyUser = process.env.GATSBY_LOCAL_USER_LABEL
export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(gatsbyUser)
    ? JSON.parse(window.localStorage.getItem(gatsbyUser))
    : {}

export function setUser (user) {
  return window.localStorage.setItem(gatsbyUser, JSON.stringify(user))
}

export const handleLogin = ({ username, password }) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `Johnny`,
      email: `johnny@example.org`
    })
  }

  return false
}

export function handleLogout () {
  localStorage.removeItem(process.env.GATSBY_LOCAL_USER_LABEL)
}

export const checkIfLoggedIn = () => {
  const user = getUser()

  return !!user.publicAddress
}

export const logout = callback => {
  setUser({})
  callback()
}
