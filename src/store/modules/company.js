import _ from 'lodash'
import companyAPI from './../../api/company-api'
import * as types from './../mutation-types'
import { CompaniesPresenter } from './../../presenters'
import FilterItem from './../../models/FilterItem'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],
  pagination: {
    current_page: 1,
    total_pages: 0,
    count: 0,
    total: 0,
    per_page: 25
  },
  filters: {
    presentation: new FilterItem(),
  },
}

// getters
const getters = {
  allCompanies: (state) => {
    return state.records
  },
}

// actions
const actions = {
  search ({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          page: state.pagination.current_page,
          include: 'udls,address',
        }
      }

      companyAPI.search(_params, res => {
        const companies = store.sync(res.data)
        // console.log('company res', companies)
        commit(types.COMPANY_REFRESH, companies)
        dispatch('setPagination', res.data.meta.pagination)
        resolve(companies)
      }, err => {
        // console.log('company err', err)
        reject(err)
      })
    })
  },

  update ({ dispatch, commit, state }, record) {
    return new Promise((resolve, reject) => {
      let company = _.find(state.records, (item) => { return item.id == record.id })
      let tmp = _.extend({}, company, record)
      let _params = JSON.stringify(CompaniesPresenter.toJSON(tmp))
      // console.log(_params)

      companyAPI.update(record.id, _params, res => {
        tmp = store.sync(res.data)
        // console.log(tmp)
        commit(types.COMPANY_UPDATE, tmp)
        resolve(res)
      }, err => {
        // console.log('company update err', err)
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
      dispatch('search')
    }
  },

  nextPage ({ dispatch, commit }) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.COMPANY_NEXT_PAGE)
      dispatch('search')
    }
  },
}

// mutations
const mutations = {
  [types.COMPANY_REFRESH] (state, records) {
    state.records = records
  },

  [types.COMPANY_UPDATE] (state, record) {
    let company = _.find(state.records, (item) => { return item.id == record.id })
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
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}