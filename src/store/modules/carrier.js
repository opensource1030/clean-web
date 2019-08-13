import _ from 'lodash'
import carrierAPI from '@/api/carrier-api'
import * as types from '@/store/mutation-types'
import FilterItem from '@/models/FilterItem'
import { findServiceItem, findByAddons, orderFilters, getFilters } from '@/components/filters.js'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
  selects: {
    carriers: [],
    loading: {
      fetching: true,
      noResultMessage: '',
    }
  },
  filters: {
    presentation: new FilterItem(),
  },
}

// getters
const getters = {
  sorted: (state) => {
    return _.chain(state.records).sortBy([ 'presentation' ]).value()
  },
  getCarriers: (state) => {
    return state.selects
  }
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

  searchServiceSelects({dispatch, commit, state}, {data}) {

    let query = data.query
    let queryStringAPI = data.filterType + '=' + query
    let queryLength = query.length

    if (queryLength > 3) {
      if (state.selects.loading.fetching) commit(types.SERVICES_FILTER_MESSAGE, queryLength)
        carrierAPI.searchQuery(queryStringAPI, function(records) {
        let payload = {
          filterType: data.filterType,
          records: records
        }
        commit(types.SERVICES_FILTER_SEARCH, {payload})
        // When records get fetched from API, then conditional is executed...
        if (payload.records) {
          if (!state.selects.loading.fetching) commit(types.SERVICES_FILTER_MESSAGE, queryLength)
        }
      }, (err) => {
        console.log(err)
      })
    }

    if (query.length <= 3) {
      let payload = {
        filterType: data.filterType,
        records: {}
      }
      commit(types.SERVICES_FILTER_MESSAGE, queryLength)
      commit(types.SERVICES_FILTER_SEARCH, {payload})
    }

  }

}

// mutations
const mutations = {
  [types.CARRIER_REFRESH] (state, { records }) {
    state.records = records
  },

  [types.CARRIER_UPDATE_FILTERS] (state, filters ) {
    _.extend(state.filters, filters)
  },

  [types.SERVICES_FILTER_MESSAGE](state, queryLength) {

    if (queryLength > 3) {
      if (state.selects.loading.fetching) {
        state.selects.loading.fetching = false
        state.selects.loading.noResultMessage = 'Fetching...'
        return
      }
      if (!state.selects.loading.fetching) {
        state.selects.loading.fetching = true
        state.selects.loading.noResultMessage = 'No results found'
        return
      }  
    }

    if (queryLength <= 3) {
      state.selects.loading.fetching = true
      state.selects.loading.noResultMessage = 'Search...'
      return
    }
    
  },

  [types.SERVICES_FILTER_SEARCH](state, {payload}) {

    let records = payload.records
    let filterType = payload.filterType
    console.log(records)

    switch (filterType) {

      case '[name][like]':
        state.selects.carriers = []
        records = store.sync(records)
        if ( !(_.isEmpty(records)) ) {
          for (let carrier of records) {
            if (carrier.presentation != null) {
              state.selects.carriers = getFilters(state.selects.carriers, carrier.presentation, 'string');
            }
          }
        }
      break

    }
      

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
