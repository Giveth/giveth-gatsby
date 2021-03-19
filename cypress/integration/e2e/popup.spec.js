describe('Test wallet popup', () => {
  it('Should open the wallet popup when wanting to create a project', () => {
    cy.visit('/')
    cy.get('button')
      .contains(/create a project/i)
      .click()
    cy.wait(3000)
    cy.contains(/close/i).should('exist')
    cy.contains(/close/i).click()
    cy.contains(/close/i).should('not.exist')
  })
})
