
`master`
[![Netlify Status](https://api.netlify.com/api/v1/badges/f914ac7e-ce27-4909-bd3e-14d749731a52/deploy-status)](https://app.netlify.com/sites/giveth2/deploys)
`staging`
[![Netlify Status](https://api.netlify.com/api/v1/badges/2f325b5b-e159-443e-bac7-c5e15f3578c0/deploy-status)](https://app.netlify.com/sites/giveth-website-staging/deploys)
<br />
<p align="center"><a href="https://giveth.io"><img alt="Giveth.io" src="https://raw.githubusercontent.com/Giveth/giveth-design-assets/master/02-logos/Giveth%20logo/giveth-symbol-logo-purple.png" width="80"/></a></p><h1 align="center">
  Giveth v2
</h1>

## 🚀 Quick start
Giveth-2 is a reimagined version of the ["Giveth donation application"](https://github.com/Giveth/giveth-dapp). Users can create projects with a focus on 'for-good' philanthropic causes and receive donations via the Ethereum Blockchain. Donations can be made via ETH or ERC-20 tokens on both Mainnet and xDai Network.

The projects aims to simplify the application's options to enable new users without blockchain experience a frictionless experience.

If you want to contribute, pls say hello to us in chat -  [https://giveth.io/join](https://giveth.io/join)

 This guide will document the steps to set up and run Giveth.io locally for the purposes of development. The setup process was documented using Ubuntu 20.04 LTS.

**You'll need a couple prerequisites to get started.**

 - [Redis](https://redis.io/topics/quickstart)
 - [Postgres](https://www.postgresql.org/download)
 - Bash CLI
 - [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/)
 - Configure NodeJS
      * [For Linux](https://www.gatsbyjs.com/docs/how-to/local-development/gatsby-on-linux/)
     * [For Windows](https://www.gatsbyjs.com/docs/how-to/local-development/gatsby-on-windows/)
 - Your Favourite Code Editor (VScode for linting presets)

### Install impact-graph from GitHub
In order to develop locally you need to clone the backend server as well. We are using https://github.com/topiahq/impact-graph for this.

- via the CLI:
    ```bash
    git clone git@github.com:topiahq/impact-graph.git
    cd impact-graph
    npm i
    cp .env.example .env
    ```


### Create a Database and User in Postgres using psql
Follow this tutorial on PSQL to setup your username and create the database.
https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e)

**TL;DR**
```bash
sudo -u postgres psql
postgres=# create database <databaseName>;
postgres=# create user <userName> with encrypted password '<passwordHere>';
postgres=# grant all privileges on database <databaseName> to <userName>;
```
### Clone and Install the Frontend
  Head on over to https://github.com/Giveth/giveth-2 and clone the repo.
  - via the CLI:
  ```bash
  git clone git@github.com:Giveth/giveth-2.git
  cd giveth-2
  npm i
  ```

### Get the Environment Variables
 In order to run the local build for Giveth.io you'll need to ask for the environment variables. Head on over to our [Contributors Discord](https://discord.gg/EndTUw9955) say Hi and get in touch with one of the developers.

### Launch the Development Server and Environment
 Make sure the backend server is running; the `impact-graph` from step 1.

 To take advantage of linting presets, please use **VSCODE**:
 * Select *File -> Open Workspace*
 * Navigate into the giveth-2 directory
 * Open the workspace file `giveth2-full-stack.code-workspace`
 * Install recommended extensions (Prettier and StandardJS plugins)

 Then fire up the local development server.

 ```bash
 gatsby develop
 ```

### Start Editing!

Open up the giveth2 repo on your code editor.

Giveth.io is now running locally at `http://localhost:8000`!

<img alt='Giveth Running Locally' src={useBaseUrl('img/content/givethlocalresized.png')} />

You can also expiremnt with querying your data via GraphQL - you'll find it at this link here - `http://localhost:8000/___graphql`
Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

  Save your changes and the browser will update in real time!

## Contributor Guide

1. Like, star and fork the repo if you want to help with visibility
1. Have a look at the issue board and choose something to work on
1. Before starting any work, please at least say "Hi" on the **giveth2-dev**/**Giveth2 construction office** channel (see chat links here: https://giveth.io/join)
3. Even better, after introducing yourself pls join the next **DEV Call** (usually Sunday 17:30 CEST, but watch announcements in the discord channel)
4. Please ask somebody
5. If you found the project via a Gitcoin bounty, please make sure to check the issue every few days until completion (Gitcoin requires some proof of life checks)
6. Please start a new branch on your fork named with the feature/fix you want to attempt and make a **pull request** when you are confident everything is ready to publish

### Gitflow

**master** only for PR's and noncritical hotfixes like typo's after merging - deploys to https://v2.giveth.io

**New features** should be pushed to a new branch named **$featurename** (No **develop** or **release** branches currently, but at least **develop** will be added in the future to have a proper staging environment)

### Styling

Styling should be done in cooperation with senior contributors so a minimum of new styles is introduced locally. As a rule of thumb: all styles that are used more than once or are not very specific to one component should be added in the **Theme UI definition**`src/gatsby-plugin-theme-ui/index.js` whenever possible and additionally to a gatsby page we use to collect all defined styles `src/pages/viewstyles.js` to quickly check consistency.
Please refer to some examples in the code to see how we deal with styles. Local overrides and extensions should be done via `sx prop` or `emotionJS`.

### Code conventions
- as mentioned above contributor code should be linted with StandardJS
- React components for into the folder `/src/components` and component filenames should be written in Camel case.
