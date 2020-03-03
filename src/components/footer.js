/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex, Container } from '@theme-ui/components'
import { Link } from 'gatsby'
import { Monogram } from '../components/logo'

const Footer = () => (
  <footer
    sx={{
      borderTop: `1px solid`,
      borderTopColor: `border`,
      pb: [`5`, `0`],
    }}
  >
    <Container>
      <Flex
        sx={{
          my: [`2`, `3`],
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `space-between`,
        }}
      >
        <div sx={{ minWidth: 100 }}>
          <Link to="/">
            <Monogram height={36} />
          </Link>
        </div>
        <div sx={{ fontSize: `1`, color: `gray` }}>
          &copy; 2020 Recipe Palette
        </div>
        <div>
          <a
            sx={{ variant: `buttons.secondary` }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://marriottschool.byu.edu/cet/"
          >
            Rollins Center
          </a>
        </div>
      </Flex>
    </Container>
  </footer>
)

export default Footer
