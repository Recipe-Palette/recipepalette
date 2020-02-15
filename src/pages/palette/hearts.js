/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Title from '../../components/title'
import { Fragment } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import { bookmarkInformationFragment } from '../../graphql/fragments'
import PaletteToggle from '../../components/palette-toggle'
import CardGrid from '../../components/card-grid'

const heartedQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { latest: { created_at: desc } }
      where: { ups: { user_id: { _eq: $user_id }, upvoted: { _eq: true } } }
    ) {
      id
      image_url
      latest_version
      latest {
        cook_time_minutes
        prep_time_minutes
        name
        created_at
        version
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
  const { data: recipeData, loading } = useQuery(heartedQuery, {
    variables: { user_id: userId },
  })
  if (loading) {
    return null
  }

  return (
    <Fragment>
      <Title>My Palette</Title>
      <PaletteToggle location={location} />
      <CardGrid recipes={recipeData.recipes} />
    </Fragment>
  )
}
