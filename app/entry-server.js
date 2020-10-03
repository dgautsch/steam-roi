import { createApp } from './app'
import config from '~config'
import _ from 'lodash'

// Receives the context of the render call, returning a Promise resolution to the root Vue instance.
export default context =>
  new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    const meta = app.$meta()

    // set server-side router's location
    router.push(context.url)
    context.meta = meta
    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
      context.rendered = () => {
        const matchedComponents = router.getMatchedComponents()
        // no matched routes, reject with 404
        if (!matchedComponents.length) {
          return reject(new Error(404))
        }

        // Set auth status
        if (_.get(context, 'user.id')) {
          // A user object will be passed down if it exists on the request
          // object from passport. We know the user is authenticated if this
          // document is present.
          store.state.user = {
            id: context.user.id,
            username: context.user.username
          }
          app.$logger.log(
            `User Authorized, enabled registered features for ${context.user.username}`
          )
          store.state.isAuthenticated = true
        } else {
          app.$logger.log('User Unauthorized, disabling registered features.')
          store.state.isAuthenticated = false
        }
        // store build time config
        store.state.config = config

        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state
      }

      // the Promise should resolve to the app instance so it can be rendered
      return resolve(app)
    }, reject)
  })
