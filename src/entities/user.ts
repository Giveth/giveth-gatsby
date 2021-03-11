
import { ProjectNameInput } from '../components/create-project-form/inputs/ProjectNameInput';
import { isAddressENS } from '../services/wallet';
import { Location } from '@reach/router';
import {
  getLocalStorageUserLabel,
  getLocalStorageTokenLabel
} from '../services/auth'

const gatsbyUser = getLocalStorageUserLabel()
const tokenLabel = getLocalStorageTokenLabel()

export default class User {
  id: number
  token: string
  activeWalletIndex: number
  walletAddresses: string[]
  activeWallet: string
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  password?: string
  avatar?: string
  url?: string
  location?: string
  loginType: string
  confirmed: boolean
  walletType: string
  
  constructor(walletType, initUser) {
    this.walletType = walletType
    this.walletAddresses = []

    if(initUser) {
      this.parseInitUser(initUser)
    }
  }

  parseInitUser(initUser) {
    if(this.walletType === 'torus') {
      this.parseTorusUser(initUser) 
    } else {
      this.walletType = initUser.walletType
      this.walletAddresses = initUser.walletAddresses
      this.id = initUser.id
      this.token = initUser.token
      this.parseDbUser(initUser)
    }
  }

  /**
   * From the database
   * @param initUser 
   */
  parseDbUser(dbUser) {   
    this.avatar = dbUser.avatar
    this.email = dbUser.email
    this.id = dbUser.id
    this.firstName = dbUser.firstName
    this.lastName = dbUser.lastName
    this.location = dbUser.location
    this.name = dbUser.name
    this.url = dbUser.url
  }

  setUserId(userId) {
    this.id = userId
  }

  setToken(token) {
    this.token = token
    
    localStorage.setItem(tokenLabel, token)
  }

  addWalletAddress(address, activeWallet) {
    this.walletAddresses.push(address)
  
    if(activeWallet) {
      this.activeWalletIndex = this.walletAddresses.indexOf(address)
    }
    
    
  }

  getAuthObject() {
    return {
        addresses: this.walletAddresses
    }
  }

  getName() {
    function truncAddress (address) {
      return `${address.substring(0, 5)}...${address.substring(
        address.length - 4,
        address.length
      )}`
    }
    
    return this.name ? this.name.toUpperCase() : truncAddress(this.getWalletAddress())
    // return /(.+)@(.+){2,}\.(.+){2,}/.test(this.name)
    //         ? this.name?.toUpperCase()
    //         : this.name
  }
  getWalletAddress() {
    return this.walletAddresses && this.walletAddresses.length > 0 ? this.walletAddresses[0] : ''
  }  
  // organisations: Organisation[]
  
  parseTorusUser(torusUser) {
    if(this.walletType !== 'torus') throw Error ('Only valid for Torus wallets')
    this.avatar = torusUser.profileImage || torusUser.avatar
    this.name = torusUser.name
    this.email = torusUser.email
    this.id = torusUser.id
    // this.addWalletAddress(walletAddress, true)
    torusUser.walletAddresses.forEach(address => {
      this.addWalletAddress(address, true)
    })
  }
}