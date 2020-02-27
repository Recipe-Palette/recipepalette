/** @jsx jsx */
import { jsx } from 'theme-ui'
import { IconButton } from '@theme-ui/components'
import { Trash } from './icons'

const DeleteButton = ({ size = 24, ...props }) => {
  return (
    <IconButton sx={{ height: size + 14, width: size + 14 }} {...props}>
      <div sx={{ display: `flex`, alignItems: `center` }}>
        <Trash size={size} />
      </div>
    </IconButton>
  )
}

export default DeleteButton
