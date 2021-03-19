describe('Test warnings on first page', () => {
  it('Should open toast soft launch', () => {
    cy.visit('/')
    cy.contains(/We're in Softlaunch mode/i).click()
    cy.contains(/We're in Softlaunch mode/i).should('not.exist')
  })

  it('Should open github soft launch', () => {
    cy.visit('/')
    cy.contains(/give feedback/i).click()
  })
})
