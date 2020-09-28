[![Netlify Status](https://api.netlify.com/api/v1/badges/f914ac7e-ce27-4909-bd3e-14d749731a52/deploy-status)](https://app.netlify.com/sites/giveth2/deploys)
<p align="center"><a href="https://giveth.io"><img alt="Giveth.io" src="https://github.com/Giveth/giveth-design-assets/blob/master/02-logos/Giveth%20logo/giveth-symbol-logo-purple.png" width="80"/></a></p><h1 align="center">
  Giveth v2
</h1>

## 🚀 Quick start
Giveth-2 is a reimagined version of the ["Giveth donation application"](https://github.com/Giveth/giveth-dapp). Users leverage the Ethereum blockchain to distribute and track their donations or enable unstoppable funding for their campaign.

1.  **Create a Gatsby site.**
The projects aims to simplify the application's options to enable new users without blockchain experience a frictionless experience.

The project is currently in heavy development and does not offer all functionality that is needed for an MVP state (first release goal).

If you want to contribute, pls say hello to us in chat -  [https://giveth.io/join](https://giveth.io/join)

###### Uses
- Gatsby
- Apollo GraphQL
- Tor.us
- Theme UI

## Setup

1.  **Clone and install the backend server**

    In order to develop locally you need to clone the backend server as well. We are using https://github.com/topiahq/impact-graph for this. Please follow the readme of `impact-graph` to install it. For more detailed instructions specific to giveth2 please refer to this [gist](https://gist.github.com/geleeroyale/6283549c469f2fa89fc059f936c59002).

1.  **Clone and install the frontend (this repo)**
	First, please star and follow this repository.
	```bash
	git clone git@github.com:Giveth/giveth-2.git
	cd giveth-2
	npm i
	```
    
1.  **Set up the development environment**
	
	```bash
	cp .env.example .env.development
	```
	To get the necessary information for local development, please [ask in giveth-2 developer chat](https://riot.im/app/#/room/!zFyfjCfKHawjZJcueK:matrix.org?via=matrix.org)

1.  **Start developing.**
	- Make sure that the backend server is running (Step1)
    - To take advantage of linting presets, please use **VSCODE**:
		* Select *File -> Open Workspace*
		* Navigate into the giveth-2 directory
		* Open the workspace file`giveth2-full-stack.code-workspace`
		* Install recommended extensions (Prettier and StandardJS plugins)

	- Start up the local development server.

    ```shell
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._
    
    Save your changes and the browser will update in real time!

### Contributor Guide

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
