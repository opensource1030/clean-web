import _ from 'lodash'
import companyAPI from './../../api/company-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
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
          // 'filter[active]': 1,
          // include: 'images',
        }
      }
      companyAPI.getAll(params, res => {
        // console.log('company res', res)
        const companies = store.sync(res.data)
        // console.log('company res', companies)
        commit(types.COMPANY_GET_ALL, companies)
        resolve(companies)
      }, err => {
        console.log('company err', err)
        reject(err)
      })
    })
  },
}

// mutations
const mutations = {
  [types.COMPANY_GET_ALL] (state, records) {
    state.all = records
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}