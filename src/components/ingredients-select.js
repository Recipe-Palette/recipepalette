/** @jsx jsx */
import { jsx } from 'theme-ui'
import CreatableInputOnly from './creatable-multi-input'

const IngredientsSelect = ({ value, onChange, onBlur, touched, error }) => {
  console.log(value)
  const handleChange = newValue =>
    onChange('ingredients', newValue ? newValue : [])
  const handleBlur = () => onBlur('ingredients', true)

  return (
    <div>
      <CreatableInputOnly
        id="ingredients"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {!!error && touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
      )}
    </div>
  )
}

export default IngredientsSelect
