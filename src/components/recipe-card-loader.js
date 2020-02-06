/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Card } from '@theme-ui/components'
import ContentLoader from 'react-content-loader'
import CardGrid from './card-grid'

const RecipeCardImageLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={125}
    viewBox="0 0 464 125"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="125px" />
  </ContentLoader>
)

const RecipeCardTitleLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={40}
    viewBox="0 0 464 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="40px" />
  </ContentLoader>
)

const RecipeCardIconLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={20}
    viewBox="0 0 464 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="20px" />
  </ContentLoader>
)

const RecipeCardLoader = props => (
  <Card
    sx={{
      display: `grid`,
      gridTemplateRows: `125px 60px auto`,
      gridRowGap: `1`,
      position: `relative`,
      minHeight: 150,
      p: `3`,
      transition: `0.3s all`,
    }}
    {...props}
  >
    <RecipeCardImageLoader />
    <div
      sx={{
        mt: `2`,
      }}
    >
      <RecipeCardTitleLoader />
    </div>
    <RecipeCardIconLoader />
  </Card>
)

const RecipeCardGridLoader = () => (
  <CardGrid recipes={[]}>
    <RecipeCardLoader key={1} />
    <RecipeCardLoader key={2} />
    <RecipeCardLoader key={3} />
    <RecipeCardLoader key={4} />
    <RecipeCardLoader key={5} />
    <RecipeCardLoader key={6} />
  </CardGrid>
)

export { RecipeCardGridLoader, RecipeCardLoader }
