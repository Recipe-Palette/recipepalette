/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import { Button } from '@theme-ui/components'
import { useAuth } from 'react-use-auth'
import { Fragment } from 'react'

import SearchBar from '../components/search-bar'
import Title from '../components/title'
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
  const { isAuthenticated, login } = useAuth()

  return (
    <Fragment>
      <div
        sx={{
          textAlign: `center`,
          mt: `6`,
          mb: `6`,
        }}
      >
        <Title sx={{ '&': { textAlign: `center` } }}>
          The best way to keep track of recipes
        </Title>
        <div
          sx={{
            display: `flex`,
            justifyContent: 'center',
            fontSize: `3`,
            mb: [`1`, `3`],
          }}
        >
          <SearchBar sx={{ width: '100%', maxWidth: '700px' }} />
        </div>
        {!isAuthenticated() && (
          <Button
            sx={{ variant: `buttons.link`, display: `inline-block` }}
            onClick={() => login()}
          >
            Join for free!
          </Button>
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
    </Fragment>
  )
}
