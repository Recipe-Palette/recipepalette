/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import Title from '../components/title'
import RecipeForm from '../components/recipe-form'

// used for recipe form pages like edit/new/variant
const RecipeFormTemplate = ({ title, recipeId }) => {
  console.log(recipeId) // TODO: use this id to fetch data and populate the form
  return (
    <Layout location={location}>
      <Title sx={{ textAlign: `center` }}>{title}</Title>
      <RecipeForm />
    </Layout>
  )
}

export default RecipeFormTemplate
