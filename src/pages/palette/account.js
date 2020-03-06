/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Fragment, useState } from 'react'
import { Label, IconButton, Input, Button, Spinner } from '@theme-ui/components'
import { useAuth } from 'react-use-auth'
import { Formik, Form } from 'formik'
import { useToasts } from 'react-toast-notifications'
import { get } from 'lodash'
import * as Yup from 'yup'

import Title from '../../components/title'
import { useCustomAuth } from '../../hooks/useCustomAuth'
import PaletteToggle from '../../components/palette-toggle'
import { UPSERT_USERNAME } from '../../graphql/mutations'
import { Edit } from '../../components/icons'

export default function Account() {
  const { customLogout } = useCustomAuth()
  const { addToast } = useToasts()
  const { user, isAuthenticated, login, userId } = useAuth()
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  const toggleEditing = () => {
    setEditing(!editing)
  }

  const accountQuery = gql`
    query AccountQuery($userId: String!) {
      user_by_pk(id: $userId) {
        name
      }
    }
  `

  const { data: accountData, loading } = useQuery(accountQuery, {
    variables: {
      userId,
    },
    fetchPolicy: 'cache-and-network',
  })

  const [upsertUserName, { error: errorMutation }] = useMutation(
    UPSERT_USERNAME,
    {
      onCompleted({ update_user: result }) {
        setSaving(false)
        setEditing(false)
        if (errorMutation) {
          addToast('Username failed to update', { appearance: 'error' })
        } else {
          addToast(`Username updated to ${result.returning[0].name}`, {
            appearance: 'success',
          })
        }
      },
    }
  )

  const AccountSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Username is required'),
  })

  const handleSubmit = values => {
    setSaving(true)
    values.name = values.name.trim()

    if (values.name === get(accountData, 'user_by_pk.name', '')) {
      addToast('Username is the same', { appearance: 'error' })
      setSaving(false)
      setEditing(false)
    } else {
      upsertUserName({
        variables: { userId, name: values.name },
        refetchQueries: ['AccountQuery'],
      })
    }
  }

  return isAuthenticated() ? (
    <Fragment>
      <Title>My Palette</Title>
      <PaletteToggle location={location} />
      <div sx={{ mb: `2` }}>
        <span sx={{ color: `gray` }}>Email:</span> {user.email}
      </div>
      <div sx={{ mb: `2` }}>
        <span sx={{ color: `gray` }}>Email verified:</span>{' '}
        {user.email_verified ? 'Yes' : 'No'}
      </div>
      <div>
        {editing && (
          <Formik
            initialValues={{
              name: get(accountData, 'user_by_pk.name', ''),
            }}
            validationSchema={AccountSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Label htmlFor="name">Username</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? (
                  <div sx={{ color: `error` }}>{errors.name}</div>
                ) : null}
                <div sx={{ mt: `3` }}>
                  <Spinner
                    size="30"
                    sx={{
                      display: saving ? `initial` : `none`,
                      mr: `4`,
                    }}
                  />
                  <Button
                    type="button"
                    sx={{ variant: `buttons.primary`, mr: `3` }}
                    onClick={toggleEditing}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" sx={{ variant: `buttons.submit` }}>
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {!editing && !loading && (
          <div>
            <span sx={{ color: `gray` }}>Username:</span>{' '}
            {accountData && get(accountData, 'user_by_pk.name', '')}
            <IconButton
              // sx={{ height: 20, width: 20 }}
              onClick={() => setEditing(true)}
            >
              <div>
                <Edit size={14} />
              </div>
            </IconButton>
          </div>
        )}
      </div>
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
