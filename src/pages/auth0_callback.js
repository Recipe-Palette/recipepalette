// src/pages/auth0_callback
import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import { useAuth } from 'react-use-auth'
import Layout from '../components/layout'

const Auth0CallbackPage = ({ location }) => {
  const { handleAuthentication, authResult } = useAuth()
  useEffect(() => {
    handleAuthentication({ postLoginRoute: '/' })
  }, [])

  if (authResult) {
    const token = authResult.idToken
    localStorage.setItem('token', token)
  }

  return (
    <Layout location={location}>
      <h1>Welcome!</h1>
      <p>
        You've been logged in, you should be redirected to the page you came
        from. If not, you can navigate <Link to="/">home</Link>.
      </p>
    </Layout>
  )
}

export default Auth0CallbackPage
