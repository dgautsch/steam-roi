import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta)

const routes = {
  pages: {
    home: '/',
    account: '/account',
    login: '/login',
    register: '/register'
  }
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: routes.pages.home,
        component: () => import('~routes/Home.vue')
      },
      {
        name: 'Account',
        path: routes.pages.account,
        component: () => import('~routes/Account.vue')
      },
      {
        name: 'Login',
        path: routes.pages.login,
        component: () => import('~routes/Login.vue')
      },
      {
        name: 'Register',
        path: routes.pages.register,
        component: () => import('~routes/Register.vue')
      }
    ]
  })
}
