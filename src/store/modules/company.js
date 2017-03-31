import _ from 'lodash'
import companyAPI from './../../api/company-api'
import * as types from './../mutation-types'
import { CompaniesPresenter } from './../../presenters'

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
        console.log('company getAll err', err)
        reject(err)
      })
    })
  },

  update ({ dispatch, commit, state }, record) {
    return new Promise((resolve, reject) => {
      let company = _.find(state.all, (item) => { return item.id == record.id })
      let tmp = _.extend({}, company, record)
      let _params = JSON.stringify(CompaniesPresenter.toJSON(tmp))
      // console.log(_params)

      companyAPI.update(record.id, _params, res => {
        tmp = store.sync(res.data)
        // console.log(tmp)
        commit(types.COMPANY_UPDATE, tmp)
        resolve(res)
      }, err => {
        console.log('company update err', err)
        reject(err)
      })
    })
  },

  destory ({ dispatch, commit, state }, record) {
  },

  setPagination ({ commit }, pagination) {
    commit(types.COMPANY_SET_PAGINATION, pagination)
  },

  prevPage ({ dispatch, commit, state }) {
    if (state.pagination.current_page > 1) {
        commit(types.COMPANY_PREV_PAGE)
        dispatch('getAll')
    }
  },

  nextPage ({ dispatch, commit }) {
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

  [types.COMPANY_UPDATE] (state, record) {
    let company = _.find(state.all, (item) => { return item.id == record.id })
    if (company) {
      _.extend(company, record)
    }
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