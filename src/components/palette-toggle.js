/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import { alpha } from '@theme-ui/color'
import { Link } from 'gatsby'
import { FiBook, FiBookmark, FiHeart, FiUser } from 'react-icons/fi'

const PaletteToggle = ({ location }) => (
  <Flex
    as="nav"
    sx={{
      width: '100%',
      mb: `3`,
      display: [`none`, `flex`],
      '*+*': { ml: `2` },
    }}
  >
    <Link
      to="/palette/recipes"
      sx={{
        px: `3`,
        py: `2`,
        display: `flex`,
        alignItems: `center`,
        textAlign: 'center',
        textDecoration: `none`,
        borderRadius: `2`,
        transition: `0.15s all ease-in-out`,
        color: location.pathname.includes('recipes') ? `primary` : `gray`,
        fontWeight: location.pathname.includes('recipes') ? `bold` : `body`,
        backgroundColor: location.pathname.includes('recipes')
          ? alpha(`primary`, 0.2)
          : `background`,
        '&:hover': {
          backgroundColor: alpha(`primary`, 0.15),
        },
      }}
    >
      <FiBook sx={{ mr: `1` }} />
      Recipes
    </Link>
    <Link
      to="/palette/hearts"
      sx={{
        px: `3`,
        py: `2`,
        display: `flex`,
        alignItems: `center`,
        textAlign: 'center',
        textDecoration: `none`,
        borderRadius: '2',
        transition: `0.15s all ease-in-out`,
        color: location.pathname.includes('hearts') ? `primary` : `gray`,
        fontWeight: location.pathname.includes('hearts') ? `bold` : `body`,
        backgroundColor: location.pathname.includes('hearts')
          ? alpha(`primary`, 0.2)
          : `background`,
        '&:hover': {
          backgroundColor: alpha(`primary`, 0.15),
        },
      }}
    >
      <FiHeart sx={{ mr: `1` }} />
      Hearts
    </Link>
    <Link
      to="/palette/bookmarks"
      sx={{
        px: `3`,
        py: `2`,
        display: `flex`,
        alignItems: `center`,
        textAlign: 'center',
        textDecoration: `none`,
        borderRadius: `2`,
        transition: `0.15s all ease-in-out`,
        color: location.pathname.includes('bookmarks') ? `primary` : `gray`,
        fontWeight: location.pathname.includes('bookmarks') ? `bold` : `body`,
        backgroundColor: location.pathname.includes('bookmarks')
          ? alpha(`primary`, 0.2)
          : `background`,
        '&:hover': {
          backgroundColor: alpha(`primary`, 0.15),
        },
      }}
    >
      <FiBookmark sx={{ mr: `1` }} />
      Bookmarks
    </Link>
    <Link
      to="/palette/account"
      sx={{
        px: `3`,
        py: `2`,
        display: `flex`,
        alignItems: `center`,
        textAlign: 'center',
        textDecoration: `none`,
        borderRadius: `2`,
        transition: `0.15s all ease-in-out`,
        color: location.pathname.includes('account') ? `primary` : `gray`,
        fontWeight: location.pathname.includes('account') ? `bold` : `body`,
        backgroundColor: location.pathname.includes('account')
          ? alpha(`primary`, 0.2)
          : `background`,
        '&:hover': {
          backgroundColor: alpha(`primary`, 0.15),
        },
      }}
    >
      <FiUser sx={{ mr: `1` }} />
      Account
    </Link>
  </Flex>
)

export default PaletteToggle
