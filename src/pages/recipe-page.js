/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Flex } from '@theme-ui/components'
import { FiClock } from 'react-icons/fi'
import Fraction from 'fraction.js'

import { convertTime } from '../utils/convertTime'
import Layout from '../components/layout'
import { Heart, Copy, Bookmark } from '../components/icons'

import recipes from '../../data/recipes'

const Icons = ({ recipe }) => (
  <div
    sx={{
      my: `2`,
      mb: [`3`, `inherit`],
      order: 1,
      justifyContent: [`space-evenly`, `initial`],
      width: `100%`,
      display: [`grid`, `flex`],
      gridTemplateColumns: `repeat(3, 1fr)`,
    }}
  >
    <Flex
      sx={{ mr: [`0`, `4`], alignItems: `center`, justifyContent: `center` }}
    >
      <Heart filled={recipe.hearted} size="2em" />{' '}
      <h2 sx={{ my: `0`, ml: `1` }}>{recipe.hearts}</h2>
    </Flex>
    <Flex sx={{ alignItems: `center`, justifyContent: `center` }}>
      <Copy filled={recipe.copied} size="2em" />{' '}
      <h2 sx={{ my: `0`, ml: `1` }}>{recipe.copies}</h2>
    </Flex>
    <Flex
      sx={{ display: [`inherit`, `none`, `none`], justifyContent: `center` }}
    >
      <Bookmark filled={recipe.bookmarked} size="2em" />
    </Flex>
  </div>
)

const Timing = ({ recipe }) => (
  <Flex
    sx={{
      flexDirection: [`row`, `column`],
      mt: [`3`, `2`],
      // justifyContent: `space-evenly`,
      alignItems: [`center`, `initial`],
    }}
  >
    <FiClock
      size="2rem"
      sx={{ display: [`initial`, `none`], justifySelf: `flex-start`, mr: `2` }}
    />
    <Flex
      sx={{
        flexDirection: [`row`, `column`],
        justifyContent: [`space-evenly`, `initial`],
        width: `100%`,
      }}
    >
      <h2 sx={{ my: `2`, display: [`none`, `initial`] }}>
        Servings: {recipe.servings}
      </h2>

      <h2
        sx={{
          my: `2`,
          fontSize: [`2`, `4`],
          width: `100%`,
          textAlign: [`center`, `left`],
          borderRight: [`1px solid #999`, `none`],
        }}
      >
        Prep<span sx={{ display: [`none`, `initial`] }}> Time</span>:{' '}
        {convertTime(recipe.prep_time)}
      </h2>
      <h2
        sx={{
          my: `2`,
          fontSize: [`2`, `4`],
          width: `100%`,
          textAlign: [`center`, `left`],
          borderRight: [`1px solid #999`, `none`],
        }}
      >
        Cook<span sx={{ display: [`none`, `initial`] }}> Time</span>:{' '}
        {convertTime(recipe.cook_time)}
      </h2>
      <h2
        sx={{
          my: `2`,
          fontSize: [`2`, `4`],
          width: `100%`,
          textAlign: [`center`, `left`],
        }}
      >
        Total<span sx={{ display: [`none`, `initial`] }}> Time</span>:{' '}
        {convertTime(recipe.time)}
      </h2>
    </Flex>
  </Flex>
)

const RecipePage = () => {
  const recipe = recipes[0]
  const image =
    recipe.img ||
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'

  return (
    <Layout>
      <div
        sx={{
          py: `4`,
        }}
      >
        <h1 sx={{ mb: `1` }}>{recipe.name}</h1>
        <p>by {recipe.author}</p>
        <div
          sx={{
            display: [`flex`, `grid`],
            gridGap: `2`,
            gridTemplateColumns: `repeat(2, 1fr)`,
            flexDirection: `column`,
          }}
        >
          <div sx={{ display: [`flex`, `none`] }}>
            <Icons recipe={recipe} />
          </div>

          <div
            sx={{
              width: [`100%`, null, `434px`],
              height: `329px`,
              background: `url(${image})`,
              backgroundSize: `cover`,
              borderRadius: `2`,
              order: 2,
            }}
          />
          <div
            sx={{
              order: 3,
              mt: [`3`, 0],
            }}
          >
            <Flex sx={{ justifyContent: `space-between` }}>
              <Link
                to="/recipe-page"
                sx={{ variant: `button.link`, width: `48%` }}
              >
                Create new version
              </Link>
              <Link
                to="/recipe-page"
                sx={{ variant: `button.link`, width: `48%` }}
              >
                Edit recipe
              </Link>
            </Flex>
            <Timing recipe={recipe} />
            <div sx={{ display: [`none`, `flex`] }}>
              <Icons recipe={recipe} />
            </div>
          </div>
        </div>
        <div>
          <Flex>
            <h2 sx={{ width: `100%`, my: `2` }}>Ingredients</h2>
            <h2
              sx={{
                display: [null, `none`],
                width: `100%`,
                textAlign: `right`,
                my: `2`,
              }}
            >
              Servings: {recipe.servings}
            </h2>
          </Flex>

          <ul sx={{ columnCount: 2, listStyle: `none`, pl: `0` }}>
            {recipe.ingredients.map((ingredient, index) => {
              let amount = new Fraction(ingredient.amount)
              amount = amount.toFraction(true)
              return (
                <li key={index}>
                  {amount} {ingredient.unit} {ingredient.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export default RecipePage
