/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Button } from '@theme-ui/components'
import { useAuth } from 'react-use-auth'

import Title from '../../components/title'
import { useCustomAuth } from '../../hooks/useCustomAuth'
import PaletteToggle from '../../components/palette-toggle'

export default function Account() {
  const { customLogout } = useCustomAuth()
  const { user, isAuthenticated, login } = useAuth()

  return isAuthenticated() ? (
    <Fragment>
      <Title>My Palette</Title>
      <PaletteToggle location={location} />
      <div sx={{ mb: `2` }}>
        <span sx={{ color: `gray` }}>Email:</span> {user.email}
      </div>
      <dv>
        <span sx={{ color: `gray` }}>Email verified:</span>{' '}
        {user.email_verified ? 'Yes' : 'No'}
      </dv>
      <div>
        <Button sx={{ mt: `3` }} onClick={() => customLogout()}>
          Logout
        </Button>
      </div>
    </Fragment>
  ) : (
    <div sx={{ p: `4`, display: `flex`, placeContent: `center` }}>
      <Title>
        Create an account here:{' '}
        <Button onClick={() => login()}>Login/Register</Button>
      </Title>
    </div>
  )
}
