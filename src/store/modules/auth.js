import auth from './../../api/auth-api'
import * as types from './../mutation-types'

// initial state
const state = {
  // email: localStorage.getItem('email') || '',
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  profile: JSON.parse(localStorage.getItem('userProfile')) || {},
  // authenticated: false,
  isAuthenticating: false
}

// getters
const getters = {
  isAuthenticated: (state) => {
    // console.log('isAuthenticated ...', state.userId, state.token)
    return (!!state.token) && (!!state.userId)
  },
}

// actions
const actions = {
  register ({ commit }, { email, password }) {
  },

  login ({ commit, state }, { email }) {
    return new Promise((resolve, reject) => {
      commit('LOGIN_REQUEST')
      auth.login({
        email: email
      }, (res) => {
        // console.log('auth res', res)
        commit('LOGIN_FAILURE')
        resolve(res)
      }, (err) => {
        // console.log('auth err', err)
        commit('LOGIN_FAILURE')
        resolve(err)
      })
    })
  },

  loginLocal ({ commit, state }, { email, password }) {
    return new Promise((resolve, reject) => {
      commit('LOGIN_REQUEST')
      auth.loginLocal({
        email: email,
        password: password
      }, (res) => {
        // console.log('auth res', res)

        auth.profile({token: res.data.access_token}, (response) => {
          const result = {
            user_id: res.body.user_id,
            token: res.body.access_token,
            profile: response
            // profile: response.data.data.attributes || {}
          }
          // console.log('auth result', result)
          commit('LOGIN_SUCCESS', result)
          // commit('SET_PROFILE', result)
          resolve(result)
        }, (error) => {
          // console.log('auth error', error)
          commit('LOGIN_FAILURE')
          reject(error)
        })
      }, (err) => {
        // console.log('auth err', err)
        commit('LOGIN_FAILURE')
        reject(err)
      })
    })
  },

  logout ({ commit }) {
    commit('LOGOUT')
  },
}

// mutations
const mutations = {
  [types.AUTH_LOGIN_REQUEST] (state) {
    state.isAuthenticating = true
  },

  [types.AUTH_LOGIN_FAILURE] (state) {
    state.isAuthenticating = false
  },

  [types.AUTH_LOGIN_SUCCESS] (state, result) {
    localStorage.setItem('token', result.token)
    localStorage.setItem('userId', result.user_id)
    localStorage.setItem('userProfile', JSON.stringify(result.profile))

    state.token = result.token
    state.userId = result.user_id
    state.profile = result.profile

    state.isAuthenticating = false
    // state.authenticated = true
  },

  [types.AUTH_LOGOUT] (state) {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    state.token = null
    state.userId = null
    state.profile = null

    // state.authenticated = false
  },

  [types.AUTH_SET_PROFILE] (state, result) {
    localStorage.setItem('userProfile', JSON.stringify(result.profile))

    state.profile = result.profile
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}