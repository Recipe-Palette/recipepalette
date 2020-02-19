/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input, Button } from '@theme-ui/components'
import { lighten } from '@theme-ui/color'

import { Search } from './icons'
import TagsDropdown from './tags-dropdown'
import IngredientsSelect from './ingredients-select'
import CreatableInputOnly from './creatable-multi-input'

const SearchForm = ({ setDrawerIsOpen, ...props }) => {
  const [isFocussed, setIsFocussed] = useState(false)

  return (
    <Formik
      initialValues={{
        search: '',
        ingredients: [],
        tags: [],
      }}
      onSubmit={(values, { resetForm }) => {
        setDrawerIsOpen(false)
        let query = []
        if (values.search.length > 0) {
          query.push(`q=${values.search}`)
        }

        if (values.ingredients.length > 0) {
          const ingredients = values.ingredients
            .map(({ value }) => value)
            .join(',')
          query.push(`ingredients=${ingredients}`)
        }

        if (values.tags.length > 0) {
          const tags = values.tags.map(({ value }) => value).join(',')
          query.push(`tags=${tags}`)
        }
        query = query.length > 0 ? query.join('&') : ''

        navigate(`/search/?${query}`)

        resetForm()
        // values.search = ''
      }}
    >
      {({
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form {...props}>
          <div
            sx={{
              display: `grid`,
              gridTemplateColumns: [`1fr`, `1fr 1fr`],
              gridColumnGap: `3`,
              pb: `3`,
            }}
          >
            <Label
              sx={{
                display: `flex`,
                alignItems: `center`,
                boxShadow: theme =>
                  isFocussed
                    ? `0px 0px 0px 3px ${theme.colors.accent}`
                    : `none`,
                bg: lighten(`border`, 0.075),
                p: `2`,
                borderRadius: `2`,
                my: `0`,
                transition: `0.15s all ease-in-out`,
                gridColumn: `1 / 3`,
                // ...labelSx,
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
            <div sx={{ gridColumn: 1 }}>
              <Label htmlFor="ingredients">Ingredients</Label>
              <IngredientsSelect
                value={values.ingredients}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.ingredients}
                error={errors.ingredients}
              />
              {/* <Select
                options={[{ value: 'ingredient 1', label: 'ingredient 1' }]}
                sx={{ width: `100%` }}
              /> */}
            </div>
            <div sx={{ gridColumn: [1, 2] }}>
              <Label htmlFor="tags">Tags</Label>
              <TagsDropdown
                // id="tags"
                value={values.tags}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                touched={touched.tags}
                error={errors.tags}
                // options={tags.length > 0 ? tags : []}
              />
            </div>
          </div>
          <div sx={{ display: `flex`, justifyContent: `flex-end` }}>
            <Button type="submit" sx={{ variant: `buttons.submit` }}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SearchForm
