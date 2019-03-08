import presetAPI from "./../../api/preset-api";
import * as types from "./../mutation-types";
import FilterItem from "./../../models/FilterItem";

const { Store } = require('yayson')()
const store = new Store()

const state = {
  records: [],
  pagination: {
    current_page: 1,
    total_pages: null,
    count: null,
    total: null,
    per_page: 25
  },
  filters: {
    name: new FilterItem(),
  },
}

const getters = {
  sorted: (state) => {
    return state.records
  },
}

const actions = {
  search({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'devicevariations,devicevariations.devices,devicevariations.modifications',
          page: state.pagination.current_page,
        }
      }

      let key, value;
      if (state.filters.name.operator && state.filters.name.value) {
        key = 'filter[name][like]'
        value = state.filters.name.value
        _params.params[key] = value
      }

      presetAPI.search(_params, res => {
        const presets = store.sync(res.data)
        // console.log('preset res', res)
        commit(types.PRESET_REFRESH, presets)
        dispatch('setPagination', res.data.meta.pagination)
        resolve(presets)
      }, err => {
        // console.log('preset err', err)
        reject(err)
      })
    })
  },

  searchByName({ dispatch, commit, state }, { query }) {
    commit(types.PRESET_UPDATE_FILTERS, { name: { operator: 'like', value: query }})
    return dispatch('search')
  },

  setPagination ({commit}, pagination) {
    commit(types.PRESET_SET_PAGINATION, pagination)
  },

  prevPage ({ dispatch, commit, state }) {
    if (state.pagination.current_page > 1) {
      commit(types.PRESET_PREV_PAGE)
      dispatch('search')
    }
  },

  nextPage ({ dispatch, commit, state }) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.PRESET_NEXT_PAGE)
      dispatch('search')
    }
  },
}

const mutations = {
  [types.PRESET_REFRESH] (state, records) {
    state.records = records
  },

  [types.PRESET_SET_PAGINATION] (state, pagination) {
    _.extend(state.pagination, pagination)
  },

  [types.PRESET_PREV_PAGE] (state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.PRESET_NEXT_PAGE] (state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },

  [types.PRESET_UPDATE_FILTERS] (state, filters) {
    _.extend(state.filters, filters)
  },
}

export default {
  namespaced : true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}