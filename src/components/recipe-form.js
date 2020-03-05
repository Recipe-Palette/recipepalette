/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form, FieldArray, useField } from 'formik'
import { useToasts } from 'react-toast-notifications'
import {
  Label,
  Input,
  Textarea,
  Button,
  Select,
  Spinner,
} from '@theme-ui/components'
import { FiTrash2, FiPlus } from 'react-icons/fi'
import Cleave from 'cleave.js/react'
import { useMutation } from '@apollo/react-hooks'
import { useAuth } from 'react-use-auth'
import axios from 'axios'
import * as Yup from 'yup'

import { createRecipeObject } from '../utils/createRecipeObject'
import { UPSERT_RECIPE } from '../graphql/mutations'
import ImageDropZone from './image-dropzone'

//Should move this to a environmental variable
const API_ENDPOINT =
  'https://4upcip6ivg.execute-api.us-west-2.amazonaws.com/Prod'

const UNITS = [
  '',
  'box',
  'can',
  'cm',
  'cup',
  'dl',
  'fl oz',
  'gill',
  'g',
  'inch',
  'kg',
  'l',
  'lb',
  'm',
  'mg',
  'ml',
  'mm',
  'oz',
  'package',
  'pinch',
  'pint',
  'quart',
  'tbsp',
  'tsp',
]

const RecipeSchema = Yup.object().shape({
  name: Yup.string().required('Recipe name is required'),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.string()
          .trim()
          .max(2 ** 31 - 1, 'Too big')
          .matches(
            /^(\d+$|\d+[.]\d+?$|\d*[.]\d+?$|\d+?[\s]?\d[/]\d+|\d[/]\d+$)/,
            'Enter a valid number or fraction'
            //regex checks for one of the following: number with no decimal || number with decimal and at least one number after ||
            //decimal with 0 or many numbers before, and at least one number after || a forward slash with numbers on both sides
          ),
        unit: Yup.string(),
        name: Yup.string().required('Required'),
      })
    )
    .required('Ingredients are required')
    .min(1, 'Minimum one ingredient'),
  instructions: Yup.string().required('Instructions are required'),
  servings: Yup.number()
    .max(2 ** 31 - 1, 'Too big')
    .positive('Enter a positive number'),
  prep_time: Yup.string().required('Required'),
  cook_time: Yup.string().required('Required'),
})

const ErrorMessage = props => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(props)
  const { error, touched } = meta
  return error && touched ? <div sx={{ color: `error` }}>{error}</div> : null
}

const uploadImageToS3 = async (file, submitMutation) => {
  if (typeof file === 'string') {
    submitMutation(file)
    return
  }

  if (!file) {
    submitMutation('')
    return
  }
  const reader = new FileReader()

  reader.onabort = () => console.log('file reading was aborted')
  reader.onerror = () => console.log('file reading has failed')
  reader.onload = async () => {
    const { path } = file
    // eslint-disable-next-line no-bitwise
    const ext = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2)
    // TODO: Change from axios to fetch or vice versa
    const response = await axios({
      method: 'GET',
      url: API_ENDPOINT,
      params: {
        ext,
      },
    })

    const binaryStr = reader.result
    const blobData = new Blob([binaryStr], { type: `image/${ext}` })
    const result = await fetch(response.data.uploadURL, {
      method: 'PUT',
      body: blobData,
    })

    let { url } = result
    url = url.split('?')[0]
    submitMutation(url)
  }
  await reader.readAsArrayBuffer(file)
}

const UnitDropdown = props => (
  <Select {...props}>
    {UNITS.map((unit, index) => (
      <option key={index}>{unit}</option>
    ))}
  </Select>
)

const RecipeForm = ({
  recipe_id = null,
  name = '',
  ingredients = [{ name: '', unit: '', amount: '' }],
  instructions = '',
  prep_time = '',
  cook_time = '',
  servings = '',
  image_url = '',
  tags = [],
  latest_version = 0,
  log = [],
  notes = '',
  privateRecipe = false,
  recipeOwnerId,
  parent_id,
  location,
}) => {
  const { userId } = useAuth()
  const { addToast } = useToasts()
  const [image, setImage] = useState(image_url)
  const [saving, setSaving] = useState(false)
  const [upsertRecipe] = useMutation(UPSERT_RECIPE, {
    onCompleted({ insert_recipe_version: result }) {
      setSaving(false)
      navigate(`/recipe/${result.returning[0].recipe.id}/latest`)
    },
  })

  const isOwner = userId && recipeOwnerId === userId
  const isEdit = location.pathname.includes('edit')
  const handleImageDrop = imageFile => {
    setImage(imageFile)
  }

  const handleSubmit = async values => {
    const submitMutation = imageUrl => {
      values.name = values.name.trim()
      if (name != values.name) {
        log.push('Name')
      }

      values.ingredients.forEach(ingredient => {
        ingredient.amount = ingredient.amount.trim()
        ingredient.name = ingredient.name.trim()
      })
      if (JSON.stringify(ingredients) != JSON.stringify(values.ingredients)) {
        log.push('Ingredients')
      }

      if (
        JSON.stringify(instructions.split('\n').filter(Boolean)) !=
        JSON.stringify(values.instructions.split('\n').filter(Boolean))
      ) {
        log.push('Instructions')
      }
      if (prep_time != values.prep_time) {
        log.push('Prep Time')
      }
      if (cook_time != values.cook_time) {
        log.push('Cook Time')
      }
      if (servings != values.servings) {
        log.push('Servings')
      }
      if (image_url != values.image_url) {
        log.push('Image')
      }

      values.tags = values.tags.map(tag => {
        tag = tag.trim()
        return tag
      })
      if (JSON.stringify(tags) != JSON.stringify(values.tags)) {
        log.push('Tags')
      }

      log = log.length > 0 ? log.join(', ') : ''

      if (log == '') {
        addToast('No changes to save', { appearance: 'error' })
      } else {
        setSaving(true)

        values.ingredients.forEach(ingredient => {
          if (ingredient.amount === '') {
            ingredient.amount = 0
          }
        })

        if (values.servings === '') {
          values.servings = 0
        }

        const recipeVersion = createRecipeObject(
          values,
          recipe_id,
          userId,
          latest_version,
          log,
          imageUrl,
          parent_id
        )

        if (!recipe_id) {
          recipe_id = -1
        }

        upsertRecipe({
          variables: { objects: recipeVersion, recipe_id },
        })
      }
    }

    await uploadImageToS3(image, submitMutation)
  }

  // 6 Potential states:
  // owner + create show
  // owner + variant show
  // owner + edit = show
  // viewer + create show
  // viewer + variant show
  // viewer + edit = hide <- this is the only case we need to check
  if (!isOwner && isEdit)
    return (
      <div sx={{ textAlign: `center` }}>
        Woops, looks like you aren't the owner of this recipe!
      </div>
    )

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
          notes,
          privateRecipe,
          tags,
        }}
        validationSchema={RecipeSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Label htmlFor="name">Recipe Name</Label>
            <Input
              name="name"
              type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name ? (
              <div sx={{ color: `error` }}>{errors.name}</div>
            ) : null}
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
                      alignItems: `baseline`,
                    }}
                  >
                    <small>Amount</small>
                    <small>Unit</small>
                    <small sx={{ gridColumn: `3 / 5` }}>Ingredient</small>
                    {values.ingredients &&
                      values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <Fragment key={index}>
                          <div>
                            <Input
                              type="text"
                              name={`ingredients.${index}.amount`}
                              value={ingredient.amount}
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name={`ingredients[${index}].amount`}
                            />
                          </div>
                          <div>
                            <UnitDropdown
                              name={`ingredients.${index}.unit`}
                              value={ingredient.unit}
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`ingredients[${index}].unit`} />
                          </div>
                          <div>
                            <Input
                              name={`ingredients.${index}.name`}
                              value={ingredient.name}
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`ingredients[${index}].name`} />
                          </div>
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
                        variant: `buttons.primary`,
                        py: 2,
                        px: 3,
                        display: `flex`,
                        alignItems: `center`,
                        fontWeight: `normal`,
                        fontSize: `14px`,
                      }}
                    >
                      Add ingredient <FiPlus sx={{ strokeWidth: 3, ml: `2` }} />
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
            {errors.instructions && touched.instructions ? (
              <div sx={{ color: `error` }}>{errors.instructions}</div>
            ) : null}
            <div sx={{ display: `flex`, justifyContent: `space-between` }}>
              <div sx={{ display: `flex`, flexDirection: `column` }}>
                <Label htmlFor="prep_time">Prep Time</Label>
                <Cleave
                  name="prep_time"
                  id="prep_time"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  min={0}
                  max={1000000000}
                  options={{ time: true, timePattern: ['h', 'm'] }}
                  value={values.prep_time}
                  onChange={handleChange}
                  sx={{
                    variant: `forms.input`,
                  }}
                />
                {errors.prep_time && touched.prep_time ? (
                  <div sx={{ color: `error` }}>{errors.prep_time}</div>
                ) : null}
              </div>
              <div sx={{ display: `flex`, flexDirection: `column`, px: `3` }}>
                <Label htmlFor="cook_time">Cook Time</Label>
                <Cleave
                  name="cook_time"
                  id="cook_time"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  min={0}
                  max={1000000000}
                  options={{ time: true, timePattern: ['h', 'm'] }}
                  value={values.cook_time}
                  onChange={handleChange}
                  sx={{
                    variant: `forms.input`,
                  }}
                />
                {errors.cook_time && touched.cook_time ? (
                  <div sx={{ color: `error` }}>{errors.cook_time}</div>
                ) : null}
              </div>
              <div sx={{ display: `flex`, flexDirection: `column` }}>
                <Label htmlFor="servings">Servings</Label>
                <Input
                  name="servings"
                  inputMode="numeric"
                  type="number"
                  id="servings"
                  min={0}
                  max={1000000000}
                  value={values.servings}
                  onChange={handleChange}
                />
                {errors.servings && touched.servings ? (
                  <div sx={{ color: `error` }}>{errors.servings}</div>
                ) : null}
              </div>
            </div>
            <ImageDropZone
              handleImageDrop={handleImageDrop}
              image_url={values.image_url}
              name={values.name}
            />

            <FieldArray
              name="tags"
              render={arrayHelpers => (
                <Fragment>
                  <Label>Tags</Label>
                  <div
                    sx={{
                      display: `grid`,
                      gridTemplateColumns: `1fr 15px`,
                      gridGap: `2`,
                      alignItems: `baseline`,
                    }}
                  >
                    {values.tags &&
                      values.tags.length > 0 &&
                      values.tags.map((tag, index) => (
                        <Fragment key={index}>
                          <div>
                            <Input
                              name={`tags.${index}`}
                              value={tag}
                              onChange={handleChange}
                            />
                            <ErrorMessage name={`tags[${index}]`} />
                          </div>
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
                      onClick={() => arrayHelpers.push('')}
                      sx={{
                        variant: `buttons.primary`,
                        py: 2,
                        px: 3,
                        display: `flex`,
                        alignItems: `center`,
                        fontWeight: `normal`,
                        fontSize: `14px`,
                      }}
                    >
                      Add Tag <FiPlus sx={{ ml: `2` }} />
                    </Button>
                  </div>
                </Fragment>
              )}
            />

            <Label htmlFor="notes">Notes</Label>
            <Textarea
              value={values.notes}
              id="notes"
              rows={3}
              onChange={handleChange}
              placeholder="Enter any notes here"
            />
            <div
              sx={{
                display: `flex`,
                justifyContent: `flex-end`,
                py: `3`,
                alignItems: `center`,
              }}
            >
              <Spinner
                size="30"
                sx={{
                  display: saving ? `initial` : `none`,
                  mr: `4`,
                }}
              />
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
