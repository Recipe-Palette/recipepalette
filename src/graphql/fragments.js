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
    latest_version
    latest {
      ...VersionInformation
    }
    versions {
      ...VersionInformation
    }
    user {
      name
    }
    tags {
      tag {
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
    latest {
      name
      prep_time_minutes
      cook_time_minutes
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
