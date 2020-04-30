import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta)

const routesMeta = {
  pages: {
    home: {
      path: '/',
      name: 'Home',
      requiresAuth: false
    },
    account: {
      path: '/account',
      name: 'Account',
      requiresAuth: true
    },
    login: {
      path: '/login',
      name: 'Login',
      requiresAuth: false
    },
    register: {
      path: '/register',
      name: 'Register',
      requiresAuth: false
    }
  }
}

export function createRouter (store) {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: routesMeta.pages.home.path,
        component: () =>
          import(
            /* webpackChunkName: "home" */
            '~routes/Home.vue'
          )
      },
      {
        name: 'Account',
        path: routesMeta.pages.account.path,
        component: () =>
          import(
            /* webpackChunkName: "account" */
            '~routes/Account.vue'
          )
      },
      {
        name: 'Login',
        path: routesMeta.pages.login.path,
        component: () =>
          import(
            /* webpackChunkName: "login" */
            '~routes/Login.vue'
          )
      },
      {
        name: 'Register',
        path: routesMeta.pages.register.path,
        component: () =>
          import(
            /* webpackChunkName: "register" */
            '~routes/Register.vue'
          )
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    if (
      routesMeta.pages[to.name.toLowerCase()].requiresAuth &&
      !store.state.isAuthenticated
    ) {
      next({ name: 'Login' })
    } else {
      next()
    }
  })

  return router
}
