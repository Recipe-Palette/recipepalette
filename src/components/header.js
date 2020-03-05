/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import { Button, Container } from '@theme-ui/components'
import { Link, navigate } from 'gatsby'
import { useAuth } from 'react-use-auth'
import { FiSearch } from 'react-icons/fi'

import { Logo, HorizontalType, Monogram } from '../components/logo'

const Header = ({ toggleDrawer, headerSearchToggle }) => {
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
        <div sx={{ display: `flex` }}>
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
                sx={{ variant: `buttons.primary`, height: `39px` }}
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
                  sx={{
                    px: `10px`,
                    width: `max-content`,
                    whiteSpace: `nowrap`,
                  }}
                  onClick={() => login()}
                >
                  Sign Up
                </Button>
              </div>
            </Fragment>
          )}
          <div sx={{ display: [`none`, `initial`] }}>
            <Button
              sx={{
                variant: `buttons.secondary`,
                backgroundColor: `background`,
                height: `39px`,
                display: `flex`,
              }}
              aria-label="Search button"
              onClick={toggleDrawer}
              ref={headerSearchToggle}
            >
              <FiSearch
                size={20}
                sx={{ cursor: `pointer`, stroke: 3, strokeWidth: 3 }}
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
