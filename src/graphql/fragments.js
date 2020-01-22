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
    upvotes
    private
    variation_count
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
  }
  ${versionInfoFragment}
`

export { versionInfoFragment, recipeInformationFragment }
