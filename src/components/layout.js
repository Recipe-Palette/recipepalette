/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container } from '@theme-ui/components'

import Header from './header'
import Footer from './footer'
import NavigationMobile from './navigation-mobile'

const Layout = ({ children, location }) => (
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
        // backgroundColor: home ? `background` : `accentBackground`,
        pt: [`0`, `3`],
        pb: [`0`, `3`],
        backgroundColor: `accentBackground`,
      }}
    >
      <Container
        sx={{
          borderRadius: [`0`, `2`],
          minHeight: `calc(100vh - 160px - 32px)`,
          // border: theme => `1px solid ${theme.colors.border}`,
          // borderWidth: [0, 1],
          // p: [`3`, `4`],
          py: `2`,
        }}
      >
        {children}
      </Container>
    </main>
    <NavigationMobile location={location} />
    <Footer />
  </div>
)

export default Layout
