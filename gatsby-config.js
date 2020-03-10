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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-156556275-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/preview/**', '/do-not-track/me/too/'],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'recipepalette.com',
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
  ],
}
