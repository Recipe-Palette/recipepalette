/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Container } from '@theme-ui/components'

import Header from './header'

const Layout = ({ children }) => (
  <div
    sx={{
      height: `100%`,
      backgroundColor: `background`,
    }}
  >
    <Header />
    <main
      sx={{
        position: `relative`,
      }}
    >
      <Container>{children}</Container>
    </main>
    <footer
      sx={{
        borderTop: `1px solid`,
        borderTopColor: `border`,
      }}
    >
      <Container sx={{ variant: `layout.container.footer` }}>
        <Link to="/">Recipe Palette</Link>
      </Container>
    </footer>
  </div>
)

export default Layout
