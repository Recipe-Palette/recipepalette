/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Link } from 'gatsby'
import { darken } from '@theme-ui/color'
import { FiClock } from 'react-icons/fi'
import { Heart, Bookmark, Copy } from './icons'
import { Card } from '@theme-ui/components'
import { convertTime } from '../utils/convertTime'
import { useMutation } from '@apollo/react-hooks'
import { useToasts } from 'react-toast-notifications'

import BackgroundImage from 'gatsby-background-image'
import { UPSERT_BOOKMARK } from '../graphql/mutations'
import { useAuth } from 'react-use-auth'

const CategoryCard = ({ image, name }) => {
  return (
    <BackgroundImage
      fluid={[
        `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))`,
        image.childImageSharp.fluid,
      ]}
    >
      <Card
        sx={{
          py: `5`,
          display: `flex`,
          justifyContent: `center`,
          color: `background`,
          fontSize: `5`,
          cursor: `pointer`,
        }}
      >
        {name}
      </Card>
    </BackgroundImage>
  )
}

const RecipeCard = ({
  time = 0,
  mini = false,
  hearted = false,
  copied = false,
  recipe: {
    id,
    image_url,
    upvotes,
    variation_count,
    latest: { name, cook_time_minutes, prep_time_minutes },
    bookmarks: [bookmark],
  },
}) => {
  const [bookmarked, setBookmarked] = useState(bookmark && bookmark.bookmarked)
  const [upsertBookmark, { error: errorMutation }] = useMutation(
    UPSERT_BOOKMARK
  )
  const { userId } = useAuth()
  const { addToast } = useToasts()

  const toggleBookmark = async e => {
    e.preventDefault()
    setBookmarked(!bookmarked)
    await upsertBookmark({
      variables: {
        user_id: userId,
        recipe_id: id,
        bookmarked: !bookmarked,
      },
    })

    if (errorMutation) {
      addToast('Bookmark Failed to Save', { appearance: 'errorMutation' })
    } else {
      addToast('Saved Successfully', { appearance: 'success' })
    }
  }

  time = convertTime(cook_time_minutes + prep_time_minutes)
  return (
    <Link
      to={`/recipe/${id}/latest`}
      sx={{ color: `text`, textDecoration: `none` }}
    >
      <Card
        sx={{
          display: `grid`,
          gridTemplateRows: `125px 60px auto`,
          gridRowGap: `1`,
          position: `relative`,
          minHeight: 150,
          p: `3`,
          backgroundColor: darken(`background`, 0.01),
          transition: `0.3s all`,
          variant: mini ? `cards.recipeMini` : `cards.primary`,
          '&:hover': {
            backgroundColor: darken(`background`, 0.035),
          },
        }}
      >
        <div
          sx={{
            height: 125,
            borderRadius: `1`,
            backgroundColor: `#DDD`,
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
              fontSize: `3`,
            }}
          >
            {name}
          </span>
        </div>
        <div
          sx={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `space-between`,
          }}
        >
          <div sx={{ display: `flex`, alignItems: `center` }}>
            <Heart size={20} filled={hearted} />
            <span
              sx={{
                fontSize: `2`,
                ml: `2`,
              }}
            >
              {upvotes}
            </span>
          </div>
          <div sx={{ display: `flex`, alignItems: `center`, ml: `3` }}>
            <Copy size={20} filled={copied} />
            <span
              sx={{
                fontSize: `2`,
                ml: `2`,
              }}
            >
              {variation_count}
            </span>
          </div>
          <div sx={{ display: `flex`, alignItems: `center`, ml: `3` }}>
            <FiClock size={20} />
            <span
              sx={{
                fontSize: `2`,
                ml: `2`,
              }}
            >
              {time}
            </span>
          </div>
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
          <Bookmark size={24} filled={bookmarked} onClick={toggleBookmark} />
        </div>
      </Card>
    </Link>
  )
}

const NewCard = () => (
  <Link to="/recipe/new" sx={{ textDecoration: `none` }}>
    <Card
      sx={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        color: `border`,
        fontSize: `3`,
        py: `4`,
        px: `4`,
        borderRadius: `1`,
        textAlign: `center`,
        border: theme => `1px dashed ${theme.colors.border}`,
        backgroundColor: `background`,
        transition: `0.3s all`,
        height: `100%`,
      }}
    >
      + Add New
    </Card>
  </Link>
)

export { NewCard, RecipeCard, CategoryCard }
