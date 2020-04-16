# Steam ROI

An app to find out a steam game's ROI

## Scope

This app is hosted at https://steam-roi.herokuapp.com (USE AT YOUR OWN RISK). I haven't had time to security check the app as it is purely a proof of concept project.

Logging in allows you to see your steam account details.

Eventually, when you login you will be able to see the games you own and how much time played versus dollars each game is worth. You can then effectively determine your ROI by how many entertainment hours you received.

## In Progress

- [x] Unit testing framework
- [x] Sass compilation for global styles
- [x] State hydration, VueX
- [x] Implement Vue Router
- [x] Address `connect.session() MemoryStore is not designed for a production environment, as it will leak`
- [ ] Fix config so variables are shared server to client
- [x] Add auth middleware to secure private routes
- [ ] Add vue router auth meta to secure private routes
- [ ] Create server process to scrape steam API for game data
- [ ] Setup API route to get scraped games from app database
- [ ] Implement prettier plugin for vue to ignore templates
- [ ] Add a 404 page
- [x] Fix routes being title cased e.g. `Router` vs `router`
