import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta)

export const routes = [
  {
    path: '/',
    name: 'Home',
    requiresAuth: false,
    guestOnly: false,
    component: () =>
      import(
        /* webpackChunkName: "home" */
        '~routes/Home.vue'
      )
  },
  {
    path: '/account',
    name: 'Account',
    requiresAuth: true,
    guestOnly: false,
    component: () =>
      import(
        /* webpackChunkName: "account" */
        '~routes/Account.vue'
      )
  },
  {
    path: '/login',
    name: 'Login',
    requiresAuth: false,
    guestOnly: true,
    component: () =>
      import(
        /* webpackChunkName: "login" */
        '~routes/Login.vue'
      )
  },
  {
    name: 'Register',
    path: '/register',
    requiresAuth: false,
    guestOnly: true,
    component: () =>
      import(
        /* webpackChunkName: "register" */
        '~routes/Register.vue'
      )
  },
  {
    name: 'Not Found',
    path: '*',
    requiresAuth: false,
    guestOnly: false,
    component: () =>
      import(
        /* webpackChunkName: "register" */
        '~routes/NotFound.vue'
      )
  }
]

export function createRouter (store) {
  const router = new Router({
    mode: 'history',
    routes
  })

  router.onReady(() => {
    router.beforeResolve((to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated
      const destination = routes.find(route => route.name === to.name)
      if (to.name && destination.requiresAuth && !isAuthenticated) {
        return next({ name: 'Login' })
      }
      if (isAuthenticated && destination.guestOnly) {
        return next({ name: from.name ? from.name : routes.pages.home.name })
      }
      next()
    })
  })

  return router
}
