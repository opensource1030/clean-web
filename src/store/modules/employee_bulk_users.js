import * as types from "./../mutation-types";


const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  companyuserimportjobs: {},
}

const getters = {
  mappings: (state) => {
    return state.companyuserimportjobs.mappings
  },

  dbFields: (state) => {
    return state.companyuserimportjobs.DBfields
  },

  csvFields: (state) => {
    return state.companyuserimportjobs.CSVfields
  },
}

const actions = {
  updateJob ({dispatch, commit, state}, record) {
    commit(types.EMPLOYEE_BULK_JOB_UPDATE, record)
  },

  updateMappings({dispatch, commit, state}, mappings) {
    commit(types.EMPLOYEE_BULK_MAPPING_UPDATE, mappings)
  }
}

const mutations = {
  [types.EMPLOYEE_BULK_JOB_UPDATE] (state, record) {
    state.companyuserimportjobs = record
  },

  [types.EMPLOYEE_BULK_MAPPING_UPDATE] (state, mappings) {
    state.companyuserimportjobs.mappings = mappings
  }
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}