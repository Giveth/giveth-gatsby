import Web3 from 'web3'

describe('Test connect wallet', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().then(window => {
      const ethereum = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      )
      window.ethereum = ethereum
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
          token: Cypress.env('CYPRESS_USER_LOCAL_TOKEN')
        })
      )

      window.localStorage.setItem(
        'giveth_user_local_token',
        Cypress.env('CYPRESS_USER_LOCAL_TOKEN')
      )
    })
  })

  it('do something', () => {
    cy.window().then(window => {
      console.log('window:', window)
      const ethereum = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      )
      window.ethereum = ethereum
      console.log('ethereum', ethereum)
      // ethereum.eth.getAccounts().then(console.log)
      // window.localStorage.setItem(
      //   'giveth_user_local',
      //   JSON.stringify({
      //     walletType: '',
      //     walletAddresses: ['0x3F0042ee1f195feE43Bd23A9B0b459aCD4A6FB3d'],
      //     activeWalletIndex: 0,
      //     avatar: null,
      //     email: 'giveth1@yopmail.com',
      //     id: '1',
      //     firstName: 'Test',
      //     lastName: 'Giveth',
      //     location: 'earth',
      //     name: 'Test Giveth',
      //     url: '',
      //     token: 'lala'
      //   })
      // )
    })
    cy.window()
  })
})
