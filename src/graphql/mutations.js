import gql from 'graphql-tag'

const UPSERT_USERNAME = gql`
  mutation UpsertUsername($userId: String!, $name: String!) {
    update_user(where: { id: { _eq: $userId } }, _set: { name: $name }) {
      affected_rows
      returning {
        name
      }
    }
  }
`

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

const UPSERT_UPVOTE = gql`
  mutation UpsertUpvote(
    $user_id: String!
    $recipe_id: Int!
    $upvoted: Boolean!
  ) {
    insert_upvote(
      objects: { recipe_id: $recipe_id, user_id: $user_id, upvoted: $upvoted }
      on_conflict: {
        constraint: upvote_recipe_id_user_id_key
        update_columns: upvoted
      }
    ) {
      affected_rows
      returning {
        id
        upvoted
        recipe_id
        user_id
      }
    }
  }
`

const UPSERT_RECIPE = gql`
  mutation UpsertRecipe(
    $objects: [recipe_version_insert_input!]!
    $recipe_id: Int!
  ) {
    delete_tag_recipe(where: { recipe_id: { _eq: $recipe_id } }) {
      affected_rows
    }
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

export { UPSERT_USERNAME, UPSERT_BOOKMARK, UPSERT_UPVOTE, UPSERT_RECIPE }
