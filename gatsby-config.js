module.exports = {
  plugins: [
    // image optimization
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-toast',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // Theme-UI support
    `gatsby-plugin-theme-ui`,
    // local plugins to wrapRootElement
    `gatsby-plugin-auth`,
    `gatsby-plugin-apollo`,
    // create routes for client side routing
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/recipe/*`, `/palette/*`, `/search/*`] },
    },
    `gatsby-plugin-netlify`,
    // PWA support
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Recipe Palette`,
        short_name: `Recipe Palette`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#eb7b15`,
        display: `standalone`,
        icon: `src/images/logo.png`,
      },
    },
  ],
}
