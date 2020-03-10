/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { Flex } from '@theme-ui/components'
import styled from '@emotion/styled'
import { useAuth } from 'react-use-auth'

import { Heart, Bookmark, Book, Profile, Search } from './icons'

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

const NavigationMobile = ({ location, toggleDrawer, mobileSearchToggle }) => {
  const { isAuthenticated, login } = useAuth()
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
        <IconContainer
          onClick={() =>
            isAuthenticated() ? navigate('/palette/recipes') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Book
            filled={isActiveLink(location.pathname, `recipes`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer
          onClick={() =>
            isAuthenticated() ? navigate('/palette/hearts') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Heart
            filled={isActiveLink(location.pathname, `hearts`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer
          onClick={() =>
            isAuthenticated() ? navigate('/palette/bookmarks') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Bookmark
            filled={isActiveLink(location.pathname, `bookmarks`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer
          onClick={() => navigate('/palette/account')}
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Profile
            filled={isActiveLink(location.pathname, `account`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer onClick={toggleDrawer} ref={mobileSearchToggle}>
          <Search
            filled={isActiveLink(location.pathname, `search`)}
            size="1.5rem"
          />
        </IconContainer>
      </Flex>
    </div>
  )
}

export default NavigationMobile
