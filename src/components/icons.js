/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FiBookmark, FiHeart, FiCopy } from 'react-icons/fi'

const Bookmark = ({ filled, size }) => (
  <FiBookmark size={size} sx={{ fill: filled ? `bookmarked` : `none` }} />
)

const Heart = ({ filled, size }) => (
  <FiHeart size={size} sx={{ fill: filled ? `hearted` : `none` }} />
)

const Copy = ({ filled, size }) => (
  <FiCopy size={size} sx={{ '& rect': { fill: filled ? `copied` : `none` } }} />
)

export { Bookmark, Heart, Copy }
