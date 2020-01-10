/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import { Label, Input, Textarea, Button, Select } from '@theme-ui/components'
import { FiTrash2, FiPlus } from 'react-icons/fi'

const units = [
  '---',
  'tsp',
  'tsbp',
  'cup',
  'oz',
  'box',
  'pinch',
  'pint',
  'quart',
]

const UnitDropdown = props => (
  <Select {...props}>
    {units.map((unit, index) => (
      <option key={index}>{unit}</option>
    ))}
  </Select>
)

const RecipeForm = () => (
  <div sx={{ width: [`100%`, `480px`], margin: `0 auto` }}>
    <Formik
      initialValues={{
        name: 'recipe title',
        ingredients1: [
          { name: '', unit: '', amount: '' },
          { name: '', unit: '', amount: '' },
          { name: '', unit: '', amount: '' },
        ],
        ingredients: ['value 1', 'value 2'],
        instructions: '',
        prep_time: 0,
        cook_time: 0,
        servings: 0,
        image_url: '',
        private: false,
      }}
      onSubmit={values => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2))
        }, 500)
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          {/* <Field name="name" label="Recipe Name" defaultValue={values.name} /> */}
          <Label htmlFor="name">Recipe name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
          />
          {/* <FieldArray
            name="ingredients"
            render={arrayHelpers => (
              <div>
                <Label>Ingredients</Label>
                {values.ingredients &&
                  values.ingredients.length > 0 &&
                  values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Input
                        name={`ingredients.${index}`}
                        sx={{ width: `100%` }}
                        value={ingredient}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}

                <button type="button" onClick={() => arrayHelpers.push('')}>
                  Add a ingredient
                </button>
              </div>
            )}
          /> */}
          <FieldArray
            name="ingredients1"
            render={arrayHelpers => (
              <Fragment>
                <Label>Ingredients</Label>
                <div
                  sx={{
                    display: `grid`,
                    gridTemplateColumns: `15% 20% 1fr 15px`,
                    gridGap: `2`,
                    alignItems: `center`,
                  }}
                >
                  <small>Amount</small>
                  <small>Unit</small>
                  <small sx={{ gridColumn: `3 / 5` }}>Ingredient</small>
                  {values.ingredients1 &&
                    values.ingredients1.length > 0 &&
                    values.ingredients1.map((ingredient, index) => (
                      <Fragment key={index}>
                        <Input
                          type="number"
                          step={0.01}
                          min={0}
                          name={`ingredients1.${index}.amount`}
                          value={ingredient.amount}
                          onChange={handleChange}
                        />
                        <UnitDropdown
                          name={`ingredients1.${index}.unit`}
                          value={ingredient.unit}
                          onChange={handleChange}
                        />
                        {/* <Input
                          name={`ingredients1.${index}.unit`}
                          value={ingredient.unit}
                          onChange={handleChange}
                        /> */}
                        <Input
                          name={`ingredients1.${index}.name`}
                          value={ingredient.name}
                          onChange={handleChange}
                        />
                        <FiTrash2
                          onClick={() => arrayHelpers.remove(index)}
                          sx={{ cursor: `pointer` }}
                        />
                      </Fragment>
                    ))}
                </div>
                <div
                  sx={{ display: `flex`, justifyContent: `flex-end`, pt: `3` }}
                >
                  <Button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({ name: '', amount: '', unit: '' })
                    }
                    sx={{
                      variant: `buttons.icon`,
                    }}
                  >
                    {/* show this when user has removed all friends from the list */}
                    Add a ingredient <FiPlus sx={{ ml: `2` }} />
                  </Button>
                </div>
              </Fragment>
            )}
          />
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            value={values.instructions}
            id="instructions"
            rows={6}
            onChange={handleChange}
            placeholder="Place each step on a new line"
          />
          {/* TODO:
              On submit, we'll need to convert the time values into minutes before
          */}
          <div sx={{ display: `flex`, justifyContent: `space-between` }}>
            <div sx={{ display: `flex`, flexDirection: `column` }}>
              <Label htmlFor="prep_time">Prep Time</Label>
              <Input
                name="prep_time"
                id="prep_time"
                value={values.prep_time}
                onChange={handleChange}
              />
            </div>
            <div sx={{ display: `flex`, flexDirection: `column`, px: `3` }}>
              <Label htmlFor="cook_time">Cook Time</Label>
              <Input
                name="cook_time"
                id="cook_time"
                value={values.cook_time}
                onChange={handleChange}
              />
            </div>
            <div sx={{ display: `flex`, flexDirection: `column` }}>
              <Label htmlFor="servings">Servings</Label>
              <Input
                name="servings"
                id="servings"
                value={values.servings}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* TODO:
              - Add tags
              - Add image input */}
          <div sx={{ display: `flex`, justifyContent: `flex-end`, py: `3` }}>
            <Button type="submit" sx={{ variant: `buttons.submit` }}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
)

export default RecipeForm
