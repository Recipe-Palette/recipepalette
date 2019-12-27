/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container } from '@theme-ui/components'

import Header from './header'
import Footer from './footer'

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
        backgroundColor: `#eee`,
        pt: `3`,
        pb: `3`,
      }}
    >
      <Container sx={{ backgroundColor: `#fff`, borderRadius: `2` }}>
        {children}
      </Container>
    </main>
    <Footer />
  </div>
)

export default Layout
