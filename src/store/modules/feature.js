const state = {
  enabled_place_order: false,
  enabled_equipment: false,
  enabled_service: false,
  enabled_order: false,
  enabled_order_report: false,
  enabled_metric: false,
  enabled_package: false,
  enabled_package_edit: false,
  enabled_dashboard_legacy: false,
  enabled_upgrade_device: false,
  enabled_dashboard_nextgen: false,
  enabled_dashboard_report_view: false,
  enabled_dashboard_procure_new_line: false,
  enabled_dashboard_procure_transfer: false,
  enabled_dashboard_procure_accessories: false,
  enabled_dashboard_procure_new_device: false,
  enabled_dashboard_report_details: false,
}

const getters = {
  isInventoryEnabled: (state) => {
    return state.enabled_equipment || state.enabled_service || state.enabled_order
  }
}

const actions = {
  setFlag({ commit }, flag) {
    commit('setFlag', flag)
  }
}

const mutations = {
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
