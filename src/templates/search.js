/** @jsx jsx */
import { jsx } from 'theme-ui'
import queryString from 'query-string'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'
import { isEmpty } from 'lodash'

import Title from '../components/title'
import {
  bookmarkInformationFragment,
  recipeCardInformationFragment,
} from '../graphql/fragments'
import CardGrid from '../components/card-grid'
import { RecipeCardGridLoader } from '../components/recipe-card-loader'
import { createSearchClause } from '../utils/search'
import SearchForm from '../components/search-form'

const SEARCH_QUERY = gql`
  query SearchQuery($whereClause: recipe_bool_exp!, $user_id: String!) {
    recipes: recipe(distinct_on: id, where: $whereClause) {
      ...RecipeCardInformation
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        ...BookmarkInformation
      }
    }
    tags: tag {
      name
    }
  }
  ${bookmarkInformationFragment}
  ${recipeCardInformationFragment}
`

const generateValuesFromURL = parsedSearch => {
  const { q, ingredients, tags } = parsedSearch
  const values = { search: '', ingredients: [], tags: [] }

  if (q) {
    values.search = q
  }

  if (ingredients) {
    if (typeof ingredients === 'object') {
      values.ingredients = ingredients.map(ingredient => ({
        value: ingredient,
        label: ingredient,
      }))
    } else {
      values.ingredients = [{ value: ingredients, label: ingredients }]
    }
  }

  if (tags) {
    if (typeof ingredients === 'object') {
      values.tags = tags.map(tag => ({
        value: tag,
        label: tag,
      }))
    } else {
      values.tags = [{ value: tags, label: tags }]
    }
  }

  return values
}

const Search = ({ location }) => {
  const { userId } = useAuth()
  const parsedSearch = queryString.parse(location.search, {
    arrayFormat: 'comma',
  })
  const { q } = parsedSearch
  const whereClause = createSearchClause(parsedSearch)
  const values = generateValuesFromURL(parsedSearch)

  const { data: searchData, loading } = useQuery(SEARCH_QUERY, {
    variables: {
      whereClause,
      user_id: userId || '',
    },
  })

  if (!loading && isEmpty(parsedSearch)) {
    searchData.recipes = []
  }

  return (
    <div sx={{ py: `4` }}>
      <Title>Search results{q ? ` for ${q}` : ''}</Title>
      <SearchForm values={values} />
      {loading ? (
        <RecipeCardGridLoader />
      ) : (
        <CardGrid
          recipes={searchData.recipes}
          emptyNote={`It seems we can't find any results for ${q}`}
        />
      )}
    </div>
  )
}

export default Search
