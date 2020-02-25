/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input, Button } from '@theme-ui/components'

import TagsDropdown from './tags-dropdown'
import IngredientsSelect from './ingredients-select'

const SearchForm = ({ setDrawerIsOpen, values: prevValues, ...props }) => {
  return (
    <Formik
      initialValues={{
        search: prevValues && prevValues.search ? prevValues.search : '',
        ingredients:
          prevValues && prevValues.ingredients ? prevValues.ingredients : [],
        tags: prevValues && prevValues.tags ? prevValues.tags : [],
      }}
      onSubmit={(values, { resetForm }) => {
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
          <Form sx={{ pb: `3` }} {...props}>
            <div
              sx={{
                display: `grid`,
                gridTemplateColumns: [`1fr`, `1fr 1fr`],
                gridColumnGap: [`0`, `3`],
                pb: `3`,
              }}
            >
              <div sx={{ gridColumn: `1 / 3` }}>
                <Label htmlFor="search" sx={{ mt: `0` }}>
                  Name
                </Label>
                <Input
                  type="text"
                  placeholder="Search for a recipe"
                  name="search"
                  value={values.search}
                  onChange={handleChange}
                  sx={{
                    variant: `forms.input`,
                    color: `text`,
                    fontSize: `3`,
                    width: `100%`,
                    bg: `inherit`,
                    '&:focus': {
                      outline: `none`,
                    },
                    '&::placeholder': {
                      color: `gray`,
                    },
                  }}
                />
              </div>
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
