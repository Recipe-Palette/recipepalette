describe('app', () => {
  it('works', () => {
    cy.visit('/')
      .findByText(/my recipes/i)
      .click()
  })
})
