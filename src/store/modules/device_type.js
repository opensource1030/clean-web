import _ from 'lodash'
import devicetypeAPI from './../../api/device_type-api'
import * as types from './../mutation-types'
import FilterItem from './../../models/FilterItem'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
  // #TODO - we should change the filters from dictionary to array - filters: [{ property, operator, value }, { property, operator, value }, ...]
  filters: {
    name: new FilterItem(),
  },
}

// getters
const getters = {
  sorted: (state) =>{
    return _.chain(state.records).sortBy([ 'presentation' ]).value()
  },
}

// actions
const actions = {

  search({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let key, value, _params = { params: {} };

      if (state.filters.name.operator && state.filters.name.value) {
        key = 'filter[name][' + state.filters.name.operator + ']'
        switch (state.filters.name.operator) {
          case 'like':
            value = '%' + state.filters.name.value + '%'
            break
          default:
            value = state.filters.name.value
        }
        console.log('device_type query', key, value)
        _params.params[key] = value
      }

      devicetypeAPI.search(_params, res => {
        const device_types = store.sync(res.data)
        // console.log('device_type res', device_types)
        commit(types.DEVICE_TYPE_REFRESH, { records: device_types })
        resolve(device_types)
      }, err => {
        // console.log('device_type err', err)
        reject(err)
      })
    })
  },

  searchByName({ dispatch, commit, state }, { query }) {
    commit(types.DEVICE_TYPE_UPDATE_FILTERS, { name: { operator: 'like', value: query } })
    return dispatch('search')
  },
}

// mutations
const mutations = {
  [types.DEVICE_TYPE_REFRESH] (state, { records }) {
    state.records = records
  },

  [types.DEVICE_TYPE_UPDATE_FILTERS] (state, filters ) {
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
