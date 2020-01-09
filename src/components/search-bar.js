/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import { Search } from './icons'
import { lighten } from '@theme-ui/color'

const SearchBar = ({ ...props }) => {
  const [isFocussed, setIsFocussed] = useState(false)

  return (
    <form {...props}>
      <label
        sx={{
          display: `flex`,
          alignItems: `center`,
          boxShadow: theme =>
            isFocussed ? `0px 0px 2px 2px ${theme.colors.primary}` : `none`,
          bg: lighten(`border`, 0.075),
          p: `2`,
          borderRadius: `2`,
        }}
      >
        <div sx={{ ml: `1`, display: `flex`, alignItems: `center` }}>
          <Search size="1.5rem" sx={{ color: `gray` }} />
        </div>
        <input
          type="text"
          placeholder="Search for a recipe"
          sx={{
            border: `none`,
            fontSize: `3`,
            width: `100%`,
            marginLeft: `2`,
            bg: `inherit`,
            '&:focus': {
              outline: `none`,
            },
            '&::placeholder': {
              color: `gray`,
            },
          }}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
        />
      </label>
    </form>
  )
}

export default SearchBar
