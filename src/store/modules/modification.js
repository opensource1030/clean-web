import _ from 'lodash'
import modificationAPI from './../../api/modification-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
}

// getters
const getters = {
  allModifications: (state) => {
    return state.all
  },

  styleModifications: (state) => {
    return _.chain(state.all).filter({ 'modType': 'style' }).sortBy([ 'value' ]).value()
  },

  capacityModifications: (state) => {
    return _.chain(state.all).filter({ 'modType': 'capacity' }).sortBy([ 'value' ]).value()
  },
}

// actions
const actions = {
  getAll ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      modificationAPI.getAll(res => {
        // console.log('modification res', res)
        const modifications = store.sync(res.data)
        commit(types.MODIFICATION_GET_ALL, { records: modifications })
        resolve(modifications)
      }, err => {
        // console.log('modification err', err)
        reject(err)
      })
    })
  },
}

// mutations
const mutations = {
  [types.MODIFICATION_GET_ALL] (state, { records }) {
    state.all = records
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}