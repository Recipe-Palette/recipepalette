/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import HeroImage from 'gatsby-background-image'

import Layout from '../components/layout'
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
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default () => {
  const { appetizer, bread, dessert, breakfast, pasta, hero } = useStaticQuery(
    imageQuery
  )

  return (
    <Layout location={location}>
      <HeroImage
        fluid={[
          `linear-gradient(rgba(235,123,21,.25), rgba(128,65,13,.75))`,
          hero.childImageSharp.fluid,
        ]}
        sx={{
          height: [320, 520],
          borderRadius: `3`,
          '&::before, &::after': {
            borderRadius: `3`,
          },
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        <div
          sx={{
            color: `background`,
            textAlign: `center`,
            width: [`90%`, `60%`],
          }}
        >
          <Title
            sx={{
              fontSize: [`5`, `6`],
              width: `80%`,
              mx: `auto`,
              textShadow: `0px 2px 12px #444`,
              '&': { textAlign: `center` },
            }}
          >
            Discover and keep track of recipes
          </Title>
          <div
            sx={{
              display: `flex`,
              justifyContent: 'center',
              fontSize: `3`,
              mb: [`1`, `3`],
            }}
          >
            <SearchBar
              sx={{
                width: '100%',
                maxWidth: '700px',
                backgroundColor: `background`,
                boxShadow: `0 0 30px -5px #444`,
                borderRadius: `2`,
              }}
              labelSx={{
                p: `3`,
              }}
            />
          </div>
        </div>
      </HeroImage>

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
