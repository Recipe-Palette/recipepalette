import { lighten, alpha } from '@theme-ui/color'

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
  radii: [1, 2, 4, 8],
  colors: {
    text: '#222',
    background: '#FFF',
    accentBackground: '#FFF',
    border: '#DDD',
    gray: '#8e8d8d',
    primary: '#eb7b15',
    secondary: '#e4ab15',
    accent: '#F8C99E',
    hearted: '#FFB7E2',
    copied: '#B1E5F3',
    bookmarked: '#C1E1AE',
    error: '#C00',
  },
  badges: {
    primary: {
      cursor: `pointer`,
      color: `primary`,
      backgroundColor: alpha(`primary`, 0.15),
      fontSize: `1`,
      px: `2`,
      py: `1`,
      borderRadius: `2`,
      textAlign: `center`,
    },
    secondary: {
      py: `0`,
      px: `2`,
      ml: `2`,
      color: `white`,
      backgroundColor: alpha(`secondary`, 0.5),
      borderRadius: `2`,
      fontSize: `2`,
    },
  },
  buttons: {
    primary: {
      cursor: `pointer`,
      color: `background`,
      boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`,
      backgroundColor: `primary`,
      transition: `0.2s all`,
      fontWeight: `bold`,
      textDecoration: `none`,
      fontSize: `2`,
      px: `3`,
      py: `2`,
      borderRadius: `2`,
      textAlign: `center`,
      outline: 0,
      '&:active, &:focus': {
        boxShadow: theme => `0px 0px 0px 3px ${theme.colors.accent}`,
      },
      '&:hover': {
        backgroundColor: lighten(`primary`, 0.1),
      },
    },
    secondary: {
      cursor: `pointer`,
      color: `gray`,
      transition: `0.2s all`,
      textDecoration: `none`,
      fontSize: `2`,
      px: `2`,
      py: `1`,
      borderRadius: `2`,
      textAlign: `center`,
      outline: 0,
      boxShadow: `none`,
      '&:active, &:focus': {
        background: theme => `0px 0px 0px 3px ${theme.colors.accent}`,
      },
      '&:hover': {
        backgroundColor: alpha(`primary`, 0.1),
      },
    },
    link: {
      whiteSpace: `nowrap`,
      textAlign: `center`,
      '&:hover': {
        backgroundColor: lighten(`primary`, 0.1),
      },
    },
    icon: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      cursor: `pointer`,
      borderRadius: 999,
      padding: 1,
      transition: `0.15s all ease-in-out`,
      color: `text`,
      '&:hover': {
        background: `rgba(25,25,25,0.05)`,
      },
      outline: 0,
      '&:active, &:focus': {
        boxShadow: theme => `0 0 0 3px ${theme.colors.accent}`,
      },
    },
  },
  cards: {
    primary: {
      cursor: `pointer`,
      borderRadius: `2`,
      border: theme => `1px solid ${theme.colors.border}`,
      // boxShadow: `0px 2px 4px 0px rgba(225, 227, 229, 0.75)`,
      // '&:hover': {
      //   boxShadow: `0px 3.5px 6px 0px rgba(225, 227, 229, 0.75)`,
      // },
      outline: 0,
      '&:active, &:focus': {
        boxShadow: theme => `0 0 0 3px ${theme.colors.accent}`,
      },
    },
    recipeMini: {
      height: `100%`,
      outline: 0,
      '&:active, &:focus': {
        boxShadow: theme => `0 0 0 3px ${theme.colors.accent}`,
      },
    },
  },
  layout: {
    container: {
      maxWidth: `960px`,
      px: [`3`, `0`],
      header: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        py: `3`,
        '*+*': { marginLeft: [`0`, `3`] },
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
      error: {
        borderColor: `error`,
      },
    },
    textarea: {
      borderColor: `border`,
      error: {
        borderColor: `error`,
      },
    },
    select: {
      borderColor: `border`,
    },
  },
  styles: {
    hr: {
      color: `border`,
      my: `4`,
    },
  },
}
