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
  FiTrash2,
} from 'react-icons/fi'

const Bookmark = ({ filled, size, ...props }) => (
  <FiBookmark
    size={size}
    sx={{ fill: filled ? `bookmarked` : `none` }}
    {...props}
  />
)

const Heart = ({ filled, size, ...props }) => (
  <FiHeart size={size} sx={{ fill: filled ? `hearted` : `none` }} {...props} />
)

const Copy = ({ filled, size, ...props }) => (
  <FiCopy
    size={size}
    sx={{ '& rect': { fill: filled ? `copied` : `none` } }}
    {...props}
  />
)

const Trash = ({ size, ...props }) => <FiTrash2 size={size} {...props} />

const Book = ({ filled, size, ...props }) => (
  <FiBookOpen
    size={size}
    sx={{ '& path': { fill: filled ? lighten(`primary`, 0.1) : `none` } }}
    {...props}
  />
)

const Profile = ({ size, filled, ...props }) => (
  <FiUser
    size={size}
    sx={{
      '& path, & circle': { fill: filled ? lighten(`primary`, 0.25) : `none` },
    }}
    {...props}
  />
)

const Search = ({ size, filled, ...props }) => (
  <FiSearch
    size={size}
    sx={{
      '& rect': { fill: filled ? `copied` : `none` },
    }}
    {...props}
  />
)

export { Bookmark, Heart, Copy, Trash, Book, Profile, Search }
