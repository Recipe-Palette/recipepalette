export const createSearchClause = parsedSearch => {
  const { q, ingredients, tags } = parsedSearch
  const whereClause = {}
  const _and = []

  console.log(parsedSearch)
  if (q) {
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

export const generateURLParams = values => {
  let query = []
  if (values.search.length > 0) {
    query.push(`q=${values.search}`)
  }

  if (values.ingredients && values.ingredients.length > 0) {
    const ingredients = values.ingredients.map(({ value }) => value).join(',')
    query.push(`ingredients=${ingredients}`)
  }

  if (values.tags && values.tags.length > 0) {
    const tags = values.tags.map(({ value }) => value).join(',')
    query.push(`tags=${tags}`)
  }
  query = query.length > 0 ? query.join('&') : ''

  return query
}
