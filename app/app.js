import axios from 'axios'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import { createRouter } from './router'
import { createStore } from '~store'
import ElementUI from '~plugins/element-ui'

import App from './App.vue'

export function createApp () {
  const router = createRouter()
  const store = createStore()

  sync(store, router)
  Vue.prototype.$http = axios
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  ElementUI()

  return { app, router, store }
}
