import _ from 'lodash'

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