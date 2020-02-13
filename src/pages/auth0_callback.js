// src/pages/auth0_callback
import React, { useEffect, Fragment } from 'react'
import { Link } from 'gatsby'

import { useAuth } from 'react-use-auth'

const Auth0CallbackPage = () => {
  const { handleAuthentication, authResult } = useAuth()
  useEffect(() => {
    handleAuthentication({ postLoginRoute: '/' })
  }, [])

  if (authResult) {
    const token = authResult.idToken
    localStorage.setItem('token', token)
  }

  return (
    <Fragment>
      <h1>Welcome!</h1>
      <p>
        You've been logged in, you should be redirected to the page you came
        from. If not, you can navigate <Link to="/">home</Link>.
      </p>
    </Fragment>
  )
}

export default Auth0CallbackPage
