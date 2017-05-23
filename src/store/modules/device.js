import _ from 'lodash'
import deviceAPI from './../../api/device-api'
import * as types from './../mutation-types'

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  records: [],

  types: [],
  manufacturers: [],
  prices: [],

  filters: {
    deviceNames: [],
    deviceMakers: [],
    typeNames: [],

    carriers: [],
    capacities: [],
    styles: [],
    companies: [],
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
    return state.records
  },

  sorted: (state) => {
    return _.sortBy(state.records, [ 'name' ])
  },

  // search: (state, getters) => {
  //   let devices = state.records
  //   if (state.filters.capacities.length > 0) {
  //     devices = _.filter(devices, (device) => {
  //       let intersects = _.intersectionBy(device.modifications, state.filters.capacities, 'id')
  //       return intersects.length > 0
  //     })
  //   }
  //   if (state.filters.styles.length > 0) {
  //     devices = _.filter(devices, (device) => {
  //       let intersects = _.intersectionBy(device.modifications, state.filters.styles, 'id')
  //       return intersects.length > 0
  //     })
  //   }
  //   return devices
  // },
}

// actions
const actions = {
  search ({ dispatch, commit, state }) {

    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'devicetypes,modifications,images,devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images',
          page: state.pagination.current_page,
        }
      }

      if (state.filters.deviceNames.length > 0) {
        _params.params['filter[name][like]'] = state.filters.deviceNames.join(',')
      }

      if (state.filters.deviceMakers.length > 0) {
        _params.params['filter[make][like]'] = state.filters.deviceMakers.join(',')
      }

      if (state.filters.typeNames.length > 0) {
        _params.params['filter[devicetypes.name][like]'] = state.filters.typeNames.join(',')
      }

      if (state.filters.carriers.length > 0) {
        _params.params['filter[devicevariations.carrierId][eq]'] = _.map(state.filters.carriers, 'id').join(',')
      }

      if (state.filters.capacities.length > 0) {
        _params.params['filter[modifications.id][eq]'] = _.map(state.filters.capacities, 'id').join(',')
      }

      if (state.filters.styles.length > 0) {
        _params.params['filter[modifications.value][like]'] = _.map(state.filters.styles, 'value').join(',')
      }

      if (state.filters.companies.length > 0) {
        _params.params['filter[devicevariations.companyId][eq]'] = _.map(state.filters.companies, 'id').join(',')
      }
      // console.log(_params)

      deviceAPI.search(_params, res => {
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
        // console.log('search', devices)
        commit(types.DEVICE_REFRESH, {records: devices})
        // commit(types.DEVICE_SET_PAGINATION, { pagination: res.data.meta.pagination })
        dispatch('setPagination', {pagination: res.data.meta.pagination})
        resolve(devices)
      }, err => {
        // console.log('devices err', err)
        reject(err)
      })
    })
  },

  addNew ({ commit }, { name }) {
    deviceAPI.add(params, record => {
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
      dispatch('search')
    }
  },

  nextPage ({ dispatch, commit }) {
    // console.log('device nextPage')
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.DEVICE_NEXT_PAGE)
      dispatch('search')
    }
  },

  addFilter ({ dispatch, commit }, { type, records }) {
    commit(types.DEVICE_ADD_FILTER, { type, records })
    return dispatch('search')
  },

  addVariation ({commit}, variation) {
    commit(types.DEVICE_ADD_VARIATTION, variation)
  },

  removeVariation ({commit}, variation) {
    commit(types.DEVICE_REMOVE_VARIATTION, variation)
  }
}

// mutations
const mutations = {
  [types.DEVICE_REFRESH] (state, { records }) {
    state.records = records
    state.types = _.chain(state.records).sortBy('name').map('name').compact().uniq().value()
    state.manufacturers = _.chain(state.records).sortBy('make').map('make').compact().uniq().value()
    state.prices = _.chain(state.records).sortBy('defaultPrice').map('defaultPrice').uniq().value()
  },

  [types.DEVICE_ADD_NEW] (state, { record }) {
    state.records.push(record)
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
      case 'name':
        state.filters.deviceNames = records
        break
      case 'maker':
        state.filters.deviceMakers = records
        break
      case 'type':
        state.filters.typeNames = records
        break
      case 'carrier':
        state.filters.carriers = records
        break
      case 'capacity':
        state.filters.capacities = records
        break
      case 'style':
        state.filters.styles = records
        break
      case 'company':
        state.filters.companies = records
        break
    }
  },

  [types.DEVICE_ADD_VARIATTION] (state, variation) {
    let device = _.find(state.records, (d) => (parseInt(d.id) == parseInt(variation.deviceId)))
    device.devicevariations.push(variation)
  },

  [types.DEVICE_REMOVE_VARIATTION] (state, variation) {
    let device = _.find(state.records, (d) => (parseInt(d.id) == parseInt(variation.deviceId)))
    _.remove(device.devicevariations, (dv) => (parseInt(dv.id) == parseInt(variation.id)))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}