import _ from 'lodash'
import companyAPI from './../../api/company-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
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
  allCompanies: (state) => {
    return state.all
    // return _.chain(state.all).sortBy([ 'presentation' ]).value()
  },
}

// actions
const actions = {
  getAll ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          page: state.pagination.current_page,
        }
      }
      companyAPI.getAll(params, res => {
        // console.log('company res', res)
        const companies = store.sync(res.data)
        // console.log('company res', companies)
        commit(types.COMPANY_GET_ALL, companies)
        dispatch('setPagination', res.data.meta.pagination)
        resolve(companies)
      }, err => {
        console.log('company err', err)
        reject(err)
      })
    })
  },

  setPagination ({commit}, pagination) {
    commit(types.COMPANY_SET_PAGINATION, pagination)
  },

  prevPage ({dispatch, commit, state}) {
    if (state.pagination.current_page > 1) {
        commit(types.COMPANY_PREV_PAGE)
        dispatch('getAll')
    }
  },

  nextPage ({dispatch, commit}) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.COMPANY_NEXT_PAGE)
      dispatch('getAll')
    }
  },
}

// mutations
const mutations = {
  [types.COMPANY_GET_ALL] (state, records) {
    state.all = records
  },

  [types.COMPANY_SET_PAGINATION] (state, pagination) {
    _.extend(state.pagination, pagination)
  },

  [types.COMPANY_PREV_PAGE] (state) {
    state.pagination.current_page--
  },

  [types.COMPANY_NEXT_PAGE] (state) {
    state.pagination.current_page++
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}