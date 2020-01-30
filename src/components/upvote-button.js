/** @jsx jsx */
import { jsx } from 'theme-ui'
import { IconButton } from '@theme-ui/components'
import { Heart } from './icons'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import { useToasts } from 'react-toast-notifications'
import gql from 'graphql-tag'
import React from 'react'

import { UPSERT_UPVOTE } from '../graphql/mutations'
import { useAuth } from 'react-use-auth'
import UpvoteCount from './upvote-count'
import { upvoteInformationFragment } from '../graphql/fragments'

const upvoteQuery = gql`
  query($recipeId: Int!, $userId: String) {
    upvote(
      where: { recipe_id: { _eq: $recipeId }, user_id: { _eq: $userId } }
    ) {
      ...UpvoteInformation
    }
  }

  ${upvoteInformationFragment}
`

const UpvoteButton = ({ size = 24, recipeName, recipeId }) => {
  const { addToast } = useToasts()
  const [upsertUpvote, { error: errorMutation }] = useMutation(UPSERT_UPVOTE)
  const { userId, isAuthenticated, login } = useAuth()
  const { data: upvoteData, loading: loadingQuery } = useQuery(upvoteQuery, {
    variables: {
      recipeId,
      userId,
    },
    skip: !userId,
  })
  const upvoted = get(upvoteData, `upvote[0].upvoted`, false)

  const toggleUpvote = async () => {
    await upsertUpvote({
      variables: {
        user_id: userId,
        recipe_id: recipeId,
        upvoted: !upvoted,
      },
    })

    if (errorMutation) {
      addToast('Bookmark Failed to Save', { appearance: 'error' })
    } else {
      let text = ''
      if (upvoted) {
        text = `${recipeName} has been removed from your hearts`
      } else {
        text = `${recipeName} has been hearted`
      }

      addToast(text, { appearance: 'success' })
    }
  }

  const handleUpvote = e => {
    e.preventDefault()
    if (loadingQuery) return
    if (isAuthenticated()) {
      toggleUpvote()
    } else {
      addToast(
        <span>
          Please{' '}
          <span
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue',
            }}
            onClick={login}
            onKeyDown={login}
          >
            login
          </span>{' '}
          to heart recipes
        </span>,
        { appearance: 'error' }
      )
    }
  }

  return (
    <React.Fragment>
      <IconButton
        sx={{ height: size + 12, width: size + 12 }}
        onClick={handleUpvote}
      >
        <div sx={{ display: `flex` }}>
          <Heart sx={{ padding: `2px` }} size={size} filled={upvoted} />
        </div>
      </IconButton>
      <UpvoteCount recipeId={recipeId} />
    </React.Fragment>
  )
}

export default UpvoteButton
