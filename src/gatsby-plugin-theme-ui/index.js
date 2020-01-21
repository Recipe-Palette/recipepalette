import { lighten } from '@theme-ui/color'

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
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
    text: '#222',
    background: '#FFF',
    border: '#DDD',
    gray: '#8e8d8d',
    primary: '#eb7b15',
    secondary: '#e4ab15',
    accent: '#F8C99E',
    hearted: '#FFB7E2',
    copied: '#B1E5F3',
    bookmarked: '#C1E1AE',
  },
  buttons: {
    primary: {
      cursor: `pointer`,
      color: `background`,
      borderWidth: `1px`,
      borderColor: `primary`,
      borderStyle: `solid`,
      boxShadow: `0px 0px 4px 0px #a4a4a4`,
      backgroundColor: `primary`,
      transition: `0.2s all`,
      fontWeight: `bold`,
      textDecoration: `none`,
      fontSize: `2`,
      px: `3`,
      py: `2`,
      borderRadius: `1`,
      textAlign: `center`,
      '&:hover': {
        backgroundColor: lighten(`primary`, 0.1),
      },
    },
    link: {
      // backgroundColor: lighten(`primary`, 0.25),
      // color: `text`,
      // boxShadow: `0px 0px 4px 0px #a4a4a4`,
      textAlign: `center`,
      '&:hover': {
        backgroundColor: lighten(`primary`, 0.1),
      },
    },
    icon: {
      display: `flex`,
      alignItems: `center`,
    },
  },
  cards: {
    primary: {
      cursor: `pointer`,
      borderRadius: `1`,
      border: theme => `1px solid ${theme.colors.border}`,
      boxShadow: `0px 2px 4px 0px rgba(225, 227, 229, 0.75)`,
      '&:hover': {
        boxShadow: `0px 3.5px 6px 0px rgba(225, 227, 229, 0.75)`,
      },
    },
    recipeMini: {
      my: `1`,
      mr: `3`,
      height: `calc(100% - 16px)`,
    },
  },
  layout: {
    container: {
      maxWidth: `960px`,
      px: `3`,
      header: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        py: `3`,
        '*+*': { marginLeft: `3` },
      },
      footer: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `center`,
        py: `3`,
      },
    },
  },
  forms: {
    label: {
      fontSize: [`3`, `4`],
      fontWeight: `heading`,
      mt: `4`,
      mb: `2`,
    },
    input: {
      display: `block`,
      width: `100%`,
      p: 2,
      appearance: `none`,
      fontSize: `inherit`,
      lineHeight: `inherit`,
      border: `1px solid`,
      borderRadius: 4,
      color: `inherit`,
      bg: `background`,
      borderColor: `border`,
    },
    textarea: {
      borderColor: `border`,
    },
    select: {
      borderColor: `border`,
    },
  },
}
