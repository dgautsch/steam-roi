import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta)

const routes = {
  pages: {
    home: '/',
    account: '/account',
    login: '/login'
  }
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: routes.pages.home,
        component: () => import('./routes/Home.vue')
      },
      {
        path: routes.pages.account,
        component: () => import('./routes/Account.vue')
      },
      {
        path: routes.pages.login,
        component: () => import('./routes/Login.vue')
      }
    ]
  })
}
