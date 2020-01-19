/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import { Label, Input, Textarea, Button, Select } from '@theme-ui/components'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import Cleave from 'cleave.js/react'
import { useDropzone } from 'react-dropzone'

const UNITS = [
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
    {UNITS.map((unit, index) => (
      <option key={index}>{unit}</option>
    ))}
  </Select>
)

const parseTime = rawTime => {
  let total = 0
  let [hours, minutes] = rawTime.split(':')
  hours = parseInt(hours)
  minutes = parseInt(minutes)
  hours = hours * 60

  total = hours + minutes

  return total
}

const Previews = () => {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file),
        }))
      )
    },
    multiple: false,
  })

  const thumbs = files.map((file, index) => (
    <div
      key={index}
      sx={{
        display: `flex`,
        justifyContent: `center`,
        p: `3`,
        maxHeight: ``,
      }}
    >
      =
      <img
        src={file.preview}
        alt={file.name}
        sx={{
          maxWidth: `100%`,
          maxHeight: [`400px`, `auto`],
        }}
      />
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <div
      sx={{
        display: `flex`,
        flexDirection: `column`,
        mt: `4`,
        backgroundColor: `#fafafa`,
        '& > p': {
          fontSize: `1rem`,
        },

        '& > em': {
          fontSize: `.8rem`,
        },
      }}
    >
      <div
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          flex: 1,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          padding: `20px`,
          borderWidth: `2px`,
          borderRadius: `2px`,
          borderColor: `#eeeeee`,
          borderStyle: `dashed`,
          backgroundColor: `#fafafa`,
          color: `#bdbdbd`,
          outline: `none`,
          transition: `border .24s ease-in-out`,

          '&:focus': {
            borderColor: `#2196f3`,
          },
        }}
      >
        <input {...getInputProps()} />
        <p sx={{ mb: `0` }}>
          Drag 'n' drop an image here, or click to select an image
        </p>
      </div>
      <div
        sx={{
          display: `flex`,
          justifyContent: `center`,
          borderColor: `#eeeeee`,
          borderStyle: `solid`,
          borderWidth: files.length > 0 ? `2px` : `0px`,
          borderTop: `none`,
        }}
      >
        {thumbs}
      </div>
    </div>
  )
}

const RecipeForm = ({
  name = '',
  ingredients = [
    { name: '', unit: '', amount: '' },
    { name: '', unit: '', amount: '' },
    { name: '', unit: '', amount: '' },
  ],
  instructions = '',
  prep_time = '',
  cook_time = '',
  servings = '',
  image_url = '',
  privateRecipe = false,
}) => {
  // const { userId } = useAuth()
  return (
    <div sx={{ width: [`100%`, `480px`], margin: `0 auto` }}>
      <Formik
        initialValues={{
          name,
          ingredients,
          instructions,
          prep_time,
          cook_time,
          servings,
          image_url,
          privateRecipe,
        }}
        onSubmit={values => {
          console.log(values)
          console.log(parseTime(values.prep_time))
          console.log(parseTime(values.cook_time))

          setTimeout(() => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(values, null, 2))
          }, 500)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Label htmlFor="name">Recipe name</Label>
            <Input
              name="name"
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
            <FieldArray
              name="ingredients"
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
                    {values.ingredients &&
                      values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <Fragment key={index}>
                          <Input
                            type="number"
                            inputMode="decimal"
                            step={0.01}
                            min={0}
                            name={`ingredients.${index}.amount`}
                            value={ingredient.amount}
                            onChange={handleChange}
                          />
                          <UnitDropdown
                            name={`ingredients.${index}.unit`}
                            value={ingredient.unit}
                            onChange={handleChange}
                          />
                          <Input
                            name={`ingredients.${index}.name`}
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
                    sx={{
                      display: `flex`,
                      justifyContent: `flex-end`,
                      pt: `3`,
                    }}
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
                <Cleave
                  name="prep_time"
                  id="prep_time"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  options={{ time: true, timePattern: ['h', 'm'] }}
                  value={values.prep_time}
                  onChange={handleChange}
                  sx={{
                    variant: `forms.input`,
                  }}
                />
              </div>
              <div sx={{ display: `flex`, flexDirection: `column`, px: `3` }}>
                <Label htmlFor="cook_time">Cook Time</Label>
                <Cleave
                  name="cook_time"
                  id="cook_time"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  options={{ time: true, timePattern: ['h', 'm'] }}
                  value={values.cook_time}
                  onChange={handleChange}
                  sx={{
                    variant: `forms.input`,
                  }}
                />
              </div>
              <div sx={{ display: `flex`, flexDirection: `column` }}>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  name="servings"
                  inputMode="numeric"
                  type="number"
                  id="servings"
                  value={values.servings}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <ImageDropzone /> */}
            <Previews />
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
}

export default RecipeForm
