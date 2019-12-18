import Vue from 'vue'
import Vuex from 'vuex'

import core from './core'
import config from '../../config'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: !config.isProduction,

    modules: {
      core
    }
  })
}
