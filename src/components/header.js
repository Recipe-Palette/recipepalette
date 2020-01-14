/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button, Container } from '@theme-ui/components'
import { Link, navigate } from 'gatsby'
import { useAuth } from 'react-use-auth'

import { Profile } from '../components/icons'
import { Logo, HorizontalType, Monogram } from '../components/logo'
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
        <div sx={{ width: [`50px`, `100%`] }}>
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
          <Button
            sx={{ variant: `buttons.link` }}
            onClick={() =>
              isAuthenticated() ? navigate('/my-recipes') : login()
            }
          >
            My Palette
          </Button>
        </div>
        <div sx={{ display: [`none`, `flex`] }}>
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
