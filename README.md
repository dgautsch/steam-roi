# Steam ROI

An app to find out a steam game's ROI

## Scope

This app is hosted at https://steam-roi.herokuapp.com (USE AT YOUR OWN RISK). I haven't had time to security check the app as it is purely a proof of concept project.

Logging in allows you to see your steam account details.

Eventually, when you login you will be able to see the games you own and how much time played versus dollars each game is worth. You can then effectively determine your ROI by how many entertainment hours you received.

## In Progress

- [ ] Lazy load the games. Currently rate limited by steam. Can only do 200 games every 5 minutes.
- [ ] Provide user feedback when search is in progress.
- [ ] Request Caching
- [ ] Unit testing framework
- [ ] Sass compilation for global styles
- [ ] State hydration, VueX
- [ ] Implement Vue Router
- [ ] Address `connect.session() MemoryStore is not designed for a production environment, as it will leak`
