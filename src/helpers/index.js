import _ from 'lodash'
import Vue from 'vue'
export { default as Utils } from './modules/utils'
export { default as ScopeHelper } from './modules/scope'
export { default as OrderHelper } from './modules/order'

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

export const CompanyHelper = {
  getMobilitySetting (company) {
    return _.find(company.globalsettingvalues, (value) => {
      return value.globalSettingId == 6
      // return value.globalsettings[0].name == 'mobility_central_login'
    })
  },

  newMobilitySetting () {
    return {
      type: 'globalsettingvalues',
      id: 0,
      name: 'enable',
      label: 'Enable',
      value: true,
      globalSettingId: 6
    }
  }
}

export const PackageHelper = {
  getPayBySetting (pack) {
    return _.find(pack.globalsettingvalues, (value) => {
      return value.globalSettingId == 4
      // return value.name == 'pay_by_personal_credit_or_debit_card'
    })
  },

  newPayBySetting () {
    return {
      type: 'globalsettingvalues',
      id: 0,
      name: 'enable',
      label: 'Enable',
      globalSettingId: 4
    }
  },

  getBringOwnSetting (pack) {
    return _.find(pack.globalsettingvalues, (value) => {
      return value.globalSettingId == 5
      // return value.name == 'bring_your_own_device'
    })
  },

  newBringOwnSetting () {
    return {
      type: 'globalsettingvalues',
      id: 0,
      name: 'enable',
      label: 'Enable',
      globalSettingId: 5
    }
  }
}