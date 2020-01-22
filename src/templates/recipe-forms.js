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

const recipeFormQuery = gql`
  query RecipeFormQuery($id: Int!) {
    recipe: recipe_by_pk(id: $id) {
      image_url
      latest_version
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
  })

  let recipe = {}
  if (!loading && recipeData) {
    recipe = recipeData.recipe
    // intelligently assign the recipe.version to the correct version number
    recipe.version = findRecipeVersion(recipe, versionNumber)
  } else {
    recipe.version = {}
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
          name={recipe.version && recipe.version.name}
          ingredients={recipe.version && recipe.version.ingredients}
          instructions={recipe.version && recipe.version.instructions}
          prep_time={recipe.version && recipe.version.prep_time_minutes}
          cook_time={recipe.version && recipe.version.cook_time_minutes}
          servings={recipe.version && recipe.version.servings}
          image_url={recipe.version && recipe.version.image_url}
        />
      )}
    </Layout>
  )
}

export default RecipeFormTemplate
