/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input } from '@theme-ui/components'

import { Search } from './icons'
import { lighten } from '@theme-ui/color'

const SearchBar = ({ labelSx, ...props }) => {
  const [isFocussed, setIsFocussed] = useState(false)

  return (
    <Formik
      initialValues={{
        search: '',
      }}
      onSubmit={values => {
        navigate(`/search/?q=${values.search}`)
      }}
    >
      {({ values, handleChange }) => (
        <Form {...props}>
          <Label
            sx={{
              display: `flex`,
              alignItems: `center`,
              boxShadow: theme =>
                isFocussed ? `0px 0px 0px 3px ${theme.colors.accent}` : `none`,
              bg: lighten(`border`, 0.075),
              p: `2`,
              borderRadius: `2`,
              my: `0`,
              transition: `0.15s all ease-in-out`,
              ...labelSx,
            }}
          >
            <div sx={{ ml: `1`, display: `flex`, alignItems: `center` }}>
              <Search size="1.25rem" sx={{ color: `gray` }} />
            </div>
            <Input
              type="text"
              placeholder="Search for a recipe"
              name="search"
              value={values.search}
              onChange={handleChange}
              sx={{
                color: `text`,
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
                p: `0`,
              }}
              onFocus={() => setIsFocussed(true)}
              onBlur={() => setIsFocussed(false)}
            />
          </Label>
        </Form>
      )}
    </Formik>
  )
}

export default SearchBar
