describe('Test soft launch warnings on first page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // it('Should open and close toast soft launch', () => {
  //   cy.contains(/We're in Softlaunch mode/i).should('exist')
  //   cy.contains(/We're in Softlaunch mode/i).click()
  //   cy.contains(/We're in Softlaunch mode/i).should('not.exist')
  // })

  it('Should open github soft launch', () => {
    cy.contains(/give feedback/i).should('exist')
    cy.contains(/give feedback/i).click()
    // Can't go further as Cypress does not support it: https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs
  })
})
