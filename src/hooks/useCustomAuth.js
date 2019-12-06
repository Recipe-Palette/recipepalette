import { useAuth } from 'react-use-auth'

export const useCustomAuth = () => {
  const { login, logout } = useAuth()

  const customLogin = async () => {
    const { authResult } = await login()
    localStorage.setItem('token', JSON.stringify(authResult.idToken))
  }

  const customLogout = () => {
    logout()
    localStorage.removeItem('token')
  }

  return {
    customLogin,
    customLogout,
  }
}
