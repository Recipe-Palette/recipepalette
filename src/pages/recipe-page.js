/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Link } from 'gatsby'
import { Flex, Divider } from '@theme-ui/components'
import { FiClock } from 'react-icons/fi'
import Fraction from 'fraction.js'

import { convertTime } from '../utils/convertTime'
import Layout from '../components/layout'
import { Heart, Copy, Bookmark } from '../components/icons'
import { RecipeCard } from '../components/cards'

import recipes from '../../data/recipes'

const Icons = ({ recipe }) => (
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
      <Bookmark filled={recipe.bookmarked} size="2em" />
    </Flex>
  </div>
)

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
          {convertTime(recipe.prep_time)}
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
          {convertTime(recipe.cook_time)}
        </p>
      </Flex>

      <Flex
        sx={{
          flexDirection: `column`,
          width: `100%`,
        }}
      >
        <h3 sx={{ textAlign: `center`, m: `0` }}>Total</h3>
        <p sx={{ textAlign: `center`, mb: `0` }}>{convertTime(recipe.time)}</p>
      </Flex>
    </Flex>
  </Flex>
)

const RecipePage = ({ location }) => {
  const recipe = recipes[0]
  const [servings] = useState(recipe.servings)

  const image =
    recipe.img ||
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'

  return (
    <Layout location={location}>
      <div
        sx={{
          py: `4`,
        }}
      >
        <Flex sx={{ flexDirection: [`column`, `row`] }}>
          <div sx={{ width: `100%` }}>
            <h1 sx={{ mb: `1` }}>{recipe.name}</h1>
            <p>by {recipe.author}</p>
          </div>
          <Icons recipe={recipe} />
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
            <TimingSmall recipe={recipe} />
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
              <Link
                to="/recipe-page"
                sx={{ variant: `buttons.link`, width: `48%` }}
              >
                Create new version
              </Link>
              <Link
                to="/recipe-page"
                sx={{ variant: `buttons.link`, width: `48%` }}
              >
                Edit recipe
              </Link>
            </Flex>

            <div>
              <h2 sx={{ mb: `0` }}>Popular Versions</h2>
              <Flex
                sx={{
                  overflow: `scroll`,
                  width: `100%`,
                }}
              >
                {recipes.map((recipeVersion, index) => (
                  <RecipeCard key={index} {...recipeVersion} mini={true} />
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
            Servings: {servings}
          </h3>

          <ul sx={{ columnCount: 2, listStyle: `none`, pl: `0` }}>
            {recipe.ingredients.map((ingredient, index) => {
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
            {recipe.instructions.map((instruction, index) => (
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

export default RecipePage
