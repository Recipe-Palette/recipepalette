/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Title from '../components/title'
import Layout from '../components/layout'
import { NewCard } from '../components/cards'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import { bookmarkInformationFragment } from '../graphql/fragments'
import CardGrid from '../components/card-grid'
import { RecipeCardGridLoader } from '../components/recipe-card-loader'

const recipeQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { latest: { created_at: desc } }
      where: { user_id: { _eq: $user_id } }
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
  const { data: recipeData, loading } = useQuery(recipeQuery, {
    variables: { user_id: userId },
  })

  return (
    <Layout location={location}>
      <div
        sx={{
          py: `4`,
        }}
      >
        <Title>My Recipes</Title>
        {loading ? (
          <RecipeCardGridLoader />
        ) : (
          <CardGrid recipes={recipeData.recipes}>
            <NewCard />
          </CardGrid>
        )}
      </div>
    </Layout>
  )
}
