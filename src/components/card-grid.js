/** @jsx jsx */
import { jsx } from 'theme-ui'
import { RecipeCard } from './cards'

const CardGrid = ({ recipes, children }) => (
  <div
    sx={{
      display: `grid`,
      gridTemplateColumns: [`repeat(auto-fit, minmax(275px, 1fr))`],
      gridAutoFlow: `row`,
      gridGap: `3`,
      mb: `4`,
    }}
  >
    {children}
    {recipes.map((recipe, index) => (
      <RecipeCard key={index} recipe={recipe} />
    ))}
  </div>
)

export default CardGrid
