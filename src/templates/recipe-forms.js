/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Spinner } from '@theme-ui/components'
import { Fragment } from 'react'
import Fraction from 'fraction.js'
import { isEmpty } from 'lodash'

import { findRecipeVersion } from '../utils/findRecipeVersion'
import Title from '../components/title'
import RecipeForm from '../components/recipe-form'
import { versionInfoFragment } from '../graphql/fragments'
import { formatTime } from '../utils/parseTime'

const recipeFormQuery = gql`
  query RecipeFormQuery($id: Int!) {
    recipe: recipe(where: { id: { _eq: $id }, deleted: { _eq: false } }) {
      latest_version
      tags {
        tag {
          name
        }
      }
      user {
        id
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
// eslint-disable-next-line complexity
const RecipeFormTemplate = ({ title, type, recipeId, versionNumber }) => {
  const { data: recipeData, loading } = useQuery(recipeFormQuery, {
    variables: {
      id: parseInt(recipeId),
    },
    fetchPolicy: 'cache-and-network',
  })

  let recipe = {}
  if (!loading && recipeData) {
    recipe = { ...recipeData.recipe[0] }
    // intelligently assign the recipe.version to the correct version number
    recipe.version = findRecipeVersion(
      recipe.versions,
      recipe.latest,
      versionNumber
    )
  } else {
    recipe.version = {}
  }

  if (!loading && isEmpty(recipeData.recipe)) {
    return <div>Recipe Not Found</div>
  }

  if (recipe.version && recipe.version.servings === 0) {
    recipe.version.servings = ''
  }

  if (recipe.version && recipe.version.ingredients) {
    const ingredients = recipe.version.ingredients.map(ingredient => {
      if (
        ingredient.amount
          .toString()
          .match(/^(\d+$|\d+[.]\d+?$|\d*[.]\d+?$|\d+?[\s]?\d[/]\d+|\d[/]\d+$)/)
        //regex checks for one of the following: number with no decimal || number with decimal and at least one number after ||
        //decimal with 0 or many numbers before, and at least one number after || a forward slash with numbers on both sides
      ) {
        const ingredAmount = new Fraction(ingredient.amount)
        ingredient.amount = ingredAmount.toFraction(true)
      }

      if (ingredient.amount === '0') {
        ingredient.amount = ''
      }

      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }
    })

    recipe.version.ingredients = ingredients
  }

  if (recipe && recipe.tags) {
    const tags = recipe.tags.map(recipe_tag => recipe_tag.tag.name)
    recipe.tagNames = tags
  }

  return (
    <Fragment>
      <Title sx={{ '&': { textAlign: `center` } }}>{title}</Title>
      {loading ? (
        <div sx={{ display: `flex`, placeContent: `center` }}>
          <Spinner />
        </div>
      ) : (
        <RecipeForm
          recipe_id={type === 'variant' ? null : parseInt(recipeId)}
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
          tags={recipe && recipe.tagNames}
          image_url={recipe.version.image_url}
          latest_version={type === 'variant' ? 0 : recipe.latest_version}
          recipeOwnerId={recipe.user && recipe.user.id}
          parent_id={type === 'variant' ? parseInt(recipeId) : null}
          location={location}
        />
      )}
    </Fragment>
  )
}

export default RecipeFormTemplate
