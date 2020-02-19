/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import CreatableSelect from 'react-select/creatable'

const components = {
  DropdownIndicator: null,
}

const createOption = label => ({
  label,
  value: label,
})

const CreatableInputOnly = ({ value, onChange, onBlur }) => {
  const [inputValue, setInputValue] = useState('')

  console.log(value)

  const handleChange = newValue => onChange('ingredients', newValue)
  const handleInputChange = newInputValue => setInputValue(newInputValue)

  const handleKeyDown = e => {
    if (!inputValue) return

    // eslint-disable-next-line default-case
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        console.log('in handleKeyDown')
        onChange([...value, createOption(inputValue)])
        setInputValue('')
        e.preventDefault()
    }
  }
  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      placeholder="Type something and press enter..."
      value={value}
    />
  )
}

export default CreatableInputOnly
