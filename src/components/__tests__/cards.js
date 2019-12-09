import React from 'react'
import { render } from 'rp-test-utils'
import { RecipeCard } from '../cards'

test('temp', () => {
  expect(true).toBe(true)
})

test('Default RecipeCard renders', () => {
  const { getByText, getAllByText } = render(<RecipeCard />)

  expect(getByText(/recipe name/i)).toBeTruthy()
  expect(getAllByText(/5/)).toHaveLength(3)
  expect(getAllByText(/15m/)).toHaveLength(1)
})

test('Custom RecipeCard renders', () => {
  const { getByText } = render(
    <RecipeCard name="Test Card" hearts={4} copies={5} time={90} />
  )

  expect(getByText(/test card/i)).toBeTruthy()
  expect(getByText(/4/)).toBeTruthy()
  expect(getByText(/5/)).toBeTruthy()
  expect(getByText(/1h 30m/)).toBeTruthy()
})
