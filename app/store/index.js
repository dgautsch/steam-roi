import Vue from 'vue'
import Vuex from 'vuex'

import config from '~config'
import { loginUser, registerUser } from '~app/api'

Vue.use(Vuex)

// Mutations
export const SET_USER_STATE = 'SET_USER_STATE'
// Actions
export const REGISTER_USER = 'REGISTER_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const SET_AUTH_STATE = 'SET_AUTH_STATE'

export function createStore () {
  return new Vuex.Store({
    strict: !config.isProduction,
    state: () => ({
      isAuthenticated: false,
      user: {
        username: 'Guest User',
        id: null
      }
    }),
    mutations: {
      [SET_USER_STATE] (state, { user, id, authState }) {
        state.user.username = user
        state.user.id = id
        state.isAuthenticated = authState
      }
    },
    actions: {
      async [REGISTER_USER] ({ commit }, { client, payload }) {
        const { data } = await registerUser(client, payload)
        commit(SET_USER_STATE, {
          user: data.userName,
          id: data.id,
          authState: true
        })
      },
      async [LOGIN_USER] ({ commit }, { client, payload }) {
        const { data } = await loginUser(client, payload)
        await commit(SET_USER_STATE, {
          user: data.userName,
          id: data.id,
          authState: true
        })
      },
      async [SET_AUTH_STATE] ({ commit }, { user, authState }) {
        await commit(SET_USER_STATE, { user, authState })
      }
    },
    getters: {
      isAuthenticated (state) {
        return state.isAuthenticated === true
      },
      userName (state) {
        return state.user.username
      }
    }
  })
}
