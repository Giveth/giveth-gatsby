import Web3 from 'web3'

describe('Project creation', () => {
  const projectData = {
    projectName: 'Super Project Name Test',
    projectAdmin: 'Super Admin Test',
    projectDescription: 'Super description for Test',
    projectLocation: 'Paris'
  }

  before(() => {
    cy.restoreLocalStorage()
    cy.visit('/')
    cy.setWeb3Provider()
  })

  describe('Creates a project', () => {
    it('clicks on create a project button', () => {
      cy.wait(2000)
      cy.get('button')
        .contains(/create a project/i)
        .click()
    })
    it('fills the name of the project', () => {
      cy.wait(2000)
      cy.get('#projectName')
        .type(projectData.projectName)
        .should('have.value', projectData.projectName)
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills the name of the admin', () => {
      cy.wait(2000)
      cy.get('#projectAdmin')
        .type(projectData.projectAdmin)
        .should('have.value', projectData.projectAdmin)
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills the description of the project', () => {
      cy.wait(2000)
      cy.get('#projectDescription')
        .type(projectData.projectDescription)
        .should('have.value', projectData.projectDescription)
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills the label of the project', () => {
      cy.wait(2000)
      cy.get('label')
        .contains(/community/i)
        .click()
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills the location of the project', () => {
      cy.wait(2000)
      cy.get('input[type="checkbox"]').click({ force: true })
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills the image of the project', () => {
      cy.wait(2000)
      cy.get('div[type="button"]').each(($el, index) => {
        cy.wrap($el).click()
        cy.wait(1000)
        cy.get('#projectImage').should('have.a.value', index + 1)
      })
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    it('fills an empty address for the project and does not pass', () => {
      cy.wait(2000)
      cy.get('button')
        .contains(/next/i)
        .click()
      cy.get('.Toastify__toast-container')
        .should('exist')
        .click()
      cy.wait(3000)
      cy.get('.Toastify__toast-container').should('not.exist')
    })
    it('fills an address already used for the project and does not pass', () => {
      cy.get('#projectWalletAddress').type(
        '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73'
      )
      cy.get('button')
        .contains(/next/i)
        .click()
      cy.get('.Toastify__toast-container')
        .should('exist')
        .click()
      cy.wait(3000)
      cy.get('.Toastify__toast-container').should('not.exist')
    })
    it('goes back and checks that the right image is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.get('div[type="button"]')
        .get('#projectImage')
        .should('have.a.value', 4)
    })
    it('goes back and checks that the right location is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.wait(2000)
      cy.get('div')
        .contains(/global/i)
        .should('exist')
    })
    it('changes the location, submits it and goes back', () => {
      cy.wait(2000)
      cy.get('input[type="checkbox"]').click({ force: true })
      cy.wait(2000)
      // Only way to update an input hidden with cypress
      cy.get('#projectImpactLocation').then(elem => {
        elem.val(projectData.projectLocation)
      })
      cy.get('#projectImpactLocation').should(
        'have.value',
        projectData.projectLocation
      )
      cy.get('button')
        .contains(/next/i)
        .click()
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
    })
    it('goes back and checks that the right label is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.wait(2000)
      cy.get('input[id="community"]').should('be.checked')
    })
    it('goes back and checks that the description is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.wait(2000)
      cy.findByText(projectData.projectDescription).should('exist')
    })
    it('goes back and checks that the admin is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.wait(2000)
      cy.get('#projectAdmin').should('have.value', projectData.projectAdmin)
    })
    it('goes back and checks that the name of the project is set', () => {
      cy.wait(2000)
      cy.get('button[aria-label="Back"]')
        .contains(/back/i)
        .click()
      cy.wait(2000)
      cy.get('#projectName').should('have.value', projectData.projectName)
    })
    it('clicks next until the end', () => {
      for (let i = 0; i < 6; i++) {
        cy.wait(1000)
        cy.get('button')
          .contains(/next/i)
          .click()
        cy.wait(1000)
      }
    })
    const web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    )
    const address = web3.eth.accounts.create()?.address
    it('fills a newly created not used address for the project and passes', () => {
      cy.get('#projectWalletAddress').type(address)
      cy.get('button')
        .contains(/next/i)
        .click()
    })
    xit('checks that the right values are shown', () => {
      cy.wait(2000)
      cy.findByText(projectData.projectName).should('exist')
      cy.findByText(projectData.projectAdmin).should('exist')
      cy.findByText(projectData.projectDescription).should('exist')
      cy.findByText(projectData.projectLocation).should('exist')
      cy.findByText(address).should('exist')
    })
  })
})
