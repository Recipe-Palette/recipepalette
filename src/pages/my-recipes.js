/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'

import Title from '../components/title'
import Layout from '../components/layout'
import { NewCard, RecipeCard } from '../components/cards'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

//import recipes from '../../data/recipes'

const recipeQuery = gql`
  query MyQuery($user_id: String!) {
    recipes: recipe(
      order_by: { current: { created_at: desc } }
      where: { user_id: { _eq: $user_id } }
    ) {
      id
      image_url
      upvotes
      variation_count
      current_version
      current {
        cook_time_minutes
        prep_time_minutes
        name
        created_at
        version
      }
    }
  }
`

export default () => {
  const { userId } = useAuth()
  const { data: recipeData, loading } = useQuery(recipeQuery, {
    variables: { user_id: userId },
  })
  if (loading) {
    return null
  }

  return (
    <Layout>
      <div
        sx={{
          py: `4`,
        }}
      >
        <Title>My Recipes</Title>
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
