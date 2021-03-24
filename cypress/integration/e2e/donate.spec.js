describe('Test donate button', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should redirect to projects page', () => {
    cy.get('button')
      .contains(/donate/i)
      .click()
    cy.url().should('include', 'projects')
  })

  xit('Should open popup', () => {
    cy.contains(/create a project/i).should('exist')
    cy.contains(/create a project/i).click({ force: true })
    cy.contains(/welcome to giveth/i)
  })
})
