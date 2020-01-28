import { parseTime } from './parseTime'

const createRecipeObject = (values, recipe_id, userId, version, imageUrl) => {
  const instructions = values.instructions.split('\n')
  const prep_time_minutes = parseTime(values.prep_time)
  const cook_time_minutes = parseTime(values.cook_time)
  const latest_version = version + 1
  const ingredients = {
    data: values.ingredients,
  }

  const on_conflict = {
    constraint: 'recipe_info_pkey',
    update_columns: ['latest_version', 'user_id', 'image_url', 'private'],
  }
  const recipe = { data: {}, on_conflict }
  const recipeVersion = {
    recipe,
    prep_time_minutes,
    cook_time_minutes,
    ingredients,
    instructions,
    version: latest_version,
    name: values.name,
    servings: values.servings,
  }

  if (recipe_id) {
    recipe.data.id = recipe_id
  }

  if (values.private) {
    recipe.data.private = values.private
  }

  if (imageUrl.length > 0) {
    recipe.data.image_url = imageUrl
  }

  recipe.data.user_id = userId
  recipe.data.latest_version = latest_version

  return recipeVersion
}

export { createRecipeObject }