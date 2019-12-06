// src/pages/auth0_callback
import React, { useEffect } from 'react'

import { useAuth } from 'react-use-auth'
import Layout from '../components/layout'

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
    <Layout>
      <h1>
        This is the auth callback page, you should be redirected immediately.
      </h1>
    </Layout>
  )
}

export default Auth0CallbackPage
