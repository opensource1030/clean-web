const state = {
  enabled_place_order: false,
  enabled_equipment: false
}

const getters = {
  isInventoryEnabled: (state) => {
    return state.enabled_equipment || state.enabled_service
  }
}

const actions  = {
  setEnabledPlaceOrder({ commit }, enabled_place_order) {
    commit('setEnabledPlaceOrder', enabled_place_order)
  },

  setEnabledEquipment({ commit }, enabled_equipment) {
    commit('setEnabledEquipment', enabled_equipment)
  },

  setEnabledService({ commit }, enabled_service) {
    commit('setEnabledService', enabled_service)
  }
}

const mutations = {
  setEnabledPlaceOrder(state, enabled_place_order) {
    state.enabled_place_order = enabled_place_order
  },

  setEnabledEquipment(state, enabled_equipment) {
    state.enabled_equipment = enabled_equipment
  },

  setEnabledService(state, enabled_service) {
    state.enabled_service = enabled_service
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
