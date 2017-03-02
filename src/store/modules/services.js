import service from './../../api/service-api'
import * as types from './../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allServices: state => state.all
}

// actions
const actions = {
  getAll ({ commit }) {
    let params = {}
    service.getAll(params, records => {
      commit(types.SERVICE_GET_ALL, { records })
    })
  },

  addNew ({ commit }, { name }) {
    service.add(params, record => {
      commit(types.SERVICE_ADD_NEW, { record })
    })
  }
}

// mutations
const mutations = {
  [types.SERVICE_GET_ALL] (state, { records }) {
    state.all = records
  },

  [types.SERVICE_ADD_NEW] (state, { record }) {
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