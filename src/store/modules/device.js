import _ from 'lodash'
import device from './../../api/device-api'
import * as types from './../mutation-types'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  all: [],
  types: [],
  manufacturers: [],
  prices: [],

  filter: {
    styles: [],
    capacities: [],
    carriers: [],
  },

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
  allDevices: (state) => {
    return state.all
  },

  search: (state, getters) => {
    let devices = state.all

    if (state.filter.capacities.length > 0) {
      devices = _.filter(devices, (device) => {
        let intersects = _.intersectionBy(device.modifications, state.filter.capacities, 'id')
        return intersects.length > 0
      })
    }

    if (state.filter.styles.length > 0) {
      devices = _.filter(devices, (device) => {
        let intersects = _.intersectionBy(device.modifications, state.filter.styles, 'id')
        return intersects.length > 0
      })
    }

    return devices
  },
}

// actions
const actions = {
  getAll ({ dispatch, commit, state }) {
    // commit(types.DEVICE_GET_ALL, await device.getAll({}))

    return new Promise((resolve, reject) => {
      /*
      building params with filters and pagination
      this params has been updated by any component, guess vuex-router-sync
      */
      let params = {
        params: {
          include: 'modifications,devicevariations,devicevariations.companies,devicevariations.carriers,images,devicevariations.modifications,devicevariations.images',
          page: state.pagination.current_page,
        }
      }
      // console.log(params)

      device.getAll(params, res => {
        // console.log('devices res', res)
        const devices = store.sync(res.data)
        for (let device of devices) {
          if (device.images.length > 0) {
            _.extend(device, {
              priceName: [],
              image: process.env.URL_API + '/images/' + device.images[0].id,
            })
          } else {
            _.extend(device, {
              priceName: [],
              image: '/assets/img/logo.a521535.png'
            })
          }
        }
        // console.log('all devices', devices)
        commit(types.DEVICE_GET_ALL, { records: devices })
        // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
        dispatch('setPagination', { pagination: res.data.meta.pagination })
        resolve(devices)
      }, err => {
        // console.log('devices err', err)
        reject(err)
      })
    })
  },

  addNew ({ commit }, { name }) {
    device.add(params, record => {
      commit(types.DEVICE_ADD_NEW, { record })
    })
  },

  setPagination ({ commit }, { pagination }) {
    commit(types.DEVICE_SET_PAGINATION, { pagination })
  },

  prevPage ({ dispatch, commit, state }) {
    // console.log('device prevPage')
    if (state.pagination.current_page > 1) {
      commit(types.DEVICE_PREV_PAGE)
      dispatch('getAll')
    }
  },

  nextPage ({ dispatch, commit }) {
    // console.log('device nextPage')
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.DEVICE_NEXT_PAGE)
      dispatch('getAll')
    }
  },

  addStyleFilter ({ dispatch, commit }, records) {
    // commit(types.DEVICE_ADD_FILTER, { type: 'style', records: records })
    dispatch('addFilter', { type: 'style', records: records })
  },

  addCapacityFilter ({ dispatch, commit }, records) {
    // commit(types.DEVICE_ADD_FILTER, { type: 'capacity', records: records })
    dispatch('addFilter', { type: 'capacity', records: records })
  },

  addCarrierFilter ({ dispatch, commit }, records) {
    // commit(types.DEVICE_ADD_FILTER, { type: 'carrier', records: records })
    dispatch('addFilter', { type: 'carrier', records: records })
  },

  addFilter ({ commit }, { type, records }) {
    commit(types.DEVICE_ADD_FILTER, { type, records })
  },
}

// mutations
const mutations = {
  [types.DEVICE_GET_ALL] (state, { records }) {
    state.all = records
    state.types = _.chain(state.all).sortBy('name').map('name').compact().uniq().value()
    state.manufactures = _.chain(state.all).sortBy('make').map('make').compact().uniq().value()
    state.prices = _.chain(state.all).sortBy('defaultPrice').map('defaultPrice').uniq().value()
  },

  [types.DEVICE_ADD_NEW] (state, { record }) {
    state.all.push(record)
  },

  [types.DEVICE_SET_PAGINATION] (state, { pagination }) {
    _.extend(state.pagination, pagination)
  },

  [types.DEVICE_PREV_PAGE] (state) {
    // if (state.pagination.current_page > 1)
    state.pagination.current_page--
  },

  [types.DEVICE_NEXT_PAGE] (state) {
    // if (state.pagination.current_page < state.pagination.total_pages)
    state.pagination.current_page++
  },

  [types.DEVICE_ADD_FILTER] (state, { type, records }) {
    switch (type) {
      case 'style':
        state.filter.styles = records
        break
      case 'capacity':
        state.filter.capacities = records
        break
      case 'carrier':
        state.filter.carriers = records
        break
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}