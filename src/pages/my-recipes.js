/** @jsx jsx */
import { jsx } from "theme-ui"

import Title from "../components/title"
import Layout from "../components/layout"
import { NewCard, RecipeCard } from "../components/cards"

export default ({ data }) => (
  <Layout>
    <div>
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
        <RecipeCard
          name="Hammy's Delightful Chocolate Chip Cookies"
          hearts={234}
          copies={56}
          time={75}
          hearted
          copied
          bookmarked
        />
        <RecipeCard
          name="Pancakes"
          img="https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          hearts={2039}
          copies={120}
          hearted
          bookmarked
        />
        <RecipeCard name="Desserts" bookmarked />
        <RecipeCard name="Breakfast" hearted />
        <RecipeCard name="Pasta" copied />
      </div>
    </div>
  </Layout>
)
