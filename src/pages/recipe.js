/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router } from '@reach/router'

import Recipe from '../templates/recipe'

const RecipeRoutes = () => {
  return (
    <Router basepath="recipe">
      <Recipe path="/" />
      <Recipe path="/:recipeId/latest" exact />
      <Recipe path="/:recipeId/new" exact />
      <Recipe path="/:recipeId/edit" exact />
      <Recipe path="/:recipeId/:versionNumber" />
    </Router>
  )
}

export default RecipeRoutes
