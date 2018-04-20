import _ from 'lodash'
import * as types from './../mutation-types'
import globalsettingAPI from './../../api/globalsetting-api'
import { Log, Utils } from './../../helpers'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
}


// getters
const getters = {
  getByName: (state) => (name) => {
    return _.find(state.records, { 'name': name })
  },
}

// actions
const actions = {
  search ({ commit }) {
    return new Promise((resolve, reject) => {
      let _params = {}
      globalsettingAPI.search(_params, res => {
        let globalsettings = store.sync(res)
        commit.refresh(globalsettings)
        resolve(globalsettings)
      }, err => {
        // console.log('carrier err', err)
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  refresh (state, records) {
    state.records = records
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
