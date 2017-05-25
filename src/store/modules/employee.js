import _ from 'lodash'
import employeeAPI from './../../api/employee-api'
import * as types from './../mutation-types'
import {EmployeesPresenter} from './../../presenters'
import FilterItem from './../../models/FilterItem'

const {Store} = require('yayson')()
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
    firstName: new FilterItem(),
    email: new FilterItem(),
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
  search ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          page: state.pagination.current_page,
          include: 'companies,companies.udls,companies.addresses',
        }
      }

      let key, value;
      // if (state.filters.firstName.operator && state.filters.firstName.value) {
      //   key = 'filter[firstName][' + state.filters.firstName.operator + ']'
      //   switch (state.filters.firstName.operator) {
      //     case 'like':
      //     value = state.filters.firstName.value
      //     break
      //     default:
      //     value = state.filters.firstName.value
      //   }
      //   _params.params[key] = value
      // }

      if (state.filters.email.value) {
        key = 'filter[email][like]'
        value = state.filters.email.value
        _params.params[key] = value
      }

      employeeAPI.search(_params, res => {
        const employees = store.sync(res.data)
        // console.log('employee res', employees)
        commit(types.EMPLOYEE_REFRESH, employees)
        dispatch('setPagination', res.data.meta.pagination)
        resolve(employees)
      }, err => {
        // console.log('employee err', err)
        reject(err)
      })
    })
  },

  searchByFirstName({ dispatch, commit, state }, { query }) {
    commit(types.EMPLOYEE_UPDATE_FILTERS, { firstName: { operator: 'like', value: query } })
    return dispatch('search')
  },

  searchByEmail({ dispatch, commit, state }, { query }) {
    commit(types.EMPLOYEE_UPDATE_FILTERS, { email: { operator: 'like', value: query } })
    return dispatch('search')
  },

  update ({dispatch, commit, state}, record) {
    return new Promise((resolve, reject) => {
      let employee = _.find(state.records, (item) => {
        return item.id == record.id
      })
      let tmp = _.extend({}, employee, record)
      let _params = JSON.stringify(EmployeesPresenter.toJSON(tmp))
      // console.log(_params)

      employeeAPI.update(record.id, _params, res => {
        tmp = store.sync(res.data)
          // console.log(tmp)
          commit(types.EMPLOYEE_UPDATE, tmp)
          resolve(res)
        }, err => {
          // console.log('employee update err', err)
          reject(err)
        })
    })
  },

  destory ({dispatch, commit, state}, record) {
  },

  setPagination ({commit}, pagination) {
    commit(types.EMPLOYEE_SET_PAGINATION, pagination)
  },

  prevPage ({dispatch, commit, state}) {
    if (state.pagination.current_page > 1) {
      commit(types.EMPLOYEE_PREV_PAGE)
      dispatch('search')
    }
  },

  nextPage ({dispatch, commit}) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.EMPLOYEE_NEXT_PAGE)
      dispatch('search')
    }
  },
}

// mutations
const mutations = {
  [types.EMPLOYEE_REFRESH] (state, records) {
    state.records = records
  },

  [types.EMPLOYEE_UPDATE] (state, record) {
    let employee = _.find(state.records, (item) => {
      return item.id == record.id
    })
    if (employee) {
      _.extend(employee, record)
    }
  },

  [types.EMPLOYEE_SET_PAGINATION] (state, pagination) {
    _.extend(state.pagination, pagination)
  },

  [types.EMPLOYEE_PREV_PAGE] (state) {
    state.pagination.current_page--
  },

  [types.EMPLOYEE_NEXT_PAGE] (state) {
    state.pagination.current_page++
  },

  [types.EMPLOYEE_UPDATE_FILTERS] (state, filters) {
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