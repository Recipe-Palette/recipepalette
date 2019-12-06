/* eslint-disable no-console */
/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Title from '../components/title'
import Layout from '../components/layout'
import { GenericCard } from '../components/cards'

const UsersQuery = gql`
  query {
    users {
      id
      name
    }
  }
`

export default () => {
  const { data: usersData, loading } = useQuery(UsersQuery)
  console.log(usersData)
  console.log(loading)

  return (
    <Layout>
      <div
        sx={{
          textAlign: `center`,
          mt: `6`,
        }}
      >
        <Title>The best way to keep track of recipes</Title>
        <input
          sx={{ px: `3`, py: `2`, mb: `6`, fontSize: `3`, minWidth: `75%` }}
          placeholder="Find a recipe..."
        />
      </div>
      <h2>Explore Recipes</h2>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(175px, 1fr))`,
          gridAutoFlow: `row`,
          gridGap: `2`,
          mb: `4`,
        }}
      >
        <GenericCard name="Appetizers" />
        <GenericCard name="Bread" />
        <GenericCard name="Desserts" />
        <GenericCard name="Breakfast" />
        <GenericCard name="Pasta" />
      </div>
    </Layout>
  )
}
