/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router } from '@reach/router'

import Log from '../templates/log'
import Recipe from '../templates/recipe'
import RecipeForms from '../templates/recipe-forms'

const RecipeRoutes = () => {
  return (
    <Router basepath="recipe">
      <Recipe path="/" />
      <Log path="/:recipeId/log" />
      <Recipe path="/:recipeId/:versionNumber" />
      <RecipeForms path="/new" exact title="Create new recipe" />
      <RecipeForms
        path="/:recipeId/:versionNumber/edit"
        exact
        title="Edit recipe"
        type="edit"
      />
      <RecipeForms
        path="/:recipeId/:versionNumber/variant"
        exact
        title="Create a new version of recipe"
        type="variant"
      />
    </Router>
  )
}

export default RecipeRoutes
