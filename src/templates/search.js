/** @jsx jsx */
import { jsx } from 'theme-ui'
import queryString from 'query-string'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'
import { isEmpty } from 'lodash'
import { Input } from '@theme-ui/components'
import Select from 'react-select'

import Title from '../components/title'
import {
  bookmarkInformationFragment,
  recipeCardInformationFragment,
} from '../graphql/fragments'
import CardGrid from '../components/card-grid'
import { RecipeCardGridLoader } from '../components/recipe-card-loader'
import SearchBar from '../components/search-bar'
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

const TAGS_QUERY = gql`
  query TagsQuery {
    tags: tag {
      name
    }
  }
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

  const { data: tagsData, loading: tagsLoading } = useQuery(TAGS_QUERY)

  let tags = []

  if (!tagsLoading) {
    tags = tagsData.tags.map(tag => ({ value: tag.name, label: tag.name }))
  }

  return isEmpty(parsedSearch) ? (
    <div sx={{ py: `4` }}>
      <Title>Search for Recipes</Title>
      <div sx={{ display: `flex` }}>
        <div sx={{ width: `100%`, display: `flex`, alignItems: `center` }}>
          <h3 sx={{ margin: 0 }}>Ingredients</h3>
          <Input />
        </div>
        <div sx={{ width: `100%`, display: `flex`, alignItems: `center` }}>
          <h3 sx={{ margin: 0 }}>Tags</h3>
          <Select
            name="tags"
            isMulti
            options={tags.length > 0 ? tags : []}
            className="basic-multi-select"
            classNamePrefix="select"
            sx={{ width: `100%` }}
          />
        </div>
        <div sx={{ width: `100%`, display: `flex`, alignItems: `center` }}>
          <h3 sx={{ margin: 0 }}>Time</h3>
          <Input />
        </div>
      </div>
      <hr />
      <p>
        You can try searching "Chocolate Chip Cookies", or just "Cookies",
        recipe titles across our entire database will be returned to browse,
        bookmark, and edit.
      </p>
      <SearchBar />
    </div>
  ) : (
    <div sx={{ py: `4` }}>
      <Title>Search results{q ? ` for ${q}` : ''}</Title>
      <SearchForm values={values} />
      {loading ? (
        <RecipeCardGridLoader />
      ) : (
        <CardGrid recipes={searchData.recipes} />
      )}
    </div>
  )
}

export default Search
