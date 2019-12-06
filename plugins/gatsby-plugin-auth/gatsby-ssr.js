/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { navigate } from 'gatsby'

import { AuthProvider } from 'react-use-auth'

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain="recipepalette.auth0.com"
    auth0_client_id="lCP1u3lIWf92XMgrn0q2N0xN4hXVAC07"
  >
    {element}
  </AuthProvider>
)
