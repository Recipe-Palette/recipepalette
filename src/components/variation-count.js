/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'
import gql from 'graphql-tag'

const variationCountQuery = gql`
  query($recipeId: Int!) {
    recipe_aggregate(where: { parent_id: { _eq: $recipeId } }) {
      aggregate {
        count
      }
    }
  }
`

const VariationCount = ({ recipeId }) => {
  const { data: variationData } = useQuery(variationCountQuery, {
    variables: {
      recipeId,
    },
  })

  const variationCount = get(
    variationData,
    `recipe_aggregate.aggregate.count`,
    0
  )

  return <span>{variationCount}</span>
}

export default VariationCount
