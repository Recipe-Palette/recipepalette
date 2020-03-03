/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Router } from '@reach/router'

import Log from '../templates/log'
import Recipe from '../templates/recipe'
import RecipeForms from '../templates/recipe-forms'
import PrivateRoute from '../components/private-route'

const RecipeRoutes = () => {
  return (
    <Router basepath="recipe">
      <Recipe path="/" />
      <Log path="/:recipeId/log" />
      <Recipe path="/:recipeId/:versionNumber" />
      <RecipeForms path="/new" exact title="Create New Recipe" />
      <RecipeForms
        path="/:recipeId/:versionNumber/edit"
        exact
        title="Edit Recipe"
        type="edit"
        component={RecipeForms}
      />
      <PrivateRoute
        component={
          <RecipeForms exact title="Create New Recipe Variant" type="variant" />
        }
        path="/:recipeId/:versionNumber/variant"
      />
    </Router>
  )
}

export default RecipeRoutes
