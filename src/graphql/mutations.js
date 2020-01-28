import gql from 'graphql-tag'

const UPSERT_BOOKMARK = gql`
  mutation UpsertBookmark(
    $user_id: String!
    $recipe_id: Int!
    $bookmarked: Boolean!
  ) {
    insert_bookmark(
      objects: {
        recipe_id: $recipe_id
        user_id: $user_id
        bookmarked: $bookmarked
      }
      on_conflict: {
        constraint: bookmark_recipe_id_user_id_key
        update_columns: bookmarked
      }
    ) {
      affected_rows
      returning {
        id
        bookmarked
        recipe_id
        user_id
      }
    }
  }
`

const UPSERT_RECIPE = gql`
  mutation UpsertRecipe($objects: [recipe_version_insert_input!]!) {
    insert_recipe_version(objects: $objects) {
      returning {
        id
        name
        recipe {
          id
        }
      }
    }
  }
`

export { UPSERT_BOOKMARK, UPSERT_RECIPE }
