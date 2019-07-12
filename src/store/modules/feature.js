const state = {
  enabled_place_order: false,
  enabled_equipment: false
}

const getters = {
  isInventoryEnabled: (state) => {
    return state.enabled_equipment
  }
}

const actions  = {
  setEnabledPlaceOrder({ commit }, enabled_place_order) {
    commit('setEnabledPlaceOrder', enabled_place_order)
  },

  setEnabledEquipment({ commit }, enabled_equipment) {
    commit('setEnabledEquipment', enabled_equipment)
  }
}

const mutations = {
  setEnabledPlaceOrder(state, enabled_place_order) {
    state.enabled_place_order = enabled_place_order
  },

  setEnabledEquipment(state, enabled_equipment) {
    state.enabled_equipment = enabled_equipment
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
