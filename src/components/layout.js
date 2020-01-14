/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container } from '@theme-ui/components'

import Header from './header'
import Footer from './footer'
import NavigationMobile from './navigation-mobile'

const Layout = ({ home, children, location }) => (
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
        backgroundColor: home ? `background` : `#eee`,
        pt: [`0`, `3`],
        pb: [`0`, `3`],
      }}
    >
      <Container
        sx={{ backgroundColor: `background`, borderRadius: `2`, py: `4` }}
      >
        {children}
      </Container>
    </main>
    <NavigationMobile location={location} />
    <Footer />
  </div>
)

export default Layout
