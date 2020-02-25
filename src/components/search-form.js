/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input, Button } from '@theme-ui/components'

import { Search } from './icons'
import TagsDropdown from './tags-dropdown'
import IngredientsSelect from './ingredients-select'

const SearchForm = ({ setDrawerIsOpen, values: prevValues, ...props }) => {
  const [isFocussed, setIsFocussed] = useState(false)

  console.log('prevValues:', prevValues)

  return (
    <Formik
      initialValues={{
        search: prevValues && prevValues.search ? prevValues.search : '',
        ingredients:
          prevValues && prevValues.ingredients ? prevValues.ingredients : [],
        tags: prevValues && prevValues.tags ? prevValues.tags : [],
      }}
      onSubmit={(values, { resetForm }) => {
        console.log('values', values)
        if (setDrawerIsOpen) {
          setDrawerIsOpen(false)
        }
        let query = []
        if (values.search.length > 0) {
          query.push(`q=${values.search}`)
        }

        if (values.ingredients && values.ingredients.length > 0) {
          const ingredients = values.ingredients
            .map(({ value }) => value)
            .join(',')
          query.push(`ingredients=${ingredients}`)
        }

        if (values.tags && values.tags.length > 0) {
          const tags = values.tags.map(({ value }) => value).join(',')
          query.push(`tags=${tags}`)
        }
        query = query.length > 0 ? query.join('&') : ''

        resetForm()

        navigate(`/search/?${query}`, { state: { values } })
      }}
      enableReinitialize={true}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        setFieldValue,
        setFieldTouched,
      }) => {
        console.log('formik values:', values)
        return (
          <Form {...props}>
            <div
              sx={{
                display: `grid`,
                gridTemplateColumns: [`1fr`, `1fr 1fr`],
                gridColumnGap: [`0`, `3`],
                pb: `3`,
              }}
            >
              <Label
                sx={{
                  variant: `forms.input`,
                  display: `flex`,
                  alignItems: `center`,
                  boxShadow: theme =>
                    isFocussed
                      ? `0px 0px 0px 3px ${theme.colors.accent}`
                      : `none`,
                  borderColor: `border`,
                  p: `2`,
                  borderRadius: `2`,
                  my: `0`,
                  transition: `0.15s all ease-in-out`,
                  gridColumn: `1 / 3`,
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
              </div>
              <div sx={{ gridColumn: [1, 2] }}>
                <Label htmlFor="tags">Tags</Label>
                <TagsDropdown
                  value={values.tags}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  touched={touched.tags}
                  error={errors.tags}
                />
              </div>
            </div>
            <div sx={{ display: `flex`, justifyContent: `flex-end` }}>
              <Button type="submit" sx={{ variant: `buttons.submit` }}>
                Submit
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SearchForm
