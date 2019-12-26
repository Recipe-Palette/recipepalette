/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { useAuth } from 'react-use-auth'

import Title from '../components/title'
import Layout from '../components/layout'
import { CategoryCard } from '../components/cards'

const imageQuery = graphql`
  {
    appetizer: file(relativePath: { eq: "appetizer.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    bread: file(relativePath: { eq: "bread.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    dessert: file(relativePath: { eq: "dessert.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    breakfast: file(relativePath: { eq: "breakfast.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    pasta: file(relativePath: { eq: "pasta.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    soup: file(relativePath: { eq: "soup.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default () => {
  const { appetizer, bread, dessert, breakfast, pasta } = useStaticQuery(
    imageQuery
  )
  const { isAuthenticated } = useAuth()

  return (
    <Layout>
      <div
        sx={{
          textAlign: `center`,
          mt: `6`,
          mb: `6`,
        }}
      >
        <Title>The best way to keep track of recipes</Title>
        <input
          sx={{
            px: `3`,
            py: `2`,
            mx: `auto`,
            mb: `3`,
            fontSize: `3`,
            minWidth: `75%`,
            display: `block`,
          }}
          placeholder="Find a recipe..."
        />
        {!isAuthenticated() && (
          <Link sx={{ variant: `button.link`, display: `inline-block` }} to="/">
            Join for free!
          </Link>
        )}
      </div>
      <h2>Explore Recipes</h2>
      <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(175px, 1fr))`,
          gridAutoFlow: `row`,
          gridGap: `2`,
          mb: `4`,
        }}
      >
        <CategoryCard name="Appetizers" image={appetizer} />
        <CategoryCard name="Bread" image={bread} />
        <CategoryCard name="Desserts" image={dessert} />
        <CategoryCard name="Breakfast" image={breakfast} />
        <CategoryCard name="Pasta" image={pasta} />
      </div>
    </Layout>
  )
}
