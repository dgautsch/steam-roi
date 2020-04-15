import Vue from 'vue'
import Vuex from 'vuex'

import config from '~config'
import { loginUser, registerUser } from '~app/api'

Vue.use(Vuex)

// Mutations
export const AUTHENTICATE = 'AUTHENTICATE'
// Actions
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'

export function createStore () {
  return new Vuex.Store({
    strict: !config.isProduction,
    state: () => ({
      isAuthenticated: false,
      user: {}
    }),
    mutations: {
      [AUTHENTICATE] (state, user) {
        state.user = user
        state.isAuthenticated = true
      }
    },
    actions: {
      async [REGISTER_USER] ({ commit }, { client, payload }) {
        const user = await registerUser(client, payload)
        commit(AUTHENTICATE, user)
      },
      async [LOGIN_USER] ({ commit }, { client, payload }) {
        const user = await loginUser(client, payload)
        await commit(AUTHENTICATE, user)
      }
    },
    getters: {
      isAuthenticated (state) {
        return state.isAuthenticated === true
      }
    }
  })
}
