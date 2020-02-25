/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useAuth } from 'react-use-auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, login } = useAuth()

  return isAuthenticated() === true ? <Component {...rest} /> : login()
}

export default PrivateRoute
