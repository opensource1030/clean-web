import _ from 'lodash'

export const Utils = {
  isEmptyArray (arr) {
    if (arr == null || arr === void (0) || arr.length == 0) {
      return true
    } else {
      return false
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

export const OrderHelper = {
  getState (order) {
    switch (order.status) {
      case 'New':
        return 'new'
      case 'Pending Delivery':
        return 'pending'
      case 'Delivered':
        return 'delivered'
      case 'Denied':
        return 'denied'
      default:
        return 'draft'
    }
  },

  getNextState (order) {
    let state = this.getState(order)
    let stateDic = {
      'new': 'Pending Delivery',
      'pending': 'Delivered',
      'delivered': '',
      'denied': 'New',
      'draft': ''
    }
    return stateDic[state]
  },

  getButtonText (order) {
    let state = this.getState(order)
    let textDic = {
      'new': 'Approve Request',
      'pending': 'Mark Delivered',
      'delivered': '',
      'denied': 'Renew',
      'draft': ''
    }
    return textDic[state]
  },

  getButtonClass (order) {
    let state = this.getState(order)
    let classDic = {
      'new': 'warning',
      'pending': 'success',
      'delivered': '',
      'denied': 'alert',
      'draft': ''
    }
    return classDic[state]
  },
}