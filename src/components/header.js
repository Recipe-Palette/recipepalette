/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Button, Container } from '@theme-ui/components'
import { lighten } from '@theme-ui/color'
import { Link, navigate } from 'gatsby'
import { useAuth } from 'react-use-auth'
import { FiSearch } from 'react-icons/fi'

import { Logo, HorizontalType, Monogram } from '../components/logo'
import SearchBar from './search-bar'

const Header = () => {
  const { isAuthenticated, login } = useAuth()

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
        {isAuthenticated() ? (
          <div
            sx={{
              display: [`none`, `flex`],
              alignItems: `center`,
              width: `max-content`,
              whiteSpace: `nowrap`,
            }}
          >
            <Button
              sx={{ variant: `buttons.link`, height: `39px` }}
              onClick={() => navigate('/palette/recipes')}
            >
              My Palette
            </Button>
          </div>
        ) : (
          <Fragment>
            <div>
              <Button
                sx={{
                  variant: `buttons.secondary`,
                  backgroundColor: `background`,
                  height: `39px`,
                }}
                onClick={() => login()}
              >
                Login
              </Button>
            </div>
            <div sx={{ display: [`none`, `flex`], height: `39px` }}>
              <Button
                sx={{ px: `10px`, width: `max-content`, whiteSpace: `nowrap` }}
                onClick={() => login()}
              >
                Sign Up
              </Button>
            </div>
          </Fragment>
        )}
      </Container>
    </header>
  )
}

export default Header
