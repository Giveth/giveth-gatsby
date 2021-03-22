describe('Test cookies button', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('/')
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Should be null first time page is visited', () => {
    cy.getLocalStorage('cookiesAccepted').should('equal', null)
  })

  it('Should be true after clicking cookies button', () => {
    cy.get('#cookies').click()
    cy.getLocalStorage('cookiesAccepted').should('equal', 'true')
  })

  it('Should be true after reloading', () => {
    cy.getLocalStorage('cookiesAccepted').then(cookiesAccepted => {
      expect(cookiesAccepted).to.equal('true')
    })
  })
})
