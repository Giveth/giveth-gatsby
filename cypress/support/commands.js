import '@testing-library/cypress/add-commands'
import 'cypress-localstorage-commands'
import Web3 from 'web3'

Cypress.Commands.add('setWeb3Provider', () => {
  cy.window().then(window => {
    window.ethereum = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:8545')
    )
    window.ethereum.isTest = true

    window.localStorage.setItem('cookiesAccepted', 'true')
    window.localStorage.setItem('githubIssueClosed', 'true')
    window.localStorage.setItem(
      'giveth_user_local',
      JSON.stringify({
        walletType: '',
        walletAddresses: ['0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73'],
        activeWalletIndex: 0,
        avatar: null,
        email: 'giveth1@yopmail.com',
        id: '1',
        firstName: 'Test',
        lastName: 'Giveth',
        location: 'earth',
        name: 'Test Giveth',
        url: '',
        token: Cypress.env('CYPRESS_USER_LOCAL_TOKEN'),
        isTest: true
      })
    )

    window.localStorage.setItem(
      'giveth_user_local_token',
      Cypress.env('CYPRESS_USER_LOCAL_TOKEN')
    )
  })
})
