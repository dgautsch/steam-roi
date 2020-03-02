import Vue from 'vue'
import Vuex from 'vuex'

import config from '~config'
import { loginUser, registerUser } from '~app/api'

Vue.use(Vuex)

// Mutations
export const SET_USER = 'SET_USER'
// Actions
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'

export function createStore () {
  return new Vuex.Store({
    strict: !config.isProduction,
    state: () => ({
      user: undefined,
      isAuthorized: false
    }),
    mutations: {
      [SET_USER] (state, user) {
        state.user = user
      }
    },
    actions: {
      async [REGISTER_USER] ({ commit }, { client, payload }) {
        const user = await registerUser(client, payload)
        commit(SET_USER, user)
      },
      async [LOGIN_USER] ({ commit }, { client, payload }) {
        const user = await loginUser(client, payload)
        commit(SET_USER, user)
      }
    },
    getters: {}
  })
}
