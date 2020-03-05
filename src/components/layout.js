/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useRef } from 'react'
import { Container } from '@theme-ui/components'

import Header from './header'
import Footer from './footer'
import NavigationMobile from './navigation-mobile'
import SearchDrawer from './search-drawer'
import SEO from './SEO'

import { useOnClickOutside } from '../hooks/useOnClickOutside'

const Layout = ({ children, location }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const searchDrawer = useRef(null)
  const headerSearchToggle = useRef(null)
  const mobileSearchToggle = useRef(null)

  const toggleDrawer = () => setDrawerIsOpen(!drawerIsOpen)

  useOnClickOutside(searchDrawer, headerSearchToggle, mobileSearchToggle, () =>
    setDrawerIsOpen(false)
  )
  return (
    <div
      sx={{
        height: `100%`,
        backgroundColor: `background`,
      }}
    >
      <SEO />
      <Header
        toggleDrawer={toggleDrawer}
        headerSearchToggle={headerSearchToggle}
      />
      <div ref={searchDrawer}>
        <SearchDrawer
          sx={{
            height: `auto`,
            maxHeight: drawerIsOpen ? `500px` : 0,
            overflow: drawerIsOpen ? `auto` : `hidden`,
            py: drawerIsOpen ? `3` : `0`,
          }}
          toggleDrawer={toggleDrawer}
        />
      </div>
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
      <NavigationMobile
        location={location}
        toggleDrawer={toggleDrawer}
        mobileSearchToggle={mobileSearchToggle}
      />
      <Footer />
    </div>
  )
}

export default Layout
