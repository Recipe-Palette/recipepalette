/** @jsx jsx */
import { jsx } from 'theme-ui'
import { IconButton } from '@theme-ui/components'
import { Bookmark } from './icons'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import { useToasts } from 'react-toast-notifications'
import gql from 'graphql-tag'

import { UPSERT_BOOKMARK } from '../graphql/mutations'
import { useAuth } from 'react-use-auth'
import { bookmarkInformationFragment } from '../graphql/fragments'

const bookmarkQuery = gql`
  query($recipeId: Int!, $userId: String) {
    bookmark(
      where: { recipe_id: { _eq: $recipeId }, user_id: { _eq: $userId } }
    ) {
      ...BookmarkInformation
    }
  }
  ${bookmarkInformationFragment}
`

const BookmarkButton = ({ size = 24, recipeName, recipeId }) => {
  const { addToast } = useToasts()
  const [upsertBookmark, { error: errorMutation }] = useMutation(
    UPSERT_BOOKMARK
  )
  const { userId, isAuthenticated, login } = useAuth()
  const { data: bookmarkData, loading: loadingQuery } = useQuery(
    bookmarkQuery,
    {
      variables: {
        recipeId,
        userId,
      },
      skip: !userId,
    }
  )

  const bookmarked = get(bookmarkData, `bookmark[0].bookmarked`, false)

  const toggleBookmark = async () => {
    await upsertBookmark({
      variables: {
        user_id: userId,
        recipe_id: recipeId,
        bookmarked: !bookmarked,
      },
    })

    if (errorMutation) {
      addToast('Bookmark Failed to Save', { appearance: 'error' })
    } else {
      let text = ''
      if (bookmarked) {
        text = `${recipeName} has been removed from bookmarks`
      } else {
        text = `${recipeName} has been bookmarked`
      }

      addToast(text, { appearance: 'success' })
    }
  }

  const handleBookmark = e => {
    e.preventDefault()
    if (loadingQuery) return
    if (isAuthenticated()) {
      toggleBookmark()
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
          to bookmark recipes
        </span>,
        { appearance: 'error' }
      )
    }
  }

  return (
    <IconButton
      sx={{ height: size + 12, width: size + 12 }}
      onClick={handleBookmark}
    >
      <div sx={{ display: `flex` }}>
        <Bookmark size={size} filled={bookmarked} />
      </div>
    </IconButton>
  )
}

export default BookmarkButton
