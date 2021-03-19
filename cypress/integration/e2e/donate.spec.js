describe('Test projects page', () => {
  it('Should redirect to projects page', () => {
    cy.visit('/')
    cy.get('button')
      .contains(/donate/i)
      .click()
    cy.url().should('include', 'projects')
  })

  it('Should open popup', () => {
    cy.visit('/projects')
    cy.contains(/create a project/i).click()
    cy.contains(/welcome to giveth/i)
  })
})
