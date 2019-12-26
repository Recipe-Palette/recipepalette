/** @jsx jsx */
import { jsx } from 'theme-ui'
import { darken } from '@theme-ui/color'
import { FiClock } from 'react-icons/fi'
import { Heart, Bookmark, Copy } from './icons'
import { Card } from '@theme-ui/components'
import { convertTime } from '../utils/convertTime'

import BackgroundImage from 'gatsby-background-image'

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
  name = `Recipe Name`,
  hearts = 5,
  copies = 5,
  time = 15,
  img = `https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80`,
  hearted = false,
  bookmarked = false,
  copied = false,
}) => {
  time = convertTime(time)
  return (
    <Card
      sx={{
        display: `grid`,
        gridTemplateRows: `125px auto 32px`,
        gridRowGap: `1`,
        position: `relative`,
        minHeight: 150,
        p: `3`,
        backgroundColor: darken(`background`, 0.01),
        transition: `0.3s all`,
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
          backgroundImage: `url(${img})`,
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
            {hearts}
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
            {copies}
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
        <Bookmark size={24} filled={bookmarked} />
      </div>
    </Card>
  )
}

const NewCard = () => (
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
      border: `1px dashed rgba(202, 204, 206, 0.6)`,
      backgroundColor: `background`,
      transition: `0.3s all`,
    }}
  >
    + Add New
  </Card>
)

export { NewCard, RecipeCard, CategoryCard }
