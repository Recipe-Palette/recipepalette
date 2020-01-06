/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'

import Title from '../components/title'
import Layout from '../components/layout'
import { NewCard, RecipeCard } from '../components/cards'

import recipes from '../../data/recipes'

export default () => (
  <Layout>
    <div
      sx={{
        py: `4`,
      }}
    >
      <Title>My Recipes</Title>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: [`repeat(auto-fit, minmax(275px, 1fr))`],
          gridAutoFlow: `row`,
          gridGap: `3`,
          mb: `4`,
        }}
      >
        <NewCard />
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </div>
  </Layout>
)
