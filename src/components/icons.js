/** @jsx jsx */
import { jsx } from 'theme-ui'
import { lighten } from '@theme-ui/color'
import {
  FiBookmark,
  FiHeart,
  FiCopy,
  FiBookOpen,
  FiUser,
  FiSearch,
} from 'react-icons/fi'

const Bookmark = ({ filled, size }) => (
  <FiBookmark size={size} sx={{ fill: filled ? `bookmarked` : `none` }} />
)

const Heart = ({ filled, size }) => (
  <FiHeart size={size} sx={{ fill: filled ? `hearted` : `none` }} />
)

const Copy = ({ filled, size }) => (
  <FiCopy size={size} sx={{ '& rect': { fill: filled ? `copied` : `none` } }} />
)

const Book = ({ filled, size }) => (
  <FiBookOpen
    size={size}
    sx={{ '& path': { fill: filled ? lighten(`primary`, 0.1) : `none` } }}
  />
)

const Profile = ({ size, filled }) => (
  <FiUser
    size={size}
    sx={{
      '& path, & circle': { fill: filled ? lighten(`primary`, 0.25) : `none` },
    }}
  />
)

const Search = ({ size, filled }) => (
  <FiSearch
    size={size}
    sx={{
      '& rect': { fill: filled ? `copied` : `none` },
    }}
  />
)

export { Bookmark, Heart, Copy, Book, Profile, Search }
