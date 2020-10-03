# Steam ROI

An app to find out a steam game's ROI

## Scope

This app is hosted at https://steam-roi.herokuapp.com (USE AT YOUR OWN RISK). I haven't had time to security check the app as it is purely a proof of concept project. Logging-in allows you to see your steam account details.

The heroku hosted site is the original protoype for the site. The current `dev` branch is the Vue SSR refactor.

## Purpose

Eventually, when you log into this app you will be able to see the games you own and how much time you played versus the dollars spent on the game. You can then effectively determine your ROI by how much each hour of time played cost you.

## In Progress

- [x] Unit testing framework
- [x] Sass compilation for global styles
- [x] State hydration, VueX
- [x] Implement Vue Router
- [x] Address `connect.session() MemoryStore is not designed for a production environment, as it will leak`
- [x] Fix config so variables are shared server to client
- [x] Add auth middleware to secure private routes
- [x] Add vue router auth meta to secure private routes
- [ ] Create server process to scrape steam API for game data
- [ ] Setup API route to get scraped games from app database
- [x] Implement prettier plugin for vue to ignore templates
- [ ] Add a 404 page
- [x] Fix routes being title cased e.g. `Router` vs `router`

## Running the Site

In order to run this project you can follow the steps below. The site can be run without a database but you will lose
the majority of functionality for the site.

- Install a local or cloud instance of Mongo. Get the connection string for the mongo DB.
- Add a `.env` file to the `config` folder.
- Update the file with your Mongo connection string.
- Update the file with your Steam API key if you have it. (Currently not necessary as the steam functionality is not hooked up in this version.)
- Run `npm ci`
- Run `npm run dev`
- Connect to the site at http://localhost:3000
