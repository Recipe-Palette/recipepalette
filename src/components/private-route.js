/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Location } from '@reach/router'
import { useAuth } from 'react-use-auth'

const PrivateRoute = ({ component: Component, authed, authUser, ...rest }) => {
  const { isAuthenticated, login } = useAuth()

  return (
    <Location>
      {() => (isAuthenticated() === true ? <Component {...rest} /> : login())}
    </Location>
  )
}

export default PrivateRoute
