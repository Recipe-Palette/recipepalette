export const createSearchClause = parsedSearch => {
  const { q, ingredients, tags } = parsedSearch
  const whereClause = {}
  const _and = []

  console.log(parsedSearch)
  if (q) {
    // whereClause.latest = {
    //   name: {
    //     _ilike: `%${q}%`,
    //   },
    // }

    _and.push({
      latest: {
        name: {
          _ilike: `%${q}%`,
        },
      },
    })
  }

  if (ingredients) {
    let ingredientQuery = ingredients
    if (typeof ingredients === 'object') {
      ingredientQuery = ingredients.join('|')
    }
    // whereClause.ingredients = {
    //   name: {
    //     _similar: `%(${ingredientQuery})%`,
    //   },
    // }

    _and.push({
      ingredients: {
        name: {
          _similar: `%(${ingredientQuery})%`,
        },
      },
    })
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

    _and.push({
      tags: {
        tag: {
          name: {
            _similar: `%(${tagsQuery})%`,
          },
        },
      },
    })
  }

  console.log(JSON.stringify(whereClause))

  if (_and.length > 0) {
    whereClause._and = _and
  }

  return whereClause
}
