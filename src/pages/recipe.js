/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router } from '@reach/router'

import Recipe from '../templates/recipe'
import RecipeForms from '../templates/recipe-forms'

const RecipeRoutes = () => {
  return (
    <Router basepath="recipe">
      <Recipe path="/" />
      <Recipe path="/:recipeId/latest" exact />
      <Recipe path="/:recipeId/:versionNumber" />
      <RecipeForms path="/new" exact title="Create new recipe" />
      <RecipeForms path="/:recipeId/edit" exact title="Edit recipe" />
      <RecipeForms
        path="/:recipeId/variant"
        exact
        title="Create a new variant of recipe"
      />
    </Router>
  )
}

export default RecipeRoutes
