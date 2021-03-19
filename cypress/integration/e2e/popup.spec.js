describe('Test Popup', () => {
  it('Should open the popup when wanting to create a project', () => {
    cy.visit('/')
    cy.contains(/create a project/i).click()
    cy.wait(3000)
    cy.contains(/close/i).click()
    cy.contains(/close/i).should('not.exist')
  })
})
