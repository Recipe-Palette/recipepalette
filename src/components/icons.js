/** @jsx jsx */
import { jsx } from 'theme-ui'
import { lighten } from '@theme-ui/color'
import {
  FiBookmark,
  FiEdit,
  FiHeart,
  FiCopy,
  FiBookOpen,
  FiUser,
  FiSearch,
  FiTrash2,
} from 'react-icons/fi'

const STROKE_WIDTH = 1.5

const Bookmark = ({ filled, size, ...props }) => (
  <FiBookmark
    size={size}
    sx={{ fill: filled ? `bookmarked` : `none`, strokeWidth: STROKE_WIDTH }}
    {...props}
  />
)

const Heart = ({ filled, size, ...props }) => (
  <FiHeart
    size={size}
    sx={{ fill: filled ? `hearted` : `none`, strokeWidth: STROKE_WIDTH }}
    {...props}
  />
)

const Copy = ({ filled, size, ...props }) => (
  <FiCopy
    size={size}
    sx={{
      '& rect': { fill: filled ? `copied` : `none` },
      strokeWidth: STROKE_WIDTH,
    }}
    {...props}
  />
)

const Trash = ({ size, ...props }) => <FiTrash2 size={size} {...props} />

const Book = ({ filled, size, ...props }) => (
  <FiBookOpen
    size={size}
    sx={{
      '& path': { fill: filled ? lighten(`primary`, 0.1) : `none` },
      strokeWidth: STROKE_WIDTH,
    }}
    {...props}
  />
)

const Profile = ({ size, filled, ...props }) => (
  <FiUser
    size={size}
    sx={{
      '& path, & circle': { fill: filled ? lighten(`primary`, 0.25) : `none` },
      strokeWidth: STROKE_WIDTH,
    }}
    {...props}
  />
)

const Search = ({ size, filled, ...props }) => (
  <FiSearch
    size={size}
    sx={{
      '& rect': { fill: filled ? `copied` : `none` },
      strokeWidth: STROKE_WIDTH,
    }}
    {...props}
  />
)

const Edit = ({ size, filled, ...props }) => (
  <FiEdit
    size={size}
    sx={{
      '& rect': { fill: filled ? `copied` : `none` },
      strokeWidth: STROKE_WIDTH,
    }}
    {...props}
  />
)

export { Bookmark, Edit, Heart, Trash, Copy, Book, Profile, Search }
