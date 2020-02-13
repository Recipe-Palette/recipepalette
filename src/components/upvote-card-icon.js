/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heart } from './icons'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'
import gql from 'graphql-tag'
import React from 'react'

import { useAuth } from 'react-use-auth'
import UpvoteCount from './upvote-count'
import { upvoteInformationFragment } from '../graphql/fragments'

const upvoteQuery = gql`
  query($recipeId: Int!, $userId: String) {
    upvote(
      where: { recipe_id: { _eq: $recipeId }, user_id: { _eq: $userId } }
    ) {
      ...UpvoteInformation
    }
  }

  ${upvoteInformationFragment}
`

const UpvoteCardIcon = ({ size = 24, recipeId }) => {
  const { userId } = useAuth()
  const { data: upvoteData } = useQuery(upvoteQuery, {
    variables: {
      recipeId,
      userId,
    },
    skip: !userId,
  })
  const upvoted = get(upvoteData, `upvote[0].upvoted`, false)

  return (
    <React.Fragment>
      <div sx={{ display: `flex` }}>
        <Heart sx={{ padding: `2px` }} size={size} filled={upvoted} />
      </div>
      <UpvoteCount recipeId={recipeId} />
    </React.Fragment>
  )
}

export default UpvoteCardIcon
