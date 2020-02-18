/** @jsx jsx */
import { jsx } from 'theme-ui'
import ContentLoader from 'react-content-loader'
import { Flex } from '@theme-ui/components'
import { RecipeCardLoader } from './recipe-card-loader'

const ImageLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={330}
    viewBox="0 0 464 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="330" />
  </ContentLoader>
)

const TitleLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={42}
    viewBox="0 0 300 42"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="42" />
  </ContentLoader>
)

const AuthorLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={20}
    viewBox="0 0 300 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="20" />
  </ContentLoader>
)

const IconLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={32}
    viewBox="0 0 300 32"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
    sx={{
      my: [`2`, `0`],
      mb: `3`,
    }}
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="32" />
  </ContentLoader>
)

const TimeLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={44}
    viewBox="0 0 300 44"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="44" />
  </ContentLoader>
)

const ButtonLoader = () => (
  <ContentLoader
    speed={2}
    width="48%"
    height={36}
    viewBox="0 0 300 36"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="36" />
  </ContentLoader>
)

const RecipeLoader = () => (
  <div>
    <Flex sx={{ flexDirection: [`column`, `row`] }}>
      <div sx={{ width: `100%` }}>
        <TitleLoader />
        <AuthorLoader />
      </div>
      <div sx={{ width: `100%`, pl: [`0`, `3`] }}>
        {' '}
        <IconLoader />
      </div>
    </Flex>
    <div
      sx={{
        display: [`flex`, `grid`],
        gridGap: `3`,
        gridTemplateColumns: `50% 1fr`,
        flexDirection: `column`,
      }}
    >
      <div>
        <ImageLoader />
        <TimeLoader />
      </div>
      <div
        sx={{
          order: 3,
          mt: [`3`, 0],
          overflow: `hidden`,
          display: `flex`,
          flexDirection: `column`,
          justifyContent: `space-between`,
        }}
      >
        <Flex sx={{ justifyContent: `space-between` }}>
          <ButtonLoader />
          <ButtonLoader />
        </Flex>

        <div>
          <IconLoader />
          <Flex
            sx={{
              overflow: `scroll`,
              width: `100%`,
              justifyContent: `space-evenly`,
            }}
          >
            <RecipeCardLoader sx={{ mr: `3` }} />
            <RecipeCardLoader />
          </Flex>
        </div>
      </div>
    </div>
  </div>
)

export { RecipeLoader }
