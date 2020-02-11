/** @jsx jsx */
import { jsx } from 'theme-ui'

const Title = ({ children, ...props }) => (
  <h1 sx={{ fontSize: `5` }} {...props}>
    {children}
  </h1>
)

export default Title
