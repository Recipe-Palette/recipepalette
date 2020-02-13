/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Title from '../components/title'
import Layout from '../components/layout'
import { NewCard, RecipeCard } from '../components/cards'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import { bookmarkInformationFragment } from '../graphql/fragments'

const heartedQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { latest: { created_at: desc } }
      where: { ups: { user_id: { _eq: $user_id } } }
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
    <Layout location={location}>
      <div
        sx={{
          py: `4`,
        }}
      >
        <Title>My Hearted Recipes</Title>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: [`repeat(auto-fit, minmax(275px, 1fr))`],
            gridAutoFlow: `row`,
            gridGap: `3`,
            mb: `4`,
          }}
        >
          <NewCard />
          {recipeData.recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
