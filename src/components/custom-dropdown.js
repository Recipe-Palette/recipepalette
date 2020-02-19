/** @jsx jsx */
import { jsx } from 'theme-ui'
import Select from 'react-select'

const CustomDropdown = ({
  id,
  value,
  options,
  onChange,
  onBlur,
  touched,
  error,
}) => {
  const handleChange = newValue => onChange('tags', newValue)

  const handleBlur = () => {
    onBlur('tags', true)
  }

  return (
    <div>
      <Select
        id={id}
        options={options}
        isMulti
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

export default CustomDropdown
