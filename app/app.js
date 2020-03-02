import axios from 'axios'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import { isProduction } from '~config'
import { createRouter } from './router'
import { createStore } from '~store'
import ElementUI from '~plugins/element-ui'
import logger from '~plugins/logger'

import App from './App.vue'

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  // set http client
  Vue.prototype.$http = axios

  // set application logger
  Vue.use(logger, isProduction)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  ElementUI()

  return { app, router, store }
}
