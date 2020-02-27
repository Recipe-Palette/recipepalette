/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'

import { RecipeCard } from './cards'
import NotFoundGraphic from './not-found-graphic'

const CardGrid = ({ recipes, emptyTitle, emptyNote, children, ...props }) => (
  <Fragment>
    <div
      sx={{
        display: `grid`,
        gridTemplateColumns: [`repeat(auto-fill, minmax(275px, 1fr))`],
        gridAutoFlow: `row`,
        gridGap: `3`,
        mb: `4`,
      }}
      {...props}
    >
      {children}
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
    {!children && !recipes.length && (
      <NotFoundGraphic title={emptyTitle} note={emptyNote} />
    )}
  </Fragment>
)

export default CardGrid
