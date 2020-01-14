/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from '../components/layout'
import RecipeForm from '../components/recipe-form'
import Title from '../components/title'

const AddRecipe = ({ location }) => (
  <Layout location={location}>
    <Title>Create new recipe</Title>
    <RecipeForm />
  </Layout>
)

export default AddRecipe
