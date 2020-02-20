import { parseTime } from './parseTime'

const createRecipeObject = (
  values,
  recipe_id,
  userId,
  version,
  log,
  imageUrl,
  parent_id
) => {
  const { tags } = values
  const instructions = values.instructions.split('\n')
  const prep_time_minutes = parseTime(values.prep_time)
  const cook_time_minutes = parseTime(values.cook_time)
  const latest_version = version + 1
  const ingredients = {
    data: values.ingredients.map(ingredient => {
      if (ingredient.amount.toString().includes('/')) {
        let pre = 0
        let post = ingredient.amount
        if (ingredient.amount.toString().includes(' ')) {
          ;[pre, post] = ingredient.amount.toString().split(' ')
        }
        const [a, b] = post.toString().split('/')
        ingredient.amount = Number(pre)
        ingredient.amount += Number(a / b)
      }
      return ingredient
    }),
  }

  const on_conflict = {
    constraint: 'recipe_info_pkey',
    update_columns: ['latest_version', 'user_id', 'private'],
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
    image_url: imageUrl,
    log,
    notes: values.notes,
  }

  if (recipe_id) {
    recipe.data.id = recipe_id
  }

  if (values.private) {
    recipe.data.private = values.private
  }

  if (tags.length > 0) {
    const tagData = {
      data: tags.filter(Boolean).map(tag => ({
        tag: {
          data: {
            name: tag.toLowerCase(),
          },
          on_conflict: {
            constraint: 'tag_value_key',
            update_columns: 'name',
          },
        },
      })),
      on_conflict: {
        constraint: 'tag_recipe_tag_id_recipe_id_key',
        update_columns: ['tag_id', 'recipe_id'],
      },
    }

    recipe.data.tags = tagData
  }

  if (parent_id) {
    recipe.data.parent_id = parent_id
  }

  // if (imageUrl.length > 0) {
  //   recipe.data.image_url = imageUrl
  // }

  recipe.data.user_id = userId
  recipe.data.latest_version = latest_version

  return recipeVersion
}

export { createRecipeObject }
