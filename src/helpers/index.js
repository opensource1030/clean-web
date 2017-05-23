import _ from 'lodash'

export const DeviceVariationHelper = {
  getCapacityIndex (dv) {
    return _.findIndex(dv.modifications, (m) => (m.modType == 'capacity'))
  },

  getStyleIndex (dv) {
    return _.findIndex(dv.modifications, (m) => (m.modType == 'style'))
  },
}

export const PresetHelper = {
  getDevicesCount (preset) {
    return preset.devicevariations.length
  },
}