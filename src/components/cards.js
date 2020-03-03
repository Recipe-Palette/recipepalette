/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Flex, Card } from '@theme-ui/components'
import { darken, lighten } from '@theme-ui/color'
import { FiClock } from 'react-icons/fi'
import { Copy } from './icons'
import { convertTime } from '../utils/convertTime'
import React from 'react'

import BackgroundImage from 'gatsby-background-image'
import BookmarkButton from './bookmark-button'
import UpvoteCardIcon from './upvote-card-icon'
import VariationCount from './variation-count'

const CategoryCard = ({ image, name }) => {
  return (
    <Link
      to={`/search/?tags=${name.toLowerCase()}`}
      sx={{ textDecoration: `none` }}
    >
      <BackgroundImage
        fluid={[
          `linear-gradient(rgba(255,255,255,.25), rgba(128,65,13,.5))`,
          image.childImageSharp.fluid,
        ]}
        sx={{
          '&::before, &::after': {
            borderRadius: `3`,
          },
        }}
      >
        <Card
          sx={{
            color: `background`,
            fontSize: `3`,
            py: `5`,
            display: `flex`,
            justifyContent: `center`,
            cursor: `pointer`,
            border: `none`,
            fontWeight: `bold`,
            textShadow: `0px 2px 12px #444`,
          }}
        >
          {name}
        </Card>
      </BackgroundImage>
    </Link>
  )
}

const RecipeCard = ({
  time = 0,
  mini = false,
  copied = false,
  recipe: {
    id,
    latest: { name, cook_time_minutes, prep_time_minutes, image_url },
    bookmarks,
  },
}) => {
  time = convertTime(cook_time_minutes + prep_time_minutes)
  return (
    <Link
      to={`/recipe/${id}/latest`}
      sx={{
        color: `text`,
        textDecoration: `none`,
        outline: `none`,
        '&:active, &:focus': {
          boxShadow: theme => `0px 0px 0px 3px ${theme.colors.accent}`,
        },
        borderRadius: `1`,
      }}
    >
      <Card
        sx={{
          display: `grid`,
          gridTemplateRows: `125px 60px auto`,
          gridRowGap: `1`,
          position: `relative`,
          minHeight: 150,
          p: `3`,
          backgroundColor: `background`,
          transition: `0.3s all`,
          variant: mini ? `cards.recipeMini` : `cards.primary`,
          '&:hover': {
            backgroundColor: darken(`background`, 0.03),
          },
        }}
      >
        <div
          sx={{
            height: 125,
            borderRadius: `1`,
            backgroundColor: lighten(`border`, 0.075),
            backgroundImage: `url(${image_url})`,
            backgroundSize: `cover`,
          }}
        />
        <div
          sx={{
            mt: `2`,
          }}
        >
          <span
            sx={{
              width: `100%`,
              fontSize: `3`,
              display: `-webkit-box`,
              WebkitBoxOrient: `vertical`,
              WebkitLineClamp: `2`,
              overflow: `hidden`,
            }}
          >
            {name}
          </span>
        </div>
        <div
          sx={{
            color: `gray`,
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `space-between`,
          }}
        >
          <div sx={{ display: `flex`, alignItems: `center` }}>
            <FiClock size={20} sx={{ strokeWidth: 1.5 }} />
            <span
              sx={{
                fontSize: `2`,
                ml: `2`,
              }}
            >
              {time}
            </span>
          </div>
          <Flex sx={{ flexDirection: `row` }}>
            <div sx={{ display: `flex`, alignItems: `center`, ml: `3` }}>
              <UpvoteCardIcon recipeId={id} />
            </div>
            <React.Fragment>
              <div sx={{ display: `flex`, alignItems: `center`, ml: `3` }}>
                <Copy size={20} filled={copied} />
                <span
                  sx={{
                    fontSize: `2`,
                    ml: `2`,
                  }}
                />
                <VariationCount recipeId={id} />
              </div>
            </React.Fragment>
          </Flex>
        </div>
        <div
          sx={{
            borderRadius: 50,
            backgroundColor: `background`,
            border: theme => `1px solid ${theme.colors.border}`,
            position: `absolute`,
            width: 36,
            height: 36,
            right: 24,
            top: 116,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
          }}
        >
          <BookmarkButton
            recipeId={id}
            recipeName={name}
            bookmarks={bookmarks}
          />
        </div>
      </Card>
    </Link>
  )
}

const NewCard = ({ to, children, ...props }) => (
  <Link
    to={to}
    sx={{
      textDecoration: `none`,
      outline: `none`,
      '&:active, &:focus': {
        boxShadow: theme => `0px 0px 0px 3px ${theme.colors.accent}`,
      },
      borderRadius: `1`,
    }}
    {...props}
  >
    <Card
      sx={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        color: `gray`,
        fontSize: `3`,
        py: `4`,
        px: `4`,
        borderRadius: `2`,
        textAlign: `center`,
        border: theme => `1px dashed ${theme.colors.border}`,
        backgroundColor: `background`,
        transition: `0.3s all`,
        height: `100%`,
        '&:hover': {
          backgroundColor: darken(`background`, 0.035),
        },
      }}
    >
      {children || `+ Add New`}
    </Card>
  </Link>
)

export { NewCard, RecipeCard, CategoryCard }
