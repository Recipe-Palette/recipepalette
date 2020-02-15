/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button } from '@theme-ui/components'
import { useAuth } from 'react-use-auth'

import Title from '../components/title'
import { useCustomAuth } from '../hooks/useCustomAuth'

export default function Account() {
  const { customLogout } = useCustomAuth()
  const { user, isAuthenticated, login } = useAuth()

  return isAuthenticated() ? (
    <div sx={{ p: `2` }}>
      <Title>Account</Title>
      <div sx={{ fontSize: 3 }}>
        <b>Email:</b> {user.email}
        <br />
        <b>Name:</b> {user.nickname}
        <br />
        <b>Email verified:</b> {user.email_verified ? 'Yes' : 'No'}
      </div>
      <br />
      <br />
      <Button sx={{ mb: `3` }} onClick={() => customLogout()}>
        Logout
      </Button>
    </div>
  ) : (
    <div sx={{ p: `4`, display: `flex`, placeContent: `center` }}>
      <Title>
        Create an account here:{' '}
        <Button onClick={() => login()}>Login/Register</Button>
      </Title>
    </div>
  )
}
