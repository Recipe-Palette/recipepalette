/** @jsx jsx */
import { jsx } from 'theme-ui'
import queryString from 'query-string'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import Layout from '../components/layout'
import Title from '../components/title'
import { RecipeCard } from '../components/cards'
import {
  bookmarkInformationFragment,
  recipeCardInformationFragment,
} from '../graphql/fragments'

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

// Function to dynamically create where clause based on query string inputs
const createWhereClase = parsedSearch => {
  const { q, ingredients } = parsedSearch
  const whereClause = {}
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

  return whereClause
}

const Search = ({ location }) => {
  const { userId } = useAuth()
  const parsedSearch = queryString.parse(location.search, {
    arrayFormat: 'comma',
  })
  const { q } = parsedSearch
  const whereClause = createWhereClase(parsedSearch)

  const { data: searchData, loading } = useQuery(SEARCH_QUERY, {
    variables: {
      whereClause,
      user_id: userId || '',
    },
  })

  if (loading) {
    return null
  }

  return (
    <Layout location={location}>
      <div sx={{ py: `4` }}>
        <Title>Search results for {q}</Title>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: [`repeat(auto-fit, minmax(275px, 1fr))`],
            gridAutoFlow: `row`,
            gridGap: `3`,
            mb: `4`,
          }}
        >
          {searchData.recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Search
