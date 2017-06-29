import _ from 'lodash'
import Vue from 'vue'
export { default as ScopeHelper } from './modules/scope'
export { default as OrderHelper } from './modules/order'

export const Utils = {
  isEmptyArray (val) {
    if (val == null || val === void (0) || val.length == 0) {
      return true
    } else {
      return false
    }
  },

  isEmptyObject (val) {
    if (val == null || val === void (0) || val === '' || val === {}) {
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
  },

  parseJsonString (str) {
    let val
    try {
      val = JSON.parse(str);
    } catch (e) {
      // console.log('json parse error', e)
      val = {}
    }
    return val
  }
}

export const Log = {
  put () {
    // console.log(arguments)
    if (process.env.NODE_ENV !== 'production') {
      console.log.apply(console, arguments)
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
  },

  getAuthHeader (token) {
    return {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
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