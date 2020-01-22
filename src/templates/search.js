/** @jsx jsx */
import { jsx } from 'theme-ui'
import queryString from 'query-string'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'

import Layout from '../components/layout'
import Title from '../components/title'
import { RecipeCard } from '../components/cards'
import { bookmarkInformationFragment } from '../graphql/fragments'

const SEARCH_QUERY = gql`
  query SearchQuery($q: String!, $user_id: String!) {
    recipes: recipe(
      distinct_on: id
      where: { latest: { name: { _ilike: $q } } }
    ) {
      id
      upvotes
      variation_count
      image_url
      latest {
        name
        prep_time_minutes
        cook_time_minutes
      }
      bookmarks(where: { user_id: { _eq: $user_id } }) {
        ...BookmarkInformation
      }
    }
  }
  ${bookmarkInformationFragment}
`

const Search = ({ location }) => {
  const { userId } = useAuth()
  const parsedSearch = queryString.parse(location.search)
  const { q } = parsedSearch
  const { data: searchData, loading } = useQuery(SEARCH_QUERY, {
    variables: {
      q: `%${q}%`,
      user_id: userId || '',
    },
  })
  console.log(userId)
  console.log(loading)
  console.log(searchData)

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
