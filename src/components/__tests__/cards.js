import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'theme-ui'
import Theme from '../../gatsby-plugin-theme-ui'
import { RecipeCard } from '../cards'

test('temp', () => {
  expect(true).toBe(true)
})

test('Default RecipeCard renders', () => {
  const { getByText, getAllByText } = render(
    <ThemeProvider theme={Theme}>
      <RecipeCard />
    </ThemeProvider>
  )

  expect(getByText(/recipe name/i)).toBeTruthy()
  expect(getAllByText(/5/)).toHaveLength(3)
  expect(getAllByText(/15m/)).toHaveLength(1)
})

test('Custom RecipeCard renders', () => {
  const { getByText, debug } = render(
    <ThemeProvider theme={Theme}>
      <RecipeCard name="Test Card" hearts={4} copies={5} time={90} />
    </ThemeProvider>
  )

  expect(getByText(/test card/i)).toBeTruthy()
  expect(getByText(/4/)).toBeTruthy()
  expect(getByText(/5/)).toBeTruthy()
  expect(getByText(/1h 30m/)).toBeTruthy()

  debug()
})
