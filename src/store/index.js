import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import error from './modules/error'
import device from './modules/device'
import modification from './modules/modification'
import carrier from './modules/carrier'
import service from './modules/services'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    error,
    device,
    modification,
    carrier,
    service
  },
  strict: debug,
  plugins: [
    // createPersistedState({ storage: window.sessionStorage }),
  ]
})
