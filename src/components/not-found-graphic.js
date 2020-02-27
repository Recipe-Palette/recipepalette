/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex } from '@theme-ui/components'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

const imageQuery = graphql`
  {
    notFound: file(relativePath: { eq: "not-found-graphic.png" }) {
      childImageSharp {
        fluid(maxWidth: 540) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const NotFoundGraphic = ({ title, note }) => {
  const { notFound } = useStaticQuery(imageQuery)
  console.log(notFound)
  return (
    <Flex sx={{ flexDirection: `column`, alignItems: `center`, mb: `4` }}>
      <Img
        sx={{ maxWidth: 300, width: `50%` }}
        fluid={notFound.childImageSharp.fluid}
      />
      <h2 sx={{ color: `gray`, mb: `2` }}>{title || `Not found`}</h2>
      <span sx={{ color: `gray`, fontSize: `1` }}>
        {note || `Looks like you haven't added anything here yet!`}
      </span>
    </Flex>
  )
}

export default NotFoundGraphic
