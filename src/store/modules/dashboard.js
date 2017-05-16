import _ from 'lodash'
import authAPI from './../../api/auth-api'

import * as types from './../mutation-types'

const {Store} = require('yayson')();
const store = new Store();

require('script!jquery');

// initial state
const state = {

};

// getters
const getters = {

};

// actions
const actions = {
  getClientInfo ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'companies,companies.contents,companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]'
        }
      }

      authAPI.getUser(localStorage.userId, params, res => {
        let result = store.sync(res.data);
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  }
};

// mutations
const mutations = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
