import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(Router)
Vue.use(VueMeta)

const routes = {
  pages: {
    home: {
      path: '/',
      name: 'Home',
      protected: false
    },
    account: {
      path: '/account',
      name: 'Account',
      protected: true
    },
    login: {
      path: '/login',
      name: 'Login',
      protected: false
    },
    register: {
      path: '/register',
      name: 'Register',
      protected: false
    }
  }
}

export function routingGuards (router, store) {
  router.beforeEach((to, from, next) => {
    if (
      routes.pages[to.name.toLowerCase()].protected &&
      !store.state.isAuthenticated
    ) {
      next({ name: 'Login' })
    } else {
      next()
    }
  })
}

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: routes.pages.home.path,
        component: () =>
          import(
            /* webpackChunkName: "home" */
            '~routes/Home.vue'
          )
      },
      {
        name: 'Account',
        path: routes.pages.account.path,
        component: () =>
          import(
            /* webpackChunkName: "account" */
            '~routes/Account.vue'
          )
      },
      {
        name: 'Login',
        path: routes.pages.login.path,
        component: () =>
          import(
            /* webpackChunkName: "login" */
            '~routes/Login.vue'
          )
      },
      {
        name: 'Register',
        path: routes.pages.register.path,
        component: () =>
          import(
            /* webpackChunkName: "register" */
            '~routes/Register.vue'
          )
      }
    ]
  })
}
