/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Link, navigate } from 'gatsby'
import { Flex, Divider, Button } from '@theme-ui/components'
import { FiClock } from 'react-icons/fi'
import Fraction from 'fraction.js'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { isEmpty } from 'lodash'
import { useAuth } from 'react-use-auth'
import { useToasts } from 'react-toast-notifications'

import { convertTime } from '../utils/convertTime'
import { findRecipeVersion } from '../utils/findRecipeVersion'
import Layout from '../components/layout'
import { Heart, Copy, Bookmark } from '../components/icons'
import { RecipeCard } from '../components/cards'
import {
  recipeInformationFragment,
  bookmarkInformationFragment,
} from '../graphql/fragments'
import { UPSERT_BOOKMARK } from '../graphql/mutations'

const recipeQuery = gql`
  query($id: Int!, $userId: String!) {
    recipe: recipe_by_pk(id: $id) {
      ...RecipeInformation
      bookmarks(where: { user_id: { _eq: $userId } }) {
        ...BookmarkInformation
      }
    }
    variants: recipe(where: { parent_id: { _eq: $id } }) {
      id
      image_url
      upvotes
      variation_count
      latest {
        name
        cook_time_minutes
        prep_time_minutes
      }
    }
  }
  ${recipeInformationFragment}
  ${bookmarkInformationFragment}
`

const Icons = ({ recipe, toggleBookmark }) => {
  const [bookmarked, setBookmarked] = useState(recipe.bookmark)
  return (
    <div
      sx={{
        my: `2`,
        mb: `3`,

        order: 1,
        justifyContent: [`space-evenly`, `space-between`],
        width: [`100%`, `50%`],
        display: [`grid`, `flex`],
        gridTemplateColumns: `repeat(3, 1fr)`,
        alignSelf: `flex-start`,
        ml: [`0`, `3`],
      }}
    >
      <Flex sx={{ mr: [`0`], alignItems: `center`, justifyContent: `center` }}>
        <Heart filled={recipe.hearted} size="2em" />{' '}
        <h2 sx={{ my: `0`, ml: `1` }}>{recipe.hearts}</h2>
      </Flex>
      <Flex sx={{ alignItems: `center`, justifyContent: `center` }}>
        <Copy filled={recipe.copied} size="2em" />{' '}
        <h2 sx={{ my: `0`, ml: `1` }}>{recipe.copies}</h2>
      </Flex>
      <Flex sx={{ justifyContent: `center` }}>
        <Bookmark
          filled={bookmarked}
          sx={{
            cursor: `pointer`,
          }}
          size="2em"
          onClick={() => {
            setBookmarked(!bookmarked)
            toggleBookmark(bookmarked)
          }}
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
    <FiClock size="2rem" sx={{ justifySelf: `flex-start`, mr: `2` }} />
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
          borderRight: `1px solid #999`,
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
          borderRight: `1px solid #999`,
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
  const { userId, isAuthenticated, login } = useAuth()
  const [upsertBookmark, { error: errorMutation }] = useMutation(
    UPSERT_BOOKMARK
  )
  const { addToast } = useToasts()

  const { data: recipeData, loading } = useQuery(recipeQuery, {
    variables: {
      id: recipeId,
      userId,
    },
  })

  const recipe = loading ? null : recipeData.recipe
  const variants = loading ? null : recipeData.variants

  // stop gap loading solution
  if (loading) {
    return null
  }

  // intelligently assign the recipe.version to the correct version number
  recipe.version = findRecipeVersion(recipe, versionNumber)

  const toggleBookmark = async bookmarked => {
    await upsertBookmark({
      variables: {
        user_id: userId,
        recipe_id: recipeId,
        bookmarked: !bookmarked,
      },
    })

    if (errorMutation) {
      addToast('Bookmark Failed to Save', { appearance: 'error' })
    } else {
      let text = ''
      if (bookmarked) {
        text = `${recipe.version.name} has been removed from bookmarks`
      } else {
        text = `${recipe.version.name} has been bookmarked`
      }

      addToast(text, { appearance: 'success' })
    }
  }

  const handleBookmarkClick = bookmarked => {
    if (isAuthenticated()) {
      toggleBookmark(bookmarked)
    } else {
      addToast(
        <span>
          Please{' '}
          <span
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'blue',
            }}
            onClick={login}
            onKeyDown={login}
          >
            login
          </span>{' '}
          to bookmark recipes
        </span>,
        { appearance: 'error' }
      )
    }
  }

  recipe.bookmark = recipe.bookmarks[0] && recipe.bookmarks[0].bookmarked

  // stop gap solution to display error if no version is found
  if (isEmpty(recipe.version)) return 'Version not found'

  const image =
    recipe.image_url ||
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'

  return (
    <Layout location={location}>
      <div>
        <Flex sx={{ flexDirection: [`column`, `row`] }}>
          <div sx={{ width: `100%` }}>
            <h1 sx={{ mb: `1` }}>{recipe.version.name}</h1>
            <div sx={{ display: `flex`, flexDirection: `row`, mb: `2` }}>
              <div>by {recipe.user.name}</div>

              <div sx={{ ml: `3` }}>Version {recipe.latest.version}</div>
              <div sx={{ ml: `3` }}>
                <Link to={`/recipe/${recipeId}/log`}>View edit log</Link>
              </div>
            </div>
          </div>
          <Icons recipe={recipe} toggleBookmark={handleBookmarkClick} />
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
              justifyContent: `space-between`,
            }}
          >
            <Flex sx={{ justifyContent: `space-between` }}>
              <Button
                onClick={() =>
                  navigate(
                    `/recipe/${recipe.id}/${versionNumber || `latest`}/variant`
                  )
                }
                sx={{ variant: `buttons.link`, width: `48%` }}
              >
                Create new version
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `/recipe/${recipe.id}/${versionNumber || `latest`}/edit`
                  )
                }
                sx={{ variant: `buttons.link`, width: `48%` }}
              >
                Edit recipe
              </Button>
            </Flex>

            <div>
              <h2 sx={{ mb: `0` }}>Popular Versions</h2>
              <Flex
                sx={{
                  overflow: `scroll`,
                  width: `100%`,
                }}
              >
                {variants.map((variant, index) => (
                  <RecipeCard key={index} recipe={variant} mini={true} />
                ))}
              </Flex>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h2 sx={{ width: `100%`, my: `2` }}>Ingredients</h2>
          <h3
            sx={{
              width: `100%`,
              mt: `0`,
              mb: `2`,
            }}
          >
            Servings: {recipe.version && recipe.version.servings}
          </h3>

          <ul sx={{ columnCount: 2, listStyle: `none`, pl: `0` }}>
            {recipe.version.ingredients.map((ingredient, index) => {
              let amount = new Fraction(ingredient.amount)
              amount = amount.toFraction(true)
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
          <h2>Instructions</h2>
          <ol sx={{ pl: `3` }}>
            {recipe.version.instructions &&
              recipe.version.instructions.map((instruction, index) => (
                <li key={index} sx={{ mb: `3` }}>
                  {instruction}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export default Recipe
