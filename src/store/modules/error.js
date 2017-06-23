import * as types from "./../mutation-types";

// initial state
const state = {
  errors: []
}

// getters
const getters = {
  hasError: (state) => {
    return state.errors.length > 0
  },

  error: (state, getters) => {
    if (getters.hasError)
      return state.errors[0]
    else
      return ''
  },

  errorPrimary: (state, getters) => {
    if (getters.hasError)
      return state.errors[1]
    else
      return ''
  }
}

// actions
const actions = {
  addNew ({ commit }, { message }) {
    commit(types.ERROR_ADD_NEW, {message})
  },

  clearAll ({commit}) {
    commit(types.ERROR_CLEAR_ALL);
  }
}

// mutations
const mutations = {
  [types.ERROR_ADD_NEW] (state, { message }) {
    state.errors.push(message)
  },

  [types.ERROR_CLEAR_ALL] (state) {
    for (let i = state.errors.length; i > 0; i--) {
      state.errors.pop()
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
