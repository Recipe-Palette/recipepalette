// src/pages/auth0_callback
import React, { useEffect } from 'react'
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
    <div
      sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
      <h1>Welcome!</h1>
      <p>
        You've been logged in, you should be redirected to the page
        automatically. If not, you can navigate <Link to="/">home</Link>.
      </p>
    </div>
  )
}

export default Auth0CallbackPage
