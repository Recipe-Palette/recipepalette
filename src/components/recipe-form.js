/* eslint-disable complexity */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment, useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Formik, Form, FieldArray, useField } from 'formik'
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
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/react-hooks'
// import gql from 'graphql-tag'
import { useAuth } from 'react-use-auth'
import axios from 'axios'
import * as Yup from 'yup'

import { createRecipeObject } from '../utils/createRecipeObject'
import { UPSERT_RECIPE } from '../graphql/mutations'

//Should move this to a environmental variable
const API_ENDPOINT =
  'https://0qup50mcf6.execute-api.us-west-2.amazonaws.com/Prod'

// const INSERT_RECIPE = gql`
//   mutation InsertRecipe($objects: [recipe_version_insert_input!]!) {
//     insert_recipe_version(objects: $objects) {
//       returning {
//         name
//         id
//         version
//         recipe {
//           id
//         }
//       }
//     }
//   }
// `

// const UPDATE_RECIPE = gql`
//   mutation UpdateRecipe(
//     $version: [recipe_version_insert_input!]!
//     $recipe_id: Int!
//     $recipe: recipe_set_input
//   ) {
//     insert_recipe_version(objects: $version) {
//       returning {
//         name
//         id
//         version
//         recipe {
//           id
//         }
//       }
//     }
//     update_recipe(where: { id: { _eq: $recipe_id } }, _set: $recipe)
//   }
// `

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

const RecipeSchema = Yup.object().shape({
  name: Yup.string().required('Recipe name is required'),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        amount: Yup.number().required('Required'),
        unit: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
      })
    )
    .required('Ingredients are required')
    .min(1, 'Minimum one ingredient'),
  instructions: Yup.string().required('Instructions are required'),
  servings: Yup.number()
    .positive('Enter a positive number')
    .required('Servings are required'),
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

const ImageDropZone = ({ handleImageDrop }) => {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const acceptedFile = acceptedFiles[0]
      handleImageDrop(acceptedFile)
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
  latest_version = 0,
  privateRecipe = false,
}) => {
  const { userId } = useAuth()
  const [image, setImage] = useState(null)
  const [saving, setSaving] = useState(false)
  // const [insertRecipe] = useMutation(INSERT_RECIPE, {
  //   onCompleted({ insert_recipe_version: result }) {
  //     setSaving(false)
  //     navigate(`/recipe/${result.returning[0].recipe.id}/latest`)
  //   },
  // })
  const [upsertRecipe] = useMutation(UPSERT_RECIPE, {
    onCompleted({ insert_recipe_version: result }) {
      setSaving(false)
      navigate(`/recipe/${result.returning[0].recipe.id}/latest`)
    },
  })
  const handleImageDrop = imageFile => {
    setImage(imageFile)
  }

  console.log('recipe_id:', recipe_id)

  const handleSubmit = async values => {
    setSaving(true)
    const submitMutation = imageUrl => {
      console.log(values)
      console.log(imageUrl)
      const recipeVersion = createRecipeObject(
        values,
        recipe_id,
        userId,
        latest_version,
        imageUrl
      )
      // const submitInstructions = values.instructions.split('\n')
      // console.log(submitInstructions)
      // console.log(values)
      // const prep_time_minutes = parseTime(values.prep_time)
      // const cook_time_minutes = parseTime(values.cook_time)

      // const recipe = {
      //   data: {
      //     image_url: imageUrl,
      //     latest_version: latest_version + 1,
      //     user_id: userId,
      //   },
      //   on_conflict: {
      //     constraint: 'recipe_info_pkey',
      //     update_columns: ['image_url', 'latest_version', 'user_id', 'private'],
      //   },
      // }

      // const submitIngredients = {
      //   data: values.ingredients,
      // }

      // const recipeVersion = {
      //   recipe,
      //   prep_time_minutes,
      //   cook_time_minutes,
      //   name: values.name,
      //   servings: values.servings,
      //   ingredients: submitIngredients,
      //   instructions: submitInstructions,
      //   version: latest_version + 1,
      // }

      // console.log(recipeVersion)
      console.log(recipeVersion)

      // insertRecipe({
      //   variables: { objects: recipeVersion },
      // })
      upsertRecipe({
        variables: { objects: recipeVersion },
      })
    }

    await uploadImageToS3(image, submitMutation)
  }

  return (
    <div sx={{ width: [`100%`, `480px`], margin: `0 auto` }}>
      {/* TODO: Add validation */}
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
        validationSchema={RecipeSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Label htmlFor="name">Recipe name</Label>
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
                              type="number"
                              inputMode="decimal"
                              step={0.01}
                              min={0}
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
                  value={values.servings}
                  onChange={handleChange}
                />
                {errors.servings && touched.servings ? (
                  <div sx={{ color: `error` }}>{errors.servings}</div>
                ) : null}
              </div>
            </div>

            <ImageDropZone handleImageDrop={handleImageDrop} />
            {/* TODO:
              - Add tags */}
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
