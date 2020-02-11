/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Flex } from '@theme-ui/components'
import styled from '@emotion/styled'

import { Heart, Bookmark, Book, Profile } from './icons'

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-style: solid;
  padding-top: ${({ theme }) => `${theme.space[3]}px`};
  padding-bottom: ${({ theme }) => `${theme.space[3]}px`};
`

const isActiveLink = (pathname, matchText) => pathname.includes(matchText)

const NavigationMobile = ({ location }) => {
  return (
    <div
      sx={{
        position: `fixed`,
        bottom: 0,
        left: 0,
        width: `100%`,
        bg: `background`,
        display: [null, `none`],
      }}
    >
      <Flex
        sx={{
          width: `100%`,
          justifyContent: `space-around`,
          alignItems: `center`,
          height: `100%`,
        }}
      >
        <Link to="/my-recipes" sx={{ color: `initial`, width: `100%` }}>
          <IconContainer>
            <Book
              filled={isActiveLink(location.pathname, `my-recipes`)}
              size="1.5rem"
            />
          </IconContainer>
        </Link>
        <Link to="/favorites" sx={{ color: `initial`, width: `100%` }}>
          <IconContainer>
            <Heart
              filled={isActiveLink(location.pathname, `favorites`)}
              size="1.5rem"
            />
          </IconContainer>
        </Link>
        <Link to="/bookmarks" sx={{ color: `initial`, width: `100%` }}>
          <IconContainer>
            <Bookmark
              filled={isActiveLink(location.pathname, `bookmarks`)}
              size="1.5rem"
            />
          </IconContainer>
        </Link>
        <Link to="/account" sx={{ color: `initial`, width: `100%` }}>
          <IconContainer>
            <Profile
              filled={isActiveLink(location.pathname, `account`)}
              size="1.5rem"
            />
          </IconContainer>
        </Link>
      </Flex>
    </div>
  )
}

export default NavigationMobile
