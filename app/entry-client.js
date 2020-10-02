import { createApp } from './app'
import '~config'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  app.$logger.log('Hydrating App...')
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
