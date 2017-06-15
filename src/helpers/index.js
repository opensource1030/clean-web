import _ from 'lodash'
import Vue from 'vue'
export { default as ScopeHelper } from './modules/scope'
export { default as OrderHelper } from './modules/order'

export const Utils = {
  isEmptyArray (arr) {
    if (arr == null || arr === void (0) || arr.length == 0) {
      return true
    } else {
      return false
    }
  },

  isEmpty (val) {
    if (val == null || val === void (0) || val === '') {
      return true
    } else {
      return false
    }
  }
}

export const Storage = {
  set (key, value) {
    localStorage.setItem(key, value)
  },

  get (key) {
    // console.log('get', key, localStorage.getItem(key))
    return localStorage.getItem(key) || null
  },

  remove (key) {
    // console.log('remove')
    localStorage.removeItem(key)
  },

  removeAll () {
    // console.log('remove all')
    localStorage.clear()
  }
}

export const AuthHelper = {
  setAuthHeader (token) {
    Vue.http.headers.common['Authorization'] = 'Bearer ' + token
  }
}

export const EmployeeHelper = {
  getUdlValueIndex (employee, udl_id) {
    return _.findIndex(employee.udlvalues, (uv) => (uv.udlId == udl_id))
  }
}

export const DeviceVariationHelper = {
  getCapacityIndex (dv) {
    return _.findIndex(dv.modifications, (m) => (m.modType == 'capacity'))
    // let index = _.findIndex(dv.modifications, (m) => (m.modType == 'capacity'))
    // console.log('getCapacityIndex', index)
    // return index
  },

  getStyleIndex (dv) {
    return _.findIndex(dv.modifications, (m) => (m.modType == 'style'))
    // let index = _.findIndex(dv.modifications, (m) => (m.modType == 'style'))
    // console.log('getStyleIndex', index)
    // return index
  },
}

export const PresetHelper = {
  getDevicesCount (preset) {
    return preset.devicevariations.length
  },
}

export const ModificationHelper = {
  getEmptyCapacity () {
    return {
      type: 'modifications',
      id: 0,
      modType: 'capacity'
    }
  },

  getEmptyStyle () {
    return {
      type: 'modifications',
      id: 0,
      modType: 'style'
    }
  },
}