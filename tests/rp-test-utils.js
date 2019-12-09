import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'
import Theme from '../src/gatsby-plugin-theme-ui'

function render(ui, options) {
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

function Wrapper({ children }) {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
}

export * from '@testing-library/react'
export { render }
