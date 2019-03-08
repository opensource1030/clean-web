import _ from 'lodash'
import carrierAPI from './../../api/carrier-api'
import * as types from './../mutation-types'
import FilterItem from './../../models/FilterItem'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
  filters: {
    presentation: new FilterItem(),
  },
}

// getters
const getters = {
  sorted: (state) => {
    return _.chain(state.records).sortBy([ 'presentation' ]).value()
  },
}

// actions
const actions = {
  search ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let key, value, _params = { params: { 'filter[active]': 1, include: 'images' } };

      if (state.filters.presentation.operator && state.filters.presentation.value) {
        key = 'filter[presentation][' + state.filters.presentation.operator + ']'
        switch (state.filters.presentation.operator) {
          case 'like':
            value = '%' + state.filters.presentation.value + '%'
            break
          default:
            value = state.filters.presentation.value
        }
        console.log('modification query', key, value)
        _params.params[key] = value
      }

      carrierAPI.search(_params, res => {
        const carriers = store.sync(res.data)
        // console.log('carrier res', carriers)
        commit(types.CARRIER_REFRESH, { records: carriers })
        resolve(carriers)
      }, err => {
        // console.log('carrier err', err)
        reject(err)
      })
    })
  },

  searchByPresentation({ dispatch, commit, state }, { query }) {
    commit(types.CARRIER_UPDATE_FILTERS, { presentation: { operator: 'like', value: query } })
    return dispatch('search')
  },
}

// mutations
const mutations = {
  [types.CARRIER_REFRESH] (state, { records }) {
    state.records = records
  },

  [types.CARRIER_UPDATE_FILTERS] (state, filters ) {
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
