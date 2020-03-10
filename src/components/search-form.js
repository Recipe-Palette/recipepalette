/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input, Button } from '@theme-ui/components'

import TagsDropdown from './tags-dropdown'
import IngredientsSelect from './ingredients-select'
import { generateURLParams } from '../utils/search'

const SearchForm = ({ toggleDrawer, values: prevValues, ...props }) => {
  return (
    <Formik
      initialValues={{
        search: prevValues && prevValues.search ? prevValues.search : '',
        ingredients:
          prevValues && prevValues.ingredients ? prevValues.ingredients : [],
        tags: prevValues && prevValues.tags ? prevValues.tags : [],
      }}
      onSubmit={(values, { resetForm }) => {
        const query = generateURLParams(values)
        if (toggleDrawer) {
          toggleDrawer()
        }
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
                  id="search"
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
                  name="ingredients"
                  id="ingredients"
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
                  name="tags"
                  id="tags"
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
