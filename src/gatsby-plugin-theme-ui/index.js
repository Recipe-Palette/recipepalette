import { lighten } from "@theme-ui/color"

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 700,
    bold: 700,
  },
  radii: [2, 4, 8],
  colors: {
    text: "#222",
    background: "#FFF",
    border: "#DDD",
    primary: "#eb7b15",
    secondary: "#e4ab15",
    accent: "#F8C99E",
  },
  button: {
    link: {
      textDecoration: `none`,
      fontSize: `2`,
      px: `3`,
      py: `2`,
      transition: `0.3s all`,
      borderRadius: `1`,
      backgroundColor: lighten(`primary`, 0.25),
      borderWidth: `1px`,
      borderColor: `primary`,
      borderStyle: `solid`,
      color: `text`,
      boxShadow: `0px 0px 4px 0px #a4a4a4`,
      "&:hover": {
        backgroundColor: lighten(`primary`, 0.1),
      },
    },
  },
  layout: {
    container: {
      maxWidth: `960px`,
      header: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        py: `4`,
      },
      footer: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        py: `4`,
      },
    },
  },
}
