/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container } from '@theme-ui/components'
import { Link } from 'gatsby'

const Footer = () => (
  <footer
    sx={{
      borderTop: `1px solid`,
      borderTopColor: `border`,
    }}
  >
    <Container sx={{ variant: `layout.container.footer` }}>
      <span>
        <Link to="/">Recipe Palette</Link> made with 🧡
      </span>
    </Container>
  </footer>
)

export default Footer
