/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import { Search } from './icons'
import { lighten } from '@theme-ui/color'

const SearchBar = () => {
  const [isFocussed, setIsFocussed] = useState(false)

  return (
    <form>
      <label
        sx={{
          display: `flex`,
          alignItems: `center`,
          boxShadow: theme =>
            isFocussed ? `0px 0px 2px 2px ${theme.colors.primary}` : `none`,
          bg: lighten(`border`, 0.075),
          p: `1`,
          borderRadius: `2`,
        }}
      >
        <div sx={{ ml: `2`, display: `flex`, alignItems: `center` }}>
          <Search size="1.5rem" />
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
          }}
          onFocus={() => setIsFocussed(true)}
          onBlur={() => setIsFocussed(false)}
        />
      </label>
    </form>
  )
}

export default SearchBar
