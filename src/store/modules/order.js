import _ from 'lodash'
import orderAPI from './../../api/order-api'
import * as types from './../mutation-types'

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],

  filters: {
    orderStatuses: [],
    employeeNames: [],
    packageNames: [],
    carrierNames: [],
    deviceNames: [],
    addressPhones: [],
  },

  pagination: {
    current_page: 1,
    total_pages: 0,
    count: 0,
    total: 0,
    per_page: 25
  },
}

// getters
const getters = {
  sorted: (state) => {
    return state.records
  },
}

// actions
const actions = {
  search ({ dispatch, commit, state }) {

    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'addresses,users,services,packages,devicevariations,devicevariations.carriers,devicevariations.devices,devicevariations.devices.devicetypes,devicevariations.modifications',
          page: state.pagination.current_page,
        }
      }

      if (state.filters.orderStatuses.length > 0) {
        _params.params['filter[status][eq]'] = state.filters.orderStatuses.join(',')
      }

      if (state.filters.employeeNames.length > 0) {
        _params.params['filter[users.firstName][like]'] = state.filters.employeeNames.join(',')
      }

      if (state.filters.packageNames.length > 0) {
        _params.params['filter[packages.name][like]'] = state.filters.packageNames.join(',')
      }

      if (state.filters.carrierNames.length > 0) {
        _params.params['filter[services.carriers.presentation][like]'] = state.filters.carrierNames.join(',')
      }

      if (state.filters.deviceNames.length > 0) {
        _params.params['filter[devicevariations.devices.name][like]'] = state.filters.deviceNames.join(',')
      }

      if (state.filters.addressPhones.length > 0) {
        _params.params['filter[addresses.phone][like]'] = state.filters.addressPhones.join(',')
      }

      orderAPI.search(_params, res => {
        // console.log('orders res', res)
        const orders = store.sync(res.data)
        // console.log('search', orders)
        commit(types.ORDER_REFRESH, { records: orders })
        dispatch('setPagination', { pagination: res.data.meta.pagination })
        resolve(orders)
      }, err => {
        // console.log('orders err', err)
        reject(err)
      })
    })
  },

  setPagination ({ commit }, { pagination }) {
    commit(types.ORDER_SET_PAGINATION, { pagination })
  },

  prevPage ({ dispatch, commit, state }) {
    // console.log('order prevPage')
    if (state.pagination.current_page > 1) {
      commit(types.ORDER_PREV_PAGE)
      dispatch('search')
    }
  },

  nextPage ({ dispatch, commit }) {
    // console.log('order nextPage')
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.ORDER_NEXT_PAGE)
      dispatch('search')
    }
  },

  addFilter ({ dispatch, commit }, { type, records }) {
    commit(types.ORDER_ADD_FILTER, { type, records })
    dispatch('search')
  },
}

// mutations
const mutations = {
  [types.ORDER_REFRESH] (state, { records }) {
    state.records = records
    state.types = _.chain(state.records).sortBy('name').map('name').compact().uniq().value()
    state.manufacturers = _.chain(state.records).sortBy('make').map('make').compact().uniq().value()
    state.prices = _.chain(state.records).sortBy('defaultPrice').map('defaultPrice').uniq().value()
  },

  [types.ORDER_ADD_NEW] (state, { record }) {
    state.records.push(record)
  },

  [types.ORDER_SET_PAGINATION] (state, { pagination }) {
    _.extend(state.pagination, pagination)
  },

  [types.ORDER_PREV_PAGE] (state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.ORDER_NEXT_PAGE] (state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },

  [types.ORDER_ADD_FILTER] (state, { type, records }) {
    switch (type) {
      case 'status':
        state.filters.orderStatuses = records
        break
      case 'employee':
        state.filters.employeeNames = records
        break
      case 'package':
        state.filters.packageNames = records
        break
      case 'carrier':
        state.filters.carrierNames = records
        break
      case 'device':
        state.filters.deviceNames = records
        break
      case 'address':
        state.filters.addressPhones = records
        break
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}