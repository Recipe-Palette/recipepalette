/** @jsx jsx */
import { jsx } from 'theme-ui'
import { lighten } from '@theme-ui/color'
import { Link } from 'gatsby'
import { Container } from '@theme-ui/components'
import { MdAccountBox } from 'react-icons/md'
import { useAuth } from 'react-use-auth'

import { useCustomAuth } from '../hooks/useCustomAuth'
import SearchBar from './search-bar'

const Header = () => {
  const { isAuthenticated, login } = useAuth()
  const { customLogout } = useCustomAuth()

  return (
    <header
      sx={{
        borderBottom: `1px solid`,
        borderBottomColor: `border`,
      }}
    >
      <Container sx={{ variant: `layout.container.header` }}>
        <div sx={{ width: `max-content`, whiteSpace: `nowrap`, mr: `2` }}>
          <Link to="/">
            <span sx={{ display: [`none`, `initial`] }}>Recipe Palette </span>
            <span role="img" aria-label="palette">
              🎨
            </span>
          </Link>
        </div>
        <div sx={{ width: `100%`, ml: [`2`, `3`], mr: [`0`, `3`] }}>
          <SearchBar />
        </div>
        <div
          sx={{
            '*+*': { marginLeft: `3` },
            display: [`none`, `flex`],
            alignItems: `center`,
            width: `max-content`,
            whiteSpace: `nowrap`,
            ml: `2`,
          }}
        >
          <Link sx={{ variant: `buttons.link` }} to="/my-recipes">
            My Recipes
          </Link>
          <MdAccountBox
            size={50}
            sx={{
              display: `inline-flex`,
              cursor: `pointer`,
              color: lighten(`primary`, 0.25),
              '&:hover': { color: lighten(`primary`, 0.1) },
            }}
            onClick={() => (isAuthenticated() ? customLogout() : login())}
          />
        </div>
      </Container>
    </header>
  )
}

export default Header
