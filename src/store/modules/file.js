import _ from 'lodash'
import fileAPI from './../../api/file-api'
import * as types from './../mutation-types'

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
}

// getters
const getters = {
  files: (state) => {
    return state.records
  },
}

// actions
const actions = {
  update ({commit}, files) {
    commit(types.FILE_REFRESH, files)
  }
}

// mutations
const mutations = {
  [types.FILE_REFRESH] (state, records) {
    state.records = records
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
