import _ from "lodash";
import authAPI from "./../../api/auth-api";
import * as types from "./../mutation-types";
import { Log, Utils } from "./../../helpers";

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: {}
}

// getters
const getters = {
  // getByName: (state) => (name) => {
  //   return _.get(state.records, name, null)
  // },
}

// actions
const actions = {
  // #TODO - replace name with { name, scopes }, so that get scope_token for several scopes at once
  // #TODO - for now, it calls scope token API directly , not through vuex store.
  get ({dispatch, commit, state}, name) {
    return new Promise((resolve, reject) => {
      let token = _.get(state.records, name, null)
      // console.log(name, token)
      if (token) {
        // Log.put('scope_token/get stored', name, token)
        resolve(token)
      } else {
        dispatch('update', name).then(
          res => {
            token = _.get(state.records, name, null)
            // Log.put('scope_token/get new', name, token)
            resolve(token)
          },
          err => {
            // dispatch('auth/logout', {}, { root: true }).then(res => {
            //   console.log('scope_token force logout ...', this.$router)
            //   reject(err)
            // })
            reject(err)
          }
        )
      }
    })
  },

  update ({commit}, name) {
    return new Promise((resolve, reject) => {
      authAPI.scopeToken({
        name: name,
        scopes: [name]
      }, res => {
        if (res.status == 200) {
          commit(types.SCOPE_TOKEN_UPDATE, { name: name, record: res.body })
          resolve(res.body)
        } else {
          Log.put('scope_token/update res', res)
          reject(res)
        }
      }, err => {
        Log.put('scope_token/update err', err)
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  [types.SCOPE_TOKEN_CLEAR_ALL] (state) {
    state.records = {}
  },

  [types.SCOPE_TOKEN_UPDATE] (state, {name, record}) {
    _.set(state.records, name, record)
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