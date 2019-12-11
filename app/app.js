import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import { createRouter } from './router'
import { createStore } from './data'
import ElementUI from './plugins/element-ui'

import App from './App.vue'

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  ElementUI()

  return { app, router, store }
}
