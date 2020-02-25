/** @jsx jsx */
import { jsx } from 'theme-ui'

const Title = ({ children, ...props }) => (
  <h1
    sx={{
      fontSize: `5`,
      mt: [`2`, `0`],
      textAlign: [`center`, `left`],
      color: `text`,
    }}
    {...props}
  >
    {children}
  </h1>
)

export default Title
