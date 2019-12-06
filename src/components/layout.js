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
      }}
    >
      <Container>{children}</Container>
    </main>
    <Footer />
  </div>
)

export default Layout
