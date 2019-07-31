const state = {
  enabled_place_order: false,
  enabled_equipment: false,
  enabled_service: false,
  enabled_order: false,
  enabled_order_report: false,
  enabled_metric: false,
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
