/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'
import gql from 'graphql-tag'

const upvoteCountQuery = gql`
  query upvoteCountQuery($recipeId: Int!) {
    recipe_by_pk(id: $recipeId) {
      ups_aggregate(where: { upvoted: { _eq: true } }) {
        aggregate {
          count
        }
      }
    }
  }
`

const UpvoteCount = ({ recipeId }) => {
  const { data: upvoteData } = useQuery(upvoteCountQuery, {
    variables: {
      recipeId,
    },
  })

  const upvoteCount = get(
    upvoteData,
    `recipe_by_pk.ups_aggregate.aggregate.count`,
    0
  )

  return <span>{upvoteCount}</span>
}

export default UpvoteCount
