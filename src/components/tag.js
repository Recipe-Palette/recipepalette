/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Badge } from '@theme-ui/components'

const TagBadge = ({ name, ...props }) => {
  return (
    <Badge variant="primary" {...props}>
      {name}
    </Badge>
  )
}

export default TagBadge
