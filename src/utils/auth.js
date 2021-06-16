const TokenKey = 'Admin-Token'
const UserData = 'User-Data'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUserData() {
  const data = localStorage.getItem(UserData)
  if (data) {
    return JSON.parse(data)
  }
  return {}
}

export function setUserData(data) {
  return localStorage.setItem(UserData, JSON.stringify(data))
}

export function removeUserData() {
  return localStorage.removeItem(UserData)
}

