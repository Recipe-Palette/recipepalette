/* eslint-disable no-unused-vars */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Label, Input, Container } from '@theme-ui/components'
import { lighten } from '@theme-ui/color'
import Select from 'react-select'

import { Search } from './icons'
import Title from './title'
import CustomDropdown from './custom-dropdown'

// import SearchBar from './search-bar'

const SearchDrawer = props => {
  const [isFocussed, setIsFocussed] = useState(false)
  return (
    <div
      sx={{
        position: `absolute`,
        display: `flex`,
        zIndex: 1000,
        width: `100%`,
        bg: `background`,
        top: `80px`,
        boxShadow: `0px 0px 6px 2px rgba(187,187,187,0.2)`,
        transition: `all .25s ease-in-out`,
      }}
      {...props}
    >
      <Container>
        <Title>Search</Title>
        <Formik
          initialValues={{
            search: '',
            ingredients: [],
            tags: [],
          }}
          onSubmit={values => {
            navigate(`/search/?q=${values.search}`)
            values.search = ''
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
                {/* <div
                  sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    flexDirection: [`column`, `row`],
                  }}
                > */}
                <div
                  sx={{ gridColumn: 1 }}
                  // sx={{
                  //   display: `flex`,
                  //   flexDirection: `column`,
                  //   width: `100%`,
                  //   mr: [`0`, `2`],
                  // }}
                >
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Select
                    options={[{ value: 'ingredient 1', label: 'ingredient 1' }]}
                    sx={{ width: `100%` }}
                  />
                </div>
                <div
                  sx={{ gridColumn: [1, 2] }}
                  // sx={{
                  //   display: `flex`,
                  //   flexDirection: `column`,
                  //   width: `100%`,
                  //   ml: [`0`, `2`],
                  // }}
                >
                  <Label htmlFor="tags">Tags</Label>
                  <CustomDropdown
                    id="tags"
                    value={values.tags}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    touched={touched.tags}
                    error={errors.tags}
                    options={[{ value: 'option 1', label: 'option 1' }]}
                  />
                  {/* <Select
                    options={[{ value: 'option 1', label: 'option 1' }]}
                    sx={{ width: `100%` }}
                  /> */}
                  {/* </div> */}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  )
}

export default SearchDrawer
