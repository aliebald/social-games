# Social Games

Social games (working title) is a web app that can be used to collect and find (online) social games. Games have an image for quick recognition, player count limits and tags to map various attributes.

# Development Setup

## Firebase

Setup a new firebase project with the following components:

- Authentication using a google provider
- Firebase Database
  - Apply the rules from `firebase.storage.rules`
  - Create a composite index on the collection `games` for the fields `tags` (Arrays) and `authorUid` (Ascending) with the `Collection` scope
- Storage
  - Apply the rules from `cloud.firestore.rules`

In addition to the above components, add a web app for the frontend and create a service account key (project settings > Service Accounts > Generate New Private Key).
The access information will be required for the next step.

## Frontend

Enter the firebase access information from above into environment variables. See `.env.dist` for reference.

### Local development server

- Run `npm install` to install the dependencies
- Run `npm run dev` to start the local development server

### Build

- Run `npm install` to install the dependencies
- Run `npm run build` to create a build
- Optionally run `npm run serve` to serve the build

### IDE Setup

In case you want to make changes to the code, make sure eslint and prettier are configured correctly.
A configuration and list of recommended extensions for VSCode is already provided.

# Architecture

The frontend follows the atomic design principles, see [this article](https://bradfrost.com/blog/post/atomic-web-design/) for an overview. At the moment, templates are not implemented separately but within the app directory.

# Permissions

- Everyone can view games and tags
- Logged in users with the member role can create games and tags. They can also edit and delete games and tags created by them
- Admins can create, edit and delete all games and tags

Permissions can be added manually using `add-claims-script.js` or using the administration page.
Usage instructions for `add-claims-script.js` can be found in the script.
