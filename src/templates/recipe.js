/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Flex, Divider, Badge } from '@theme-ui/components'
import { Link } from 'gatsby'
import { FiClock } from 'react-icons/fi'
import Fraction from 'fraction.js'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { isEmpty } from 'lodash'
import { useAuth } from 'react-use-auth'

import { convertTime } from '../utils/convertTime'
import { findRecipeVersion } from '../utils/findRecipeVersion'
import { Copy } from '../components/icons'
import { NewCard, RecipeCard } from '../components/cards'
import TagBadge from '../components/tag'
import BookmarkButton from '../components/bookmark-button'
import EditButton from '../components/edit-button'
import UpvoteButton from '../components/upvote-button'
import { recipeInformationFragment } from '../graphql/fragments'
import { RecipeLoader } from '../components/recipe-loader'

const recipeQuery = gql`
  query($id: Int!) {
    recipe: recipe_by_pk(id: $id) {
      ...RecipeInformation
    }
    variants: recipe(where: { parent_id: { _eq: $id } }) {
      id

      latest {
        id
        name
        cook_time_minutes
        prep_time_minutes
        image_url
      }
    }
  }
  ${recipeInformationFragment}
`

const Icons = ({ recipe, isOwner, versionNumber }) => {
  return (
    <div
      sx={{
        display: `flex`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: [`center`, `flex-end`],
        width: [`100%`, `50%`],
        mb: `2`,
      }}
    >
      {isOwner && (
        <Flex sx={{ mr: `3`, justifyContent: `center`, alignItems: `center` }}>
          <EditButton
            size={29}
            recipeId={recipe.id}
            versionNumber={versionNumber}
          />
        </Flex>
      )}
      <Flex sx={{ mr: `3`, justifyContent: `center`, alignItems: `center` }}>
        <UpvoteButton
          size={32}
          recipeId={recipe.id}
          recipeName={recipe.version.name}
        />
      </Flex>
      <Flex sx={{ justifyContent: `center` }}>
        <BookmarkButton
          size={32}
          recipeId={recipe.id}
          recipeName={recipe.version.name}
        />
      </Flex>
    </div>
  )
}

const TimingSmall = ({ recipe }) => (
  <Flex
    sx={{
      flexDirection: `row`,
      mt: `3`,
      alignItems: `center`,
    }}
  >
    <FiClock
      size="2rem"
      sx={{ justifySelf: `flex-start`, mr: `2`, strokeWidth: 1.5 }}
    />
    <Flex
      sx={{
        flexDirection: `row`,
        justifyContent: `space-evenly`,
        width: `100%`,
      }}
    >
      <Flex
        sx={{
          flexDirection: `column`,
          width: `100%`,
          borderRight: theme => `1px solid ${theme.colors.border}`,
        }}
      >
        <h3 sx={{ textAlign: `center`, m: `0` }}>Prep</h3>
        <p sx={{ textAlign: `center`, mb: `0` }}>
          {convertTime(recipe.prep_time_minutes)}
        </p>
      </Flex>
      <Flex
        sx={{
          flexDirection: `column`,
          width: `100%`,
          borderRight: theme => `1px solid ${theme.colors.border}`,
        }}
      >
        <h3 sx={{ textAlign: `center`, m: `0` }}>Cook</h3>
        <p sx={{ textAlign: `center`, mb: `0` }}>
          {convertTime(recipe.cook_time_minutes)}
        </p>
      </Flex>

      <Flex
        sx={{
          flexDirection: `column`,
          width: `100%`,
        }}
      >
        <h3 sx={{ textAlign: `center`, m: `0` }}>Total</h3>
        <p sx={{ textAlign: `center`, mb: `0` }}>
          {convertTime(recipe.prep_time_minutes + recipe.cook_time_minutes)}
        </p>
      </Flex>
    </Flex>
  </Flex>
)

// used for all /recipe/* routes
const Recipe = ({ location, recipeId, versionNumber }) => {
  const { userId } = useAuth()
  const { data: recipeData, loading } = useQuery(recipeQuery, {
    variables: {
      id: recipeId,
    },
    fetchPolicy: 'network-only',
  })

  // stop gap loading solution
  if (loading) {
    return <RecipeLoader location={location} />
  }

  const recipe = loading ? null : recipeData.recipe
  const variants = loading ? null : recipeData.variants

  // intelligently assign the recipe.version to the correct version number
  recipe.version = findRecipeVersion(
    recipe.versions,
    recipe.latest,
    versionNumber
  )

  // stop gap solution to display error if no version is found
  if (isEmpty(recipe.version)) return 'Version not found'

  const image =
    recipe.version.image_url ||
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'

  const isOwner = userId && recipe.user.id === userId
  return (
    <div>
      <Flex sx={{ flexDirection: [`column`, `row`] }}>
        <div sx={{ width: `100%`, textAlign: [`center`, `inherit`] }}>
          <h1 sx={{ mb: `1` }}>{recipe.version.name}</h1>
          <div
            sx={{
              display: `flex`,
              justifyContent: [`center`, `flex-start`],
              flexDirection: `row`,
              mt: [`2`, `0`],
              mb: `2`,
            }}
          >
            <div>{recipe.user.name}</div>
            {isOwner && (
              <Fragment>
                <div sx={{ ml: `3`, fontStyle: `italic` }}>
                  Version {recipe.version.version}
                </div>
                <div sx={{ ml: `3` }}>
                  <Link
                    sx={{ variant: `buttons.secondary` }}
                    to={`/recipe/${recipeId}/log`}
                  >
                    View edit log
                  </Link>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <Icons
          recipe={recipe}
          isOwner={isOwner}
          versionNumber={versionNumber}
        />
      </Flex>
      <div
        sx={{
          display: [`flex`, `grid`],
          gridGap: `3`,
          gridTemplateColumns: `50% 1fr`,
          flexDirection: `column`,
        }}
      >
        <div>
          <div
            sx={{
              width: `100%`,
              height: `330px`,
              background: `url(${image})`,
              backgroundSize: `cover`,
              borderRadius: `2`,
              order: 2,
              border: theme => `1px solid ${theme.colors.border}`,
            }}
          />
          <TimingSmall recipe={recipe.version} />
        </div>
        <div
          sx={{
            order: 3,
            mt: [`3`, 0],
            overflow: `hidden`,
            display: `flex`,
            flexDirection: `column`,
          }}
        >
          <Flex
            as="h2"
            sx={{ color: `text`, m: `0`, fontSize: `3`, alignItems: `center` }}
          >
            <Copy
              filled={recipe.copied}
              size="1em"
              sx={{ strokeWidth: `2.5px`, mr: `1` }}
            />
            Popular Variations{' '}
            <Badge variant="secondary">{variants.length}</Badge>
          </Flex>
          <Flex
            sx={{
              mt: `2`,
              display: `grid`,
              gridTemplateRows: `1fr`,
              gridTemplateColumns: `repeat(${variants.length +
                1}, max-content)`,
              gridGap: `2`,
              overflow: `scroll`,
              width: `100%`,
              minHeight: [120, 260],
            }}
          >
            <NewCard
              sx={{ minWidth: 175 }}
              to={`/recipe/${recipe.id}/${recipe.version.version}/variant`}
            >
              + Add New Variation
            </NewCard>
            {variants.map((variant, index) => (
              <RecipeCard key={index} recipe={variant} mini={true} />
            ))}
          </Flex>
        </div>
      </div>
      <Divider />
      <div>
        <h2 sx={{ color: `text`, width: `100%`, my: `2` }}>Ingredients</h2>
        {recipe.version.servings !== 0 && (
          <h3
            sx={{
              width: `100%`,
              mt: `0`,
              mb: `2`,
            }}
          >
            Servings: {recipe.version && recipe.version.servings}
          </h3>
        )}
        <ul sx={{ columnCount: 2, listStyle: `none`, pl: `0` }}>
          {recipe.version.ingredients.map((ingredient, index) => {
            let amount = ''
            if (ingredient.amount !== 0) {
              amount = new Fraction(ingredient.amount)
              amount = amount.toFraction(true)
            }
            return (
              <li
                key={index}
                sx={{ mb: `3`, display: `inline-block`, width: `100%` }}
              >
                {amount} {ingredient.unit} {ingredient.name}
              </li>
            )
          })}
        </ul>
      </div>
      <Divider />
      <div>
        <h2 sx={{ color: `text` }}>Instructions</h2>
        <ol sx={{ pl: `3` }}>
          {recipe.version.instructions &&
            recipe.version.instructions.map((instruction, index) => (
              <li key={index} sx={{ mb: `3` }}>
                {instruction}
              </li>
            ))}
        </ol>
      </div>
      <Divider />
      <div>
        <h2 sx={{ color: `text` }}>Tags</h2>
        {recipe.tags.map((recipe_tag, index) => (
          <TagBadge key={index} name={recipe_tag.tag.name} sx={{ mr: `2` }} />
        ))}
        {recipe && recipe.tags && !recipe.tags.length && (
          <span sx={{ fontSize: `1`, color: `gray` }}>
            Looks like this recipe doesn't have any tags
          </span>
        )}
      </div>
    </div>
  )
}

export default Recipe
