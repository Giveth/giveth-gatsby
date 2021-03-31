import gql from 'graphql-tag'

const FETCH_ALL_PROJECTS = gql`
  query FetchAllProjects($limit: Int, $skip: Int, $orderBy: OrderBy) {
    projects(take: $limit, skip: $skip, orderBy: $orderBy) {
      id
      title
      balance
      image
      slug
      creationDate
      admin
      description
      walletAddress
      impactLocation
      qualityScore
      status {
        id
        symbol
        name
        description
      }
      categories {
        name
      }
      reactions {
        reaction
        id
        projectUpdateId
        userId
      }
      qualityScore
      totalDonations
      totalHearts
    }
  }
`

const FETCH_PROJECTS = gql`
  query FetchProjects($limit: Int, $skip: Int, $orderBy: OrderBy) {
    topProjects(take: $limit, skip: $skip, orderBy: $orderBy) {
      projects {
        id
        title
        balance
        image
        slug
        creationDate
        admin
        description
        walletAddress
        impactLocation
        categories {
          name
        }
        reactions {
          reaction
          id
          projectUpdateId
          userId
        }
        qualityScore
        totalDonations
        totalHearts
      }
      totalCount
    }
  }
`

const FETCH_USER_PROJECTS = gql`
  query FetchProjects(
    $limit: Int
    $skip: Int
    $orderBy: OrderBy
    $admin: Float
  ) {
    projects(take: $limit, skip: $skip, orderBy: $orderBy, admin: $admin) {
      id
      title
      balance
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      categories {
        name
      }
      qualityScore
      totalDonations
      totalHearts
    }
  }
`

const FETCH_MY_PROJECTS = gql`
  query FetchMyProjects {
    myProjects {
      id
      title
      balance
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      qualityScore
      totalDonations
      totalHearts
      categories {
        name
      }
      status {
        id
        symbol
        name
        description
      }
    }
  }
`

const FETCH_PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      admin
      title
      description
      image
      slug
      creationDate
      walletAddress
      impactLocation
      qualityScore
      totalDonations
      totalHearts
      status {
        id
        symbol
        name
        description
      }
      categories {
        name
      }
    }
  }
`

const FETCH_PROJECT_BY_SLUG = gql`
  query ProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      title
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      qualityScore
      totalDonations
      totalHearts
      categories {
        name
      }
      status {
        id
        symbol
        name
        description
      }
      reactions {
        reaction
        userId
      }
      donations {
        transactionId
        transactionNetworkId
        toWalletAddress
        fromWalletAddress
        anonymous
        amount
        valueUsd
        user {
          id
          name
          firstName
          lastName
          avatar
          walletAddress
        }
        project {
          title
        }
        createdAt
        currency
      }
    }
  }
`

// const ADD_PROJECT_SIMPLE = gql`
//   mutation($title: String!, $description: String!) {
//     addProjectSimple(title: $title, description: $description) {
//       id
//       title
//       description
//     }
//   }
// `

const ADD_BANK_ACCOUNT = gql`
  mutation AddBankAccount($id: ID!) {
    addBankAccount(projectId: $id, source: "") {
      id
      projectId
    }
  }
`

const GET_LINK_BANK_CREATION = gql`
  query SetProjectBankAccount(
    $projectId: Float!
    $returnUrl: String!
    $refreshUrl: String!
  ) {
    setProjectBankAccount(
      projectId: $projectId
      returnUrl: $returnUrl
      refreshUrl: $refreshUrl
    )
  }
`
const GET_DONATION_SESSION = gql`
  query GetStripeProjectDonationSession(
    $projectId: Float!
    $amount: Float!
    $anonymous: Boolean!
    $donateToGiveth: Boolean!
    $successUrl: String!
    $cancelUrl: String!
  ) {
    getStripeProjectDonationSession(
      projectId: $projectId
      amount: $amount
      anonymous: $anonymous
      donateToGiveth: $donateToGiveth
      successUrl: $successUrl
      cancelUrl: $cancelUrl
    ) {
      sessionId
      accountId
    }
  }
`

// const GET_STRIPE_DONATION_PDF = gql`
//   query GetStripeDonationPDF($sessionId: Float!) {
//     getStripeDonationPDF(sessionId: $sessionId)
//   }
// `

const GET_STRIPE_DONATION_PDF = gql`
  query GetStripeDonationPDF($sessionId: Float!) {
    getStripeDonationPDF(sessionId: $sessionId) {
      pdf
      data {
        id
        createdAt
        donor
        projectName
        status
        amount
        currency
        donorName
        donorEmail
        projectDonation
        givethDonation
        processingFee
      }
    }
  }
`

// const GET_STRIPE_PROJECT_DONATIONS = gql`
//   query GetStripeDonations($projectId: Float!) {
//     getStripeProjectDonations(projectId: $projectId) {
//       id
//       amount
//       donor
//       currency
//       status
//       createdAt
//     }
//   }
// `

const GET_STRIPE_PROJECT_DONATIONS = gql`
  query GetStripeDonations($projectId: Float!) {
    getStripeProjectDonations(projectId: $projectId) {
      donations {
        id
        amount
        donor
        currency
        status
      }
      totalDonors
    }
  }
`
const ADD_PROJECT = gql`
  mutation($project: ProjectInput!) {
    addProject(project: $project) {
      id
      title
      description
      admin
      image
      impactLocation
      slug
      walletAddress
      categories {
        name
      }
    }
  }
`
/*
 ** PROJECT UPDATES
 */
const ADD_PROJECT_UPDATE = gql`
  mutation($projectId: Float!, $title: String!, $content: String!) {
    addProjectUpdate(projectId: $projectId, title: $title, content: $content) {
      id
      projectId
      userId
      content
    }
  }
`

const GET_PROJECT_UPDATES = gql`
  query GetProjectUpdates($projectId: Float!, $take: Float!, $skip: Float!) {
    getProjectUpdates(projectId: $projectId, take: $take, skip: $skip) {
      projectUpdate {
        id
        title
        content
        createdAt
        projectId
        userId
      }
      reactions {
        reaction
        userId
      }
    }
  }
`

const TOGGLE_UPDATE_REACTION = gql`
  mutation ToggleReaction($reaction: String!, $updateId: Float!) {
    toggleReaction(reaction: $reaction, updateId: $updateId)
  }
`

const TOGGLE_PROJECT_REACTION = gql`
  mutation ToggleProjectReaction($reaction: String!, $projectId: Float!) {
    toggleProjectReaction(reaction: $reaction, projectId: $projectId) {
      reaction
      reactionCount
    }
  }
`

const GET_PROJECT_REACTIONS = gql`
  query GetProjectReactions($projectId: Float!) {
    getProjectReactions(projectId: $projectId) {
      id
      projectUpdateId
      userId
      reaction
    }
  }
`

const GET_PROJECT_BY_ADDRESS = gql`
  query ProjectByAddress($address: String!) {
    projectByAddress(address: $address) {
      id
      title
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      categories {
        name
      }
    }
  }
`

const REGISTER_PROJECT_DONATION = gql`
  mutation($txId: String!, $anonymous: Boolean!) {
    registerProjectDonation(txId: $txId, anonymous: $anonymous)
  }
`

const EDIT_PROJECT = gql`
  mutation editProject($projectId: Float!, $newProjectData: ProjectInput!) {
    editProject(projectId: $projectId, newProjectData: $newProjectData) {
      id
      title
      description
      image
      slug
      creationDate
      admin
      walletAddress
      impactLocation
      categories {
        name
      }
    }
  }
`

const DEACTIVATE_PROJECT = gql`
  mutation deactivateProject($projectId: Float!) {
    deactivateProject(projectId: $projectId)
  }
`

const ACTIVATE_PROJECT = gql`
  mutation activateProject($projectId: Float!) {
    activateProject(projectId: $projectId)
  }
`
export {
  FETCH_PROJECTS,
  FETCH_ALL_PROJECTS,
  FETCH_USER_PROJECTS,
  FETCH_PROJECT,
  FETCH_PROJECT_BY_SLUG,
  ADD_PROJECT,
  ADD_BANK_ACCOUNT,
  GET_LINK_BANK_CREATION,
  GET_DONATION_SESSION,
  GET_STRIPE_DONATION_PDF,
  GET_STRIPE_PROJECT_DONATIONS,
  ADD_PROJECT_UPDATE,
  GET_PROJECT_UPDATES,
  TOGGLE_PROJECT_REACTION,
  TOGGLE_UPDATE_REACTION,
  GET_PROJECT_REACTIONS,
  GET_PROJECT_BY_ADDRESS,
  REGISTER_PROJECT_DONATION,
  EDIT_PROJECT,
  ACTIVATE_PROJECT,
  DEACTIVATE_PROJECT,
  FETCH_MY_PROJECTS
}
