/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Badge } from '@theme-ui/components'

const TagBadge = ({ name }) => {
  return (
    <Badge
      sx={{
        cursor: `pointer`,
        color: `background`,
        borderWidth: `1px`,
        borderColor: `primary`,
        borderStyle: `solid`,
        marginRight: `5px`,
        backgroundColor: `primary`,
        transition: `0.2s all`,
        textDecoration: `none`,
        fontSize: `1`,
        px: `2`,
        py: `1`,
        borderRadius: `1`,
        textAlign: `center`,
      }}
    >
      {name}
    </Badge>
  )
}

export default TagBadge
