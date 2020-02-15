/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Title from '../../components/title'
import { Fragment } from 'react'
import { NewCard } from '../../components/cards'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import { bookmarkInformationFragment } from '../../graphql/fragments'
import CardGrid from '../../components/card-grid'
import { RecipeCardGridLoader } from '../../components/recipe-card-loader'
import PaletteToggle from '../../components/palette-toggle'

const recipeQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { latest: { created_at: desc } }
      where: { user_id: { _eq: $user_id } }
    ) {
      id
      latest_version
      latest {
        cook_time_minutes
        prep_time_minutes
        name
        created_at
        version
        image_url
      }
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        ...BookmarkInformation
      }
    }
  }
  ${bookmarkInformationFragment}
`

export default ({ location }) => {
  const { userId } = useAuth()
  const { data: recipeData, loading } = useQuery(recipeQuery, {
    variables: { user_id: userId },
  })

  return (
    <Fragment>
      <Title>My Palette</Title>
      <PaletteToggle location={location} />
      {loading ? (
        <RecipeCardGridLoader />
      ) : (
        <CardGrid recipes={recipeData.recipes}>
          <NewCard />
        </CardGrid>
      )}
    </Fragment>
  )
}