/** @jsx jsx */
import { jsx } from 'theme-ui'
import { IconButton } from '@theme-ui/components'
import { Lock, Unlock } from './icons'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import { useToasts } from 'react-toast-notifications'
import gql from 'graphql-tag'
import React from 'react'

import { TOGGLE_PRIVATE } from '../graphql/mutations'

const toggleQuery = gql`
  query isRecipePrivate($recipeId: Int!) {
    recipe_by_pk(id: $recipeId) {
      private
    }
  }
`

const PrivateButton = ({ size = 24, recipeName, recipeId }) => {
  const { addToast } = useToasts()

  const { data: privateData } = useQuery(toggleQuery, {
    variables: {
      recipeId,
    },
  })
  let isPrivate = get(privateData, `recipe_by_pk.private`, false)

  const [upsertPrivate, { error: errorMutation }] = useMutation(
    TOGGLE_PRIVATE,
    {
      onCompleted({ update_recipe: result }) {
        if (errorMutation) {
          addToast('Recipe Was Unable To Be Set Private', {
            appearance: 'error',
          })
        } else {
          let text = ''
          isPrivate = result.returning[0].private
          if (isPrivate) {
            text = `${recipeName} has been made private`
          } else {
            text = `${recipeName} has been made unprivate`
          }

          addToast(text, { appearance: 'success' })
        }
      },
    }
  )

  const togglePrivate = async () => {
    await upsertPrivate({
      variables: {
        recipe_id: recipeId,
        private: !isPrivate,
      },
      refetchQueries: ['isRecipePrivate'],
    })
  }

  return (
    <React.Fragment>
      <IconButton
        sx={{ height: size + 12, width: size + 12 }}
        onClick={togglePrivate}
      >
        {isPrivate && (
          <div sx={{ display: `flex` }}>
            <Lock sx={{ padding: `2px` }} size={size} />
          </div>
        )}
        {!isPrivate && (
          <div sx={{ display: `flex` }}>
            <Unlock sx={{ padding: `2px` }} size={size} />
          </div>
        )}
      </IconButton>
    </React.Fragment>
  )
}

export default PrivateButton
