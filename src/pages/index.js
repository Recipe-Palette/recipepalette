/* eslint-disable react/display-name */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Button } from '@theme-ui/components'
import { Fragment } from 'react'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import HeroImage from 'gatsby-background-image'
import Img from 'gatsby-image'
import { useAuth } from 'react-use-auth'

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
    salad: file(relativePath: { eq: "salad.jpg" }) {
      childImageSharp {
        fluid {
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
    feature01: file(relativePath: { eq: "feature-01.png" }) {
      childImageSharp {
        fixed(width: 360) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    feature02: file(relativePath: { eq: "feature-02.png" }) {
      childImageSharp {
        fixed(width: 360) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    feature03: file(relativePath: { eq: "feature-03.png" }) {
      childImageSharp {
        fixed(width: 360) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`

export default () => {
  const {
    appetizer,
    bread,
    dessert,
    breakfast,
    pasta,
    salad,
    hero,
    feature01,
    feature02,
    feature03,
  } = useStaticQuery(imageQuery)
  const { isAuthenticated, login } = useAuth()

  return (
    <Fragment>
      <section
        sx={{
          height: [320, 600],
        }}
      >
        <HeroImage
          fluid={[
            `linear-gradient(rgba(235,123,21,.25), rgba(128,65,13,.75))`,
            hero.childImageSharp.fluid,
          ]}
          sx={{
            position: `absolute !important`,
            top: 0,
            right: 0,
            left: 0,
            height: [320, 600],
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            mb: [`4`, `5`],
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
      </section>
      <h2 sx={{ fontSize: `5` }}>Explore Categories</h2>
      <section
        sx={{
          display: `grid`,
          gridTemplateColumns: [
            `repeat(2, minmax(150px, 1fr))`,
            `repeat(3, minmax(150px, 1fr))`,
          ],
          gridAutoFlow: `row`,
          gridGap: [`3`, `4`],
          mb: `3`,
        }}
      >
        <CategoryCard name="Breakfast" image={breakfast} />
        <CategoryCard name="Appetizers" image={appetizer} />
        <CategoryCard name="Salad" image={salad} />
        <CategoryCard name="Bread" image={bread} />
        <CategoryCard name="Pasta" image={pasta} />
        <CategoryCard name="Desserts" image={dessert} />
      </section>
      <section sx={{ display: `flex`, flexDirection: `column` }}>
        <div
          sx={{
            display: `flex`,
            flexDirection: [`column`, `row`],
            alignItems: `center`,
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <div sx={{ mr: `3` }}>
            <Img
              sx={{ display: [`none`, `flex`] }}
              style={{
                width: 300,
                height: 300,
              }}
              fixed={feature01.childImageSharp.fixed}
            />
          </div>
          <div sx={{ textAlign: [`center`, `left`], mb: `3` }}>
            <h3 sx={{ mt: `1`, mb: `1`, fontSize: `4` }}>
              Automatic Version Control
            </h3>
            <p>
              Store recipes digitally, no more cryptic in margins of recipe
              books or note cards because every edit is tracked and recorded
            </p>
          </div>
        </div>
        <div
          sx={{
            display: `flex`,
            flexDirection: [`column`, `row`],
            alignItems: `center`,
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <div sx={{ mr: `3` }}>
            <Img
              style={{
                width: 300,
                height: 300,
              }}
              fixed={feature02.childImageSharp.fixed}
            />
          </div>
          <div sx={{ textAlign: [`center`, `left`], mb: `3` }}>
            <h3 sx={{ mt: `1`, mb: `1`, fontSize: `4` }}>Available Anywhere</h3>
            <p>
              Optimized for usage on any device and screen size, keep your
              recipe collection stored in tiny bytes instead of binders
            </p>
          </div>
        </div>
        <div
          sx={{
            display: `flex`,
            flexDirection: [`column`, `row`],
            alignItems: `center`,
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <div sx={{ mr: `3` }}>
            <Img
              style={{
                width: 300,
                height: 300,
              }}
              fixed={feature03.childImageSharp.fixed}
            />
          </div>
          <div sx={{ textAlign: [`center`, `left`], mb: `3` }}>
            <h3 sx={{ mt: `1`, mb: `1`, fontSize: `4` }}>Advanced Search</h3>
            <p>
              Find recipes based on tagged categories, and build your own
              collection of diet-friendly alternatives or varieties
            </p>
          </div>
        </div>
      </section>
      <section
        sx={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
          my: `5`,
        }}
      >
        <h2 sx={{ fontSize: `5` }}>Join Recipe Palette for Free</h2>
        <Button
          onClick={() =>
            isAuthenticated() ? navigate('/palette/recipes') : login()
          }
        >
          Get Started
        </Button>
      </section>
    </Fragment>
  )
}
