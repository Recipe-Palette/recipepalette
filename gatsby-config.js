module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-auth`,
    `gatsby-plugin-apollo`,
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
