const state = {
  enabled_place_order: false
}

const getters = {}

const actions  = {
  setEnabledPlaceOrder({ commit }, enabled_place_order) {
    commit('setEnabledPlaceOrder', enabled_place_order)
  }
}

const mutations = {
  setEnabledPlaceOrder(state, enabled_place_order) {
    state.enabled_place_order = enabled_place_order
  }
}

export default {
  namespaced : true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}
