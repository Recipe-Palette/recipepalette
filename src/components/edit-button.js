/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { IconButton } from '@theme-ui/components'
import { Edit } from './icons'

const EditButton = ({ size = 24, recipeId, versionNumber, ...props }) => {
  return (
    <IconButton
      sx={{ height: size + 14, width: size + 14 }}
      onClick={() => navigate(`/recipe/${recipeId}/${versionNumber}/edit`)}
      {...props}
    >
      <div sx={{ display: `flex`, alignItems: `center` }}>
        <Edit size={size} />
      </div>
    </IconButton>
  )
}

export default EditButton
