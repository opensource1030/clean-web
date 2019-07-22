const state = {
  enabled_place_order: false,
  enabled_equipment: false,
  enabled_service: false,
  enabled_order: false,
  enabled_package: false,
  enabled_package_edit: false
}

const getters = {
  isInventoryEnabled: (state) => {
    return state.enabled_equipment || state.enabled_service || state.enabled_order
  }
}

const actions = {
  setEnabledPlaceOrder({ commit }, enabled_place_order) {
    commit('setEnabledPlaceOrder', enabled_place_order)
  },

  setEnabledEquipment({ commit }, enabled_equipment) {
    commit('setEnabledEquipment', enabled_equipment)
  },

  setEnabledService({ commit }, enabled_service) {
    commit('setEnabledService', enabled_service)
  },


  setEnabledOrder({ commit }, enabled_order) {
    commit('setEnabledOrder', enabled_order)
  },

  setFlag({ commit }, flag) {
    commit('setFlag', flag)
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
  },

  setEnabledOrder(state, enabled_order) {
    state.enabled_order = enabled_order
  },

  setFlag(state, flag) {
    // state = {...state, ...flag}
    state = Object.assign(state, flag)
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
