import _ from 'lodash'
import carrierAPI from './../../api/carrier-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
}

// getters
const getters = {
  allCarriers: (state) => {
    return _.chain(state.all).sortBy([ 'presentation' ]).value()
  },
}

// actions
const actions = {
  getAll ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          'filter[active]': 1,
          include: 'images',
        }
      };
      carrierAPI.getAll(params, res => {
        // console.log('carrier res', res)
        const carriers = store.sync(res.data)
        // console.log('carrier', carriers)
        commit(types.CARRIER_GET_ALL, { records: carriers })
        resolve(carriers)
      }, err => {
        console.log('carrier err', err)
        reject(err)
      })
    })
  },
}

// mutations
const mutations = {
  [types.CARRIER_GET_ALL] (state, { records }) {
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
