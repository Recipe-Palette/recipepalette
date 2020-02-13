/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Spinner } from '@theme-ui/components'

import { findRecipeVersion } from '../utils/findRecipeVersion'
import Layout from '../components/layout'
import Title from '../components/title'
import RecipeForm from '../components/recipe-form'
import { versionInfoFragment } from '../graphql/fragments'
import { formatTime } from '../utils/parseTime'

const recipeFormQuery = gql`
  query RecipeFormQuery($id: Int!) {
    recipe: recipe_by_pk(id: $id) {
      latest_version
      tags {
        tag {
          name
        }
      }
      latest {
        ...VersionInformation
      }
      versions {
        ...VersionInformation
      }
    }
  }
  ${versionInfoFragment}
`

// used for recipe form pages like edit/new/variant
const RecipeFormTemplate = ({ title, recipeId, versionNumber }) => {
  const { data: recipeData, loading } = useQuery(recipeFormQuery, {
    variables: {
      id: recipeId,
    },
    fetchPolicy: 'cache-and-network',
  })

  let recipe = {}
  if (!loading && recipeData) {
    recipe = recipeData.recipe
    // intelligently assign the recipe.version to the correct version number
    recipe.version = findRecipeVersion(recipe, versionNumber)
  } else {
    recipe.version = {}
  }

  if (recipe.version && recipe.version.ingredients) {
    const ingredients = recipe.version.ingredients.map(ingredient => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }))

    recipe.version.ingredients = ingredients
  }

  if (recipe && recipe.tags) {
    const tags = recipe.tags.map(recipe_tag => recipe_tag.tag.name)
    recipe.tags = tags
  }

  return (
    <Layout location={location}>
      <Title sx={{ textAlign: `center` }}>{title}</Title>
      {loading ? (
        <div sx={{ display: `flex`, placeContent: `center` }}>
          <Spinner />
        </div>
      ) : (
        <RecipeForm
          recipe_id={parseInt(recipeId)}
          name={recipe.version && recipe.version.name}
          ingredients={recipe.version && recipe.version.ingredients}
          instructions={
            recipe.version &&
            recipe.version.instructions &&
            recipe.version.instructions.join('\n')
          }
          prep_time={
            recipe.version && formatTime(recipe.version.prep_time_minutes)
          }
          cook_time={
            recipe.version && formatTime(recipe.version.cook_time_minutes)
          }
          servings={recipe.version && recipe.version.servings}
          tags={recipe && recipe.tags}
          image_url={recipe.version.image_url}
          latest_version={recipe.latest_version}
        />
      )}
    </Layout>
  )
}

export default RecipeFormTemplate
