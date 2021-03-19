describe('Test donate button', () => {
  it('Should redirect to projects page', () => {
    cy.visit('/')
    cy.get('button')
      .contains(/donate/i)
      .click()
    cy.url().should('include', 'projects')
  })

  it('Should open popup', () => {
    cy.contains(/create a project/i).should('exist')
    cy.contains(/create a project/i).click({ force: true })
    cy.contains(/welcome to giveth/i)
  })
})
