export const createSearchClause = parsedSearch => {
  const { q, ingredients, tags } = parsedSearch
  const whereClause = {}

  console.log(parsedSearch)
  if (q) {
    whereClause.latest = {
      name: {
        _ilike: `%${q}%`,
      },
    }
  }

  if (ingredients) {
    let ingredientQuery = ingredients
    if (typeof ingredients === 'object') {
      ingredientQuery = ingredients.join('|')
    }
    whereClause.ingredients = {
      name: {
        _similar: `%(${ingredientQuery})%`,
      },
    }
  }

  if (tags) {
    let tagsQuery = tags
    if (typeof tags === 'object') {
      tagsQuery = tags.join('|')
    }
    whereClause.tags = {
      tag: {
        name: {
          _similar: `%(${tagsQuery})%`,
        },
      },
    }
  }

  console.log(JSON.stringify(whereClause))

  return whereClause
}
