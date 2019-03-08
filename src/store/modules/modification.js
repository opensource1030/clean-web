import _ from 'lodash'
import modificationAPI from './../../api/modification-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
  // #TODO - we should change the filters from dictionary to array - filters: [{ property, operator, value }, { property, operator, value }, ...]
  filters: {
    value: {
      operator: '',
      value: '',
    },
  },
}

// getters
const getters = {
  sorted: (state) => {
    return _.sortBy(state.records, ['value'])
  },

  filterByType: (state, getters) => (type) => {
    return _.filter(getters.sorted, { 'modType': type })
  },

  styleModifications: (state, getters) => {
    return getters.filterByType('style')
  },

  capacityModifications: (state, getters) => {
    return getters.filterByType('capacity')
  },
}

// actions
const actions = {
  create({ commit }, record) {
    return new Promise((resolve, reject) => {
      modificationAPI.create(record, (res) => {
        let record = store.sync(res.data)
        // console.log('create modification', record)
        commit(types.MODIFICATION_ADD, record)
        resolve(record)
      }, err => reject(err))
    })
  },

  search ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let key, value, _params = { params: {} };

      if (state.filters.value.operator && state.filters.value.value) {
        key = 'filter[value][' + state.filters.value.operator + ']'
        switch (state.filters.value.operator) {
          case 'like':
            value = '%' + state.filters.value.value + '%'
            break
          default:
            value = state.filters.value.value
        }
        console.log('modification query', key, value)
        _params.params[key] = value
      }

      modificationAPI.search(_params, res => {
        const modifications = store.sync(res.data)
        // console.log('modification res', modifications)
        commit(types.MODIFICATION_REFRESH, { records: modifications })
        resolve(modifications)
      }, err => {
        // console.log('modification err', err)
        reject(err)
      })
    })
  },

  searchByValue({ dispatch, commit, state }, { query }) {
    commit(types.MODIFICATION_UPDATE_FILTERS, { value: { operator: 'like', value: query } })
    return dispatch('search')
  },
}

// mutations
const mutations = {
  [types.MODIFICATION_REFRESH] (state, { records }) {
    state.records = records
  },

  [types.MODIFICATION_CREATE] (state, record) {
    state.records.push(record)
  },

  [types.MODIFICATION_UPDATE_FILTERS] (state, filters ) {
    _.extend(state.filters, filters)
  },
}

export default {
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}