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
import SearchBar from '../components/search-bar'
import { createSearchClause } from '../utils/createSearchClause'

const SEARCH_QUERY = gql`
  query SearchQuery($whereClause: recipe_bool_exp!, $user_id: String!) {
    recipes: recipe(distinct_on: id, where: $whereClause) {
      ...RecipeCardInformation
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        ...BookmarkInformation
      }
    }
  }
  ${bookmarkInformationFragment}
  ${recipeCardInformationFragment}
`

const Search = ({ location }) => {
  const { userId } = useAuth()
  const parsedSearch = queryString.parse(location.search, {
    arrayFormat: 'comma',
  })
  const { q } = parsedSearch
  const whereClause = createSearchClause(parsedSearch)

  const { data: searchData, loading } = useQuery(SEARCH_QUERY, {
    variables: {
      whereClause,
      user_id: userId || '',
    },
  })

  console.log(parsedSearch)

  return isEmpty(parsedSearch) ? (
    <div sx={{ py: `4` }}>
      <Title>Search for Recipes</Title>
      <p>
        You can try searching "Chocolate Chip Cookies", or just "Cookies",
        recipe titles across our entire database will be returned to browse,
        bookmark, and edit.
      </p>
      <SearchBar />
    </div>
  ) : (
    <div sx={{ py: `4` }}>
      <Title>Search results for {q}</Title>
      {loading ? (
        <RecipeCardGridLoader />
      ) : (
        <CardGrid recipes={searchData.recipes} />
      )}
    </div>
  )
}

export default Search
