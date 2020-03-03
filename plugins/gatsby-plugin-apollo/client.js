/* eslint-disable import/no-extraneous-dependencies */
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  request: operation => {
    const isBrowser = typeof window !== 'undefined'
    const token = isBrowser ? localStorage.getItem('token') : null
    operation.setContext({
      uri:
        process.env.GATSBY_HASURA_URL ||
        'https://recipe-palette-dev.herokuapp.com/v1/graphql',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        // this auth header allows public database read access to hasura,
        // specific database level permissions are configured for other
        // CRUD operations, this is a solution for db access as we store
        // no sensitive information at the time of writing
        'x-hasura-admin-secret': 'Something 2 think about!',
      },
      fetch,
    })
  },
})
