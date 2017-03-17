import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import error from './modules/error'
import device from './modules/device'
import device_type from './modules/device_type'
import modification from './modules/modification'
import carrier from './modules/carrier'
import company from './modules/company'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    error,
    device,
    device_type,
    modification,
    carrier,
    company,
  },
  strict: debug,
  plugins: [
    // createPersistedState({ storage: window.sessionStorage }),
  ]
})