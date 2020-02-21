import gql from 'graphql-tag'

const versionInfoFragment = gql`
  fragment VersionInformation on recipe_version {
    id
    name
    prep_time_minutes
    cook_time_minutes
    servings
    instructions
    version
    image_url
    ingredients {
      id
      name
      amount
      unit
    }
  }
`

const recipeInformationFragment = gql`
  fragment RecipeInformation on recipe {
    id
    image_url
    private
    parent_id
    latest_version
    latest {
      ...VersionInformation
    }
    versions {
      ...VersionInformation
    }
    user {
      id
      name
    }
    tags {
      tag {
        id
        name
      }
    }
  }
  ${versionInfoFragment}
`

const bookmarkInformationFragment = gql`
  fragment BookmarkInformation on bookmark {
    id
    bookmarked
  }
`

const upvoteInformationFragment = gql`
  fragment UpvoteInformation on upvote {
    id
    upvoted
  }
`

const recipeCardInformationFragment = gql`
  fragment RecipeCardInformation on recipe {
    id
    latest_version
    latest {
      id
      cook_time_minutes
      prep_time_minutes
      name
      created_at
      version
      image_url
    }
  }
`

export {
  versionInfoFragment,
  recipeInformationFragment,
  bookmarkInformationFragment,
  upvoteInformationFragment,
  recipeCardInformationFragment,
}
