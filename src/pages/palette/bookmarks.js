/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Title from '../../components/title'
import { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import {
  bookmarkInformationFragment,
  recipeCardInformationFragment,
} from '../../graphql/fragments'
import PaletteToggle from '../../components/palette-toggle'
import CardGrid from '../../components/card-grid'
import { RecipeCardGridLoader } from '../../components/recipe-card-loader'

const bookmarkedQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { latest: { created_at: desc } }
      where: {
        bookmarks: { user_id: { _eq: $user_id }, bookmarked: { _eq: true } }
        deleted: { _eq: false }
      }
    ) {
      ...RecipeCardInformation
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        ...BookmarkInformation
      }
    }
  }
  ${bookmarkInformationFragment}
  ${recipeCardInformationFragment}
`

export default ({ location }) => {
  const { userId } = useAuth()
  const { data: recipeData, loading } = useQuery(bookmarkedQuery, {
    variables: { user_id: userId },
  })

  return (
    <Fragment>
      <Title>My Palette</Title>
      <PaletteToggle location={location} />
      {loading ? (
        <RecipeCardGridLoader />
      ) : (
        <CardGrid recipes={recipeData.recipes} />
      )}
    </Fragment>
  )
}
