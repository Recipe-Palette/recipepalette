/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Container } from '@theme-ui/components'

import Header from './header'
import Footer from './footer'
import NavigationMobile from './navigation-mobile'
import SearchDrawer from './search-drawer'

const Layout = ({ children, location }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  return (
    <div
      sx={{
        height: `100%`,
        backgroundColor: `background`,
      }}
    >
      <Header toggleDrawer={toggleDrawer} />
      <SearchDrawer
        sx={{
          height: `auto`,
          maxHeight: drawerIsOpen ? `500px` : 0,
          overflow: drawerIsOpen ? `auto` : `hidden`,
          py: drawerIsOpen ? `3` : `0`,
        }}
        setDrawerIsOpen={setDrawerIsOpen}
      />
      <main
        sx={{
          position: `relative`,
          pt: [`0`, `3`],
          pb: [`0`, `3`],
          backgroundColor: `accentBackground`,
        }}
      >
        <Container
          sx={{
            minHeight: `calc(100vh - 160px - 32px)`,
            py: `2`,
          }}
        >
          {children}
        </Container>
      </main>
      <NavigationMobile location={location} toggleDrawer={toggleDrawer} />
      <Footer />
    </div>
  )
}

export default Layout
