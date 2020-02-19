/** @jsx jsx */
import { jsx } from 'theme-ui'
import Select from 'react-select'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TAGS_QUERY = gql`
  query TagsQuery {
    tags: tag {
      name
    }
  }
`

const TagsDropdown = ({ value, onChange, onBlur, touched, error }) => {
  const { data: tagsData, loading } = useQuery(TAGS_QUERY)
  let tags = []

  if (!loading) {
    tags = tagsData.tags.map(({ name }) => ({ value: name, label: name }))
  }

  const handleChange = newValue => onChange('tags', newValue)

  const handleBlur = () => {
    onBlur('tags', true)
  }

  return (
    <div>
      <Select
        id="tags"
        options={tags.length > 0 ? tags : []}
        isMulti
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        menuPosition="fixed"
      />
      {!!error && touched && (
        <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
      )}
    </div>
  )
}

export default TagsDropdown
