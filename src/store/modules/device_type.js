import _ from 'lodash'
import devicetypeAPI from './../../api/device_type-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
}

// getters
const getters = {
  allDeviceTypes: (state) => {
    return _.chain(state.all).sortBy([ 'name' ]).value()
  },
}

// actions
const actions = {
  getAll ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      devicetypeAPI.getAll(res => {
        const device_types = store.sync(res.data)
        // console.log('device_type res', device_types)
        commit(types.DEVICE_TYPE_GET_ALL, { records: device_types })
        resolve(device_types)
      }, err => {
        // console.log('device_type err', err)
        reject(err)
      })
    })
  },
}

// mutations
const mutations = {
  [types.DEVICE_TYPE_GET_ALL] (state, { records }) {
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