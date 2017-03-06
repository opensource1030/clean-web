import device from './../../api/device-api'
import * as types from './../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
}

// actions
const actions = {
  getAll ({ commit }) {
    let params = {}
    deivce.getAll(params, records => {
      commit(types.DEVICE_GET_ALL, { records })
    })
  },

  addNew ({ commit }, { name }) {
    deivce.add(params, record => {
      commit(types.DEVICE_ADD_NEW, { record })
    })
  }
}

// mutations
const mutations = {
  [types.DEVICE_GET_ALL] (state, { records }) {
    state.all = records
  },

  [types.DEVICE_ADD_NEW] (state, { record }) {
    state.all.push(record)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}