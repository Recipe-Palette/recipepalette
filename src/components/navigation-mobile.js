/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, navigate } from 'gatsby'
import { Flex } from '@theme-ui/components'
import styled from '@emotion/styled'
import { useAuth } from 'react-use-auth'

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
            isAuthenticated() ? navigate('/my-recipes') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Book
            filled={isActiveLink(location.pathname, `my-recipes`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer
          onClick={() =>
            isAuthenticated() ? navigate('/my-hearted') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Heart
            filled={isActiveLink(location.pathname, `my-hearted`)}
            size="1.5rem"
          />
        </IconContainer>
        <IconContainer
          onClick={() =>
            isAuthenticated() ? navigate('/my-bookmarked') : login()
          }
          sx={{ color: `initial`, width: `100%`, cursor: `pointer` }}
        >
          <Bookmark
            filled={isActiveLink(location.pathname, `my-bookmarked`)}
            size="1.5rem"
          />
        </IconContainer>
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
