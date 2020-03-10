module.exports = {
  siteMetadata: {
    title: `Recipe Palette`,
    description: `The best way to discover and keep track of recipes`,
    siteUrl: `https://recipepalette.com`,
  },
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
      options: { prefixes: [`/recipe/*`, `/search/*`] },
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
    `gatsby-plugin-offline`,
    // prefetch google fonts
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Istok Web:300,400,700', 'Open Sans:300,400,700'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: `UA-156556275-1`,
      },
    },
  ],
}
