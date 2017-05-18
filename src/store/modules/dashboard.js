import _ from 'lodash'
import authAPI from './../../api/auth-api'

import * as types from './../mutation-types'

const {Store} = require('yayson')();
const store = new Store();

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
      let params = 'include=companies.contents';

      authAPI.getUser(localStorage.userId, params, res => {
        let result = store.sync(res.data);
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  },

  getUserAllocations ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let params = 'include=companies.currentBillMonths,allocations&filter[allocations.billMonth]=[currentBillMonths.last:1]';

      authAPI.getUser(localStorage.userId, params, res => {
        let result = store.sync(res.data);
        resolve(result)
      }, err => {
        resolve(err)
      })
    })
  },
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
