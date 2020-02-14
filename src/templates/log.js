/** @jsx jsx */
import { jsx } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Spinner } from '@theme-ui/components'
import { Fragment } from 'react'

import Title from '../components/title'
import LogTable from '../components/log-table'

const logQuery = gql`
  query($id: Int!) {
    versions: recipe_version(
      where: { recipe_id: { _eq: $id } }
      order_by: { version: desc }
    ) {
      id
      name
      version
      log
      notes
      created_at
    }
  }
`

const Log = ({ recipeId }) => {
  const { data, loading } = useQuery(logQuery, {
    variables: {
      id: recipeId,
    },
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Fragment>
      <Title>Edit Log</Title>
      {loading ? (
        <div sx={{ display: `flex`, placeContent: `center` }}>
          <Spinner />
        </div>
      ) : (
        <LogTable recipeId={recipeId} versions={data.versions} />
      )}
    </Fragment>
  )
}

export default Log
