import Web3 from 'web3'

describe('Test connect wallet', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('/')
    cy.setWeb3Provider()
  })

  // check we can always go back
  // check we cannot next if to input filled
  // check that if we go back input is well filled
  // Why is it possible to not enter a description...

  context('Form submission', () => {
    const projectData = {
      projectName: 'Super Project Name Test',
      projectAdmin: 'Super Admin Test',
      projectDescription: 'Super description for Test',
      projectLocation: 'Earth'
    }
    it('creates a project', () => {
      cy.get('button')
        .contains(/create a project/i)
        .click()
      // add autoFocus ?
      // id = projectName
      // cy.server & cy.route
      // Use fixtures to store predefined data

      // Project Name
      cy.wait(2000)
      cy.get('#projectName')
        .type(projectData.projectName)
        .should('have.value', projectData.projectName)
      cy.get('button')
        .contains(/next/i)
        .click()

      // Project Admin
      cy.wait(2000)
      cy.get('#projectAdmin')
        .type(projectData.projectAdmin)
        .should('have.value', projectData.projectAdmin)
      cy.get('button')
        .contains(/next/i)
        .click()

      // Project Description
      cy.wait(2000)
      cy.get('#projectDescription')
        .type(projectData.projectDescription)
        .should('have.value', projectData.projectDescription)
      cy.get('button')
        .contains(/next/i)
        .click()

      // Project Description
      cy.wait(2000)
      cy.get('label')
        .contains(/community/i)
        .click()
      cy.get('button')
        .contains(/next/i)
        .click()

      // Project Location
      cy.wait(2000)
      cy.get('input[type="checkbox"]').click({ force: true })
      cy.get('button')
        .contains(/next/i)
        .click()

      // Project Image
      cy.wait(2000)
      cy.get('div[type="button"]').each(($el, index) => {
        console.log('button', $el)
        cy.wrap($el).click()
        cy.wait(1000)
        cy.get('#projectImage').should('have.a.value', index + 1)
      })
      cy.get('button')
        .contains(/next/i)
        .click()

      // projectWalletAddress
      cy.wait(2000)
      cy.get('button')
        .contains(/next/i)
        .click()
      cy.get('.Toastify__toast-container')
        .should('exist')
        .click()
      cy.wait(2000)
      cy.get('.Toastify__toast-container').should('not.exist')

      // Address already used
      cy.get('#projectWalletAddress').type(
        '0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73'
      )
      cy.get('button')
        .contains(/next/i)
        .click()
      cy.get('.Toastify__toast-container')
        .should('exist')
        .click()
      cy.wait(2000)
      cy.get('.Toastify__toast-container').should('not.exist')

      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      )
      const account = web3.eth.accounts.create()
      cy.get('#projectWalletAddress').type(account?.address)
      cy.get('button')
        .contains(/next/i)
        .click()

      cy.wait(2000)
      cy.findByText(projectData.projectName).should('exist')
      cy.findByText(projectData.projectAdmin).should('exist')
      cy.findByText(projectData.projectDescription).should('exist')
      cy.findByText('Global').should('exist')
    })
  })
})
