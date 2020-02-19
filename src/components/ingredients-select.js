/** @jsx jsx */
import { jsx } from 'theme-ui'
import CreatableInputOnly from './creatable-multi-input'

const IngredientsSelect = ({ value, onChange, onBlur, touched, error }) => {
  const handleChange = newValue => onChange('ingredients', newValue)
  const handleBlur = () => onBlur('ingredients', true)
  console.log(value)
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
