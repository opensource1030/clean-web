import _ from 'lodash'
import packageAPI from './../../api/package-api'
import * as types from './../mutation-types'

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],

  filters: {
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
    return _.sortBy(state.records, [ 'name' ])
  },
}

// actions
const actions = {
  search ({ dispatch, commit, state }) {

    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'conditions,devicevariations,devicevariations.devices,services,addresses',
          page: state.pagination.current_page,
        }
      }

      packageAPI.search(_params, res => {
        // console.log('packages res', res)
        const packages = store.sync(res.data)

        // console.log('search', packages)
        commit(types.PACKAGE_REFRESH, { records: packages })
        dispatch('setPagination', { pagination: res.data.meta.pagination })
        resolve(packages)
      }, err => {
        // console.log('packages err', err)
        reject(err)
      })
    })
  },

  addNew ({ commit }, { name }) {
    packageAPI.add(params, record => {
      commit(types.PACKAGE_ADD_NEW, { record })
    })
  },

  setPagination ({ commit }, { pagination }) {
    commit(types.PACKAGE_SET_PAGINATION, { pagination })
  },

  prevPage ({ dispatch, commit, state }) {
    // console.log('package prevPage')
    if (state.pagination.current_page > 1) {
      commit(types.PACKAGE_PREV_PAGE)
      dispatch('search')
    }
  },

  nextPage ({ dispatch, commit }) {
    // console.log('package nextPage')
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.PACKAGE_NEXT_PAGE)
      dispatch('search')
    }
  },

  addFilter ({ dispatch, commit }, { type, records }) {
    commit(types.PACKAGE_ADD_FILTER, { type, records })
    dispatch('search')
  },
}

// mutations
const mutations = {
  [types.PACKAGE_REFRESH] (state, { records }) {
    state.records = records
  },

  [types.PACKAGE_ADD_NEW] (state, { record }) {
    state.records.push(record)
  },

  [types.PACKAGE_SET_PAGINATION] (state, { pagination }) {
    _.extend(state.pagination, pagination)
  },

  [types.PACKAGE_PREV_PAGE] (state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.PACKAGE_NEXT_PAGE] (state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },

  [types.PACKAGE_ADD_FILTER] (state, { type, records }) {
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}