/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Button, Container } from '@theme-ui/components'
import { lighten } from '@theme-ui/color'
import { Link, navigate } from 'gatsby'
import { useAuth } from 'react-use-auth'
import { FiSearch } from 'react-icons/fi'

import { Profile } from '../components/icons'
import { Logo, HorizontalType, Monogram } from '../components/logo'
import SearchBar from './search-bar'
import SearchDrawer from './search-drawer'

const Header = () => {
  const { isAuthenticated, login } = useAuth()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  return (
    <header
      sx={{
        height: 80,
        borderBottom: `1px solid`,
        borderBottomColor: `border`,
      }}
    >
      <Container sx={{ variant: `layout.container.header` }}>
        <div
          sx={{
            display: [`none`, `flex`],
            width: `max-content`,
            whiteSpace: `nowrap`,
          }}
        >
          <Link to="/">
            <Logo sx={{ width: 150, height: 50 }} />
          </Link>
        </div>
        <div
          sx={{
            display: [`flex`, `none`],
            width: `max-content`,
            ml: 0,
          }}
        >
          <Link
            to="/"
            sx={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <Monogram sx={{ width: 45 }} />
          </Link>
        </div>
        <div
          sx={{
            display: [`flex`, `none`],
            width: `max-content`,
            ml: 0,
          }}
        >
          <Link
            to="/"
            sx={{
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <HorizontalType sx={{ width: 200 }} />
          </Link>
        </div>
        <div
          sx={{
            display: [`none`, `flex`],
            width: `100%`,
          }}
        >
          <SearchBar sx={{ width: `100%` }} />
        </div>
        <button
          sx={{
            display: [`flex`, `none`],
            alignItems: `center`,
            justifyContent: `center`,
            borderRadius: `2`,
            height: `39px`,
            width: `39px`,
            cursor: `pointer`,
            outline: 0,
            border: 0,
            backgroundColor: lighten(`border`, 0.075),
            '&:active, &:focus': {
              boxShadow: theme => `0px 0px 0px 3px ${theme.colors.accent}`,
            },
          }}
          onClick={() => navigate(`search`)}
        >
          <FiSearch size={20} />
        </button>
        <div
          sx={{
            display: [`none`, `flex`],
            alignItems: `center`,
            width: `max-content`,
            whiteSpace: `nowrap`,
          }}
        >
          <FiSearch
            size={20}
            sx={{ cursor: `pointer` }}
            onClick={() => setDrawerIsOpen(!drawerIsOpen)}
          />
          <Button
            sx={{ variant: `buttons.link`, height: `39px` }}
            onClick={() =>
              isAuthenticated() ? navigate('/palette/recipes') : login()
            }
          >
            My Palette
          </Button>
        </div>
        <div sx={{ display: [`none`, `flex`], height: `39px` }}>
          <Button
            sx={{ px: `10px` }}
            onClick={() => (isAuthenticated() ? navigate('/account') : login())}
          >
            <Profile size={17} sx={{ stroke: 3 }} />
          </Button>
        </div>
      </Container>
      <SearchDrawer
        sx={{
          height: `auto`,
          maxHeight: drawerIsOpen ? `500px` : 0,
          overflow: drawerIsOpen ? `auto` : `hidden`,
          py: drawerIsOpen ? `3` : `0`,
        }}
      />
    </header>
  )
}

export default Header
