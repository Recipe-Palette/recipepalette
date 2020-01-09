/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button, Container } from '@theme-ui/components'
import { Link, navigate } from 'gatsby'
import { useAuth } from 'react-use-auth'

import { Profile } from '../components/icons'
import SearchBar from './search-bar'

const Header = () => {
  const { isAuthenticated, login } = useAuth()

  return (
    <header
      sx={{
        borderBottom: `1px solid`,
        borderBottomColor: `border`,
      }}
    >
      <Container sx={{ variant: `layout.container.header` }}>
        <div sx={{ width: `max-content`, whiteSpace: `nowrap` }}>
          <Link to="/">
            <span sx={{ display: [`none`, `initial`] }}>Recipe Palette </span>
            <span role="img" aria-label="palette">
              🎨
            </span>
          </Link>
        </div>
        <div sx={{ width: `100%` }}>
          <SearchBar />
        </div>
        <div
          sx={{
            display: [`none`, `flex`],
            alignItems: `center`,
            width: `max-content`,
            whiteSpace: `nowrap`,
          }}
        >
          <Link sx={{ variant: `buttons.link` }} to="/my-recipes">
            My Recipes
          </Link>
        </div>
        <div>
          <Button sx={{ px: `10px` }}>
            <Profile
              size={17}
              sx={{ stroke: 3 }}
              onClick={() =>
                isAuthenticated() ? navigate('/account') : login()
              }
            />
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Header
