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

const CreatableInputOnly = () => {
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState([])

  const handleChange = newValue => setValue(newValue)
  const handleInputChange = newInputValue => setInputValue(newInputValue)

  const handleKeyDown = e => {
    if (!inputValue) return

    // eslint-disable-next-line default-case
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        setInputValue('')
        setValue([...value, createOption(inputValue)])
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
      placeholder="Type somehting and press enter..."
      value={value}
    />
  )
}

export default CreatableInputOnly
