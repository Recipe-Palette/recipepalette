/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Badge } from '@theme-ui/components'

const TagBadge = ({ name }) => {
  return <Badge variant="primary">{name}</Badge>
}

export default TagBadge
