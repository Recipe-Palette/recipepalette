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
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-style: solid;
  border-bottom: none;
  padding-top: ${({ theme }) => `${theme.space[3]}px`};
  padding-bottom: ${({ theme }) => `${theme.space[3]}px`};
`

const NavigationMobile = () => (
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
          <Book filled size="2rem" />
        </IconContainer>
      </Link>
      <IconContainer>
        <Heart filled size="2rem" />
      </IconContainer>
      <IconContainer>
        <Bookmark filled size="2rem" />
      </IconContainer>
      <IconContainer>
        <Profile filled size="2rem" />
      </IconContainer>
    </Flex>
  </div>
)

export default NavigationMobile
