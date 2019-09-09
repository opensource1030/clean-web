import * as types from '@/store/mutation-types'
import packageAPI from '@/api/package-api'
import orderAPI from '@/api/order-api'

const { Store } = require('yayson')()
const store = new Store()

const initialUpgradeData = {
  step: 0,
  selectedEmployee: null,
  selectedService: null,
  selectedDevice: null,
  changeCarrier: false,
  comment: null,
  hasOrder: false,
}

const initialNewlineData = {
  step: 0,
  selectedEmployee: null,
  selectedService: null,
  selectedDevice: null,
  comment: null,
  details: {
    carrierInfo: null,
    wirelessNo: null,
    accountName: null,
    billingName: null,
    billingAccount: null,
    billingPassword: null,
    keepExistingService: false,
  },
  needNewDevice: false,
  // existingServiceInfo: {
  //   serviceImei: null,
  //   servicePhoneNo: null,
  //   serviceSim: null,
  // },
  deviceInfo: {
    deviceImei: null,
    deviceCarrier: null,
    deviceSim: null,
    needNewSim: false,
  },
  hasOrder: false,
}

const initialTransferData = {
  step: 0,
  selectedEmployee: null,
  selectedService: null,
  selectedDevice: null,
  comment: null,
  details: {
    carrierInfo: null,
    wirelessNo: null,
    accountName: null,
    billingName: null,
    billingAccount: null,
    billingPassword: null,
    keepExistingService: false,
  },
  needNewDevice: false,
  existingServiceInfo: {
    serviceImei: null,
    servicePhoneNo: null,
    serviceSim: null,
  },
  deviceInfo: {
    deviceImei: null,
    deviceCarrier: null,
    deviceSim: null,
    needNewSim: false,
  },
  hasOrder: false,
}

// initial state
const state = {
  userPackages: [],
  userPackagesLoading: false,
  allocation: {},
  upgrade: { ...initialUpgradeData },
  newline: { ... initialNewlineData },
  transfer: { ...initialTransferData },
}

const getters = {
  userPackages: state => {
    return state.userPackages
  },

  userPackagesLoading: state => {
    return state.userPackagesLoading
  },

  allDevices: state => {
    let allDevices = []

    state.userPackages.forEach(({ id, devicevariations }) => {
      devicevariations.forEach(variation => {
        const device_type = _.get(variation, 'devices[0].devicetypes[0].name', '')
        if (device_type != 'Accessory') {
          allDevices.push({ ...variation, packageId: id })
        }
      })
    })

    allDevices = _.values(_.groupBy(_.uniqBy(allDevices, 'id'), 'deviceId'))

    return allDevices
  },

  allAccessories: state => {
    let allAccessories = []

    state.userPackages.forEach(({ id, devicevariations }) => {
      devicevariations.forEach(variation => {
        const device_type = _.get(variation, 'devices[0].devicetypes[0].name', '')
        // console.log('allAccessories', device_type, variation)
        if (device_type == 'Accessory') {
          allAccessories.push({ ...variation, deviceType: device_type, packageId: id })
        }
      })
    })

    return allAccessories;
  },

  // Upgrade
  upgradeStep: state => {
    return state.upgrade.step
  },

  upgradeSelectedEmployee: state => {
    return state.upgrade.selectedEmployee
  },

  upgradeSelectedDevice: state => {
    return state.upgrade.selectedDevice
  },

  upgradeSelectedService: state => {
    return state.upgrade.selectedService
  },

  upgradeChangeCarrier: state => {
    return state.upgrade.changeCarrier
  },

  upgradeHasOrder: state => {
    return state.upgrade.hasOrder
  },

  upgradeDevices: (state, getters) => {
    return getters.allDevices;
  },

  upgradeServices: state => {
    let allServices = []

    if (!state.upgrade.selectedDevice) {
      return allServices
    }

    state.userPackages.forEach(({ devicevariations, services }) => {
      if (_.find(devicevariations, { id: state.upgrade.selectedDevice.id })) {
        services.forEach(service => {
          allServices.push(service)
        })
      }
    })

    return _.uniqBy(allServices, 'id')
  },

  upgradeAddresses: state => {
    let allAddresses = []

    if (!state.upgrade.selectedDevice) {
      return allAddresses
    }

    state.userPackages.forEach(({ devicevariations, addresses }) => {
      if (_.find(devicevariations, { id: state.upgrade.selectedDevice.id })) {
        addresses.forEach(address => {
          allAddresses.push(address)
        })
      }
    })

    return allAddresses
  },

  upgradeComment: state => {
    return state.upgrade.comment
  },

  // New Line of Service

  newlineStep: state => {
    return state.newline.step
  },

  newlineSelectedEmployee: state => {
    return state.newline.selectedEmployee
  },

  newlineSelectedDevice: state => {
    return state.newline.selectedDevice
  },

  newlineSelectedService: state => {
    return state.newline.selectedService
  },

  newlineDetails: state => {
    return state.newline.details
  },

  newlineNeedNewDevice: state => {
    return state.newline.needNewDevice
  },

  newlineNeedNewSim: state => {
    return state.newline.needNewSim
  },

  newlineDeviceInfo: state => {
    return state.newline.deviceInfo
  },

  newlineHasOrder: state => {
    return state.newline.hasOrder
  },

  newlineDevices: (_state, getters) => {
    return getters.upgradeDevices
  },

  newlineServices: state => {
    const { userPackages } = state
    const { needNewDevice, selectedDevice } = state.newline

    let allServices = []

    if (needNewDevice && selectedDevice) {
      userPackages.forEach(({ devicevariations, services }) => {
        if (_.find(devicevariations, { id: selectedDevice.id })) {
          services.forEach(service => {
            allServices.push(service)
          })
        }
      })
    } else if (!needNewDevice) {
      userPackages.forEach(({ services }) => {
        services.forEach(service => {
          allServices.push(service)
        })
      })
    }

    return _.uniqBy(allServices, 'id')
  },

  newlineAddresses: state => {
    let allAddresses = []

    if (!state.newline.selectedDevice) {
      return allAddresses
    }

    state.userPackages.forEach(({ devicevariations, addresses }) => {
      if (_.find(devicevariations, { id: state.newline.selectedDevice.id })) {
        addresses.forEach(address => {
          allAddresses.push(address)
        })
      }
    })

    return allAddresses
  },

  newlineComment: state => {
    return state.newline.comment
  },

  // Transfer

  transferStep: state => {
    return state.transfer.step
  },

  transferSelectedEmployee: state => {
    return state.transfer.selectedEmployee
  },

  transferSelectedDevice: state => {
    return state.transfer.selectedDevice
  },

  transferSelectedService: state => {
    return state.transfer.selectedService
  },

  transferExistingServiceInfo: state => {
    return state.transfer.existingServiceInfo
  },

  transferNeedNewDevice: state => {
    return state.transfer.needNewDevice
  },

  transferDetails: state => {
    return state.transfer.details
  },

  transferDeviceInfo: state => {
    return state.transfer.deviceInfo
  },

  transferHasOrder: state => {
    return state.transfer.hasOrder
  },

  transferDevices: (_state, getters) => {
    return getters.upgradeDevices
  },

  transferServices: state => {
    const { userPackages } = state
    const { selectedDevice } = state.transfer

    let allServices = []

    userPackages.forEach(({ services }) => {
      services.forEach(service => {
        allServices.push(service)
      })
    })

    return _.uniqBy(allServices, 'id')
  },

  transferAddresses: state => {
    let allAddresses = []

    if (!state.transfer.selectedDevice) {
      return allAddresses
    }

    state.userPackages.forEach(({ devicevariations, addresses }) => {
      if (_.find(devicevariations, { id: state.transfer.selectedDevice.id })) {
        addresses.forEach(address => {
          allAddresses.push(address)
        })
      }
    })

    return allAddresses
  },

  transferComment: state => {
    return state.transfer.comment
  },
}

// actions
const actions = {
  getUserPackages({ commit }, userId) {
    return new Promise((resolve, reject) => {
      const payload = {
        params: {
          include:
            'services,services.serviceitems,devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.devicetypes,addresses',
        },
      }

      commit(types.PLACE_ORDER_SET_USER_PACKAGES_LOADING, true)

      packageAPI.getMatchedPackages(
        userId,
        payload,
        res => {
          const results = store.sync(res.data)
          commit(types.PLACE_ORDER_SET_USER_PACKAGES, results)
          commit(types.PLACE_ORDER_SET_USER_PACKAGES_LOADING, false)
          resolve(results)
        },
        err => {
          commit(types.PLACE_ORDER_SET_USER_PACKAGES_LOADING, false)
          reject(err)
        },
      )
    })
  },

  createUpgradeOrder({ commit }, orderData) {
    return new Promise((resolve, reject) => {
      orderAPI.create(
        orderData,
        res => {
          commit(types.PLACE_ORDER_SET_UPGRADE_HAS_ORDER, true)
          commit(types.PLACE_ORDER_RESET_UPGRADE)
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  createNewlineOrder({ commit }, orderData) {
    return new Promise((resolve, reject) => {
      orderAPI.create(
        orderData,
        res => {
          commit(types.PLACE_ORDER_SET_NEWLINE_HAS_ORDER, true)
          commit(types.PLACE_ORDER_RESET_NEWLINE)
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  createTransferOrder({ commit }, orderData) {
    return new Promise((resolve, reject) => {
      orderAPI.create(
        orderData,
        res => {
          commit(types.PLACE_ORDER_SET_TRANSFER_HAS_ORDER, true)
          commit(types.PLACE_ORDER_RESET_TRANSFER)
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  setAllocation({ commit }, allocation) {
    commit(types.PLACE_ORDER_SET_ALLOCATION, allocation)
  },

  // Upgrade

  setUpgradeStep({ commit }, step) {
    commit(types.PLACE_ORDER_SET_UPGRADE_STEP, step)
  },

  setUpgradeSelectedEmployee({ commit }, selectedEmployee) {
    commit(types.PLACE_ORDER_SET_UPGRADE_SELECTED_EMPLOYEE, selectedEmployee)
  },

  setUpgradeSelectedDevice({ commit }, selectedDevice) {
    commit(types.PLACE_ORDER_SET_UPGRADE_SELECTED_DEVICE, selectedDevice)
  },

  setUpgradeSelectedService({ commit }, selectedService) {
    commit(types.PLACE_ORDER_SET_UPGRADE_SELECTED_SERVICE, selectedService)
  },

  setUpgradeChangeCarrier({ commit }, changeCarrier) {
    commit(types.PLACE_ORDER_SET_UPGRADE_CHANGE_CARRIER, changeCarrier)
  },

  setUpgradeHasOrder({ commit }, hasOrder) {
    commit(types.PLACE_ORDER_SET_UPGRADE_HAS_ORDER, hasOrder)
  },

  setUpgradeComment({ commit }, comment) {
    commit(types.PLACE_ORDER_SET_UPGRADE_COMMENT, comment)
  },

  // New Line of Service

  setNewlineStep({ commit }, step) {
    commit(types.PLACE_ORDER_SET_NEWLINE_STEP, step)
  },

  setNewlineSelectedEmployee({ commit }, selectedEmployee) {
    commit(types.PLACE_ORDER_SET_NEWLINE_SELECTED_EMPLOYEE, selectedEmployee)
  },

  setNewlineSelectedDevice({ commit }, selectedDevice) {
    commit(types.PLACE_ORDER_SET_NEWLINE_SELECTED_DEVICE, selectedDevice)
  },

  setNewlineSelectedService({ commit }, selectedService) {
    commit(types.PLACE_ORDER_SET_NEWLINE_SELECTED_SERVICE, selectedService)
  },

  setNewlineDetails({ commit }, details) {
    commit(types.PLACE_ORDER_SET_NEWLINE_DETAILS, details)
  },

  setNewlineNeedNewDevice({ commit }, needNewDevice) {
    commit(types.PLACE_ORDER_SET_NEWLINE_NEED_NEW_DEVICE, needNewDevice)
  },

  setNewlineNeedNewSim({ commit }, needNewSim) {
    commit(types.PLACE_ORDER_SET_NEWLINE_NEED_NEW_SIM, needNewSim)
  },

  setNewlineNeedNewSim({ commit }, needNewSim) {
    commit(types.PLACE_ORDER_SET_NEWLINE_NEED_NEW_SIM, needNewSim)
  },

  setNewlineDeviceInfo({ commit }, deviceInfo) {
    commit(types.PLACE_ORDER_SET_NEWLINE_DEVICE_INFO, deviceInfo)
  },

  setNewlineHasOrder({ commit }, hasOrder) {
    commit(types.PLACE_ORDER_SET_NEWLINE_HAS_ORDER, hasOrder)
  },

  setNewlineComment({ commit }, comment) {
    commit(types.PLACE_ORDER_SET_NEWLINE_COMMENT, comment)
  },

  // Transfer

  setTransferStep({ commit }, step) {
    commit(types.PLACE_ORDER_SET_TRANSFER_STEP, step)
  },

  setTransferSelectedEmployee({ commit }, selectedEmployee) {
    commit(types.PLACE_ORDER_SET_TRANSFER_SELECTED_EMPLOYEE, selectedEmployee)
  },

  setTransferSelectedDevice({ commit }, selectedDevice) {
    commit(types.PLACE_ORDER_SET_TRANSFER_SELECTED_DEVICE, selectedDevice)
  },

  setTransferSelectedService({ commit }, selectedService) {
    commit(types.PLACE_ORDER_SET_TRANSFER_SELECTED_SERVICE, selectedService)
  },

  setExistingServiceInfo({ commit }, existingServiceInfo) {
    commit(types.PLACE_ORDER_SET_EXISTING_SERVICE_INFO, existingServiceInfo)
  },

  setTransferDetails({ commit }, details) {
    commit(types.PLACE_ORDER_SET_TRANSFER_DETAILS, details)
  },

  setTransferNeedNewDevice({ commit }, needNewDevice) {
    commit(types.PLACE_ORDER_SET_TRANSFER_NEED_NEW_DEVICE, needNewDevice)
  },

  setTransferDeviceInfo({ commit }, deviceInfo) {
    commit(types.PLACE_ORDER_SET_TRANSFER_DEVICE_INFO, deviceInfo)
  },

  setTransferHasOrder({ commit }, hasOrder) {
    commit(types.PLACE_ORDER_SET_TRANSFER_HAS_ORDER, hasOrder)
  },

  setTransferComment({ commit }, comment) {
    commit(types.PLACE_ORDER_SET_TRANSFER_COMMENT, comment)
  },

  /* getPackageServices({ dispatch, commit, state }, packageId) {
    commit(types.PLACE_ORDER_SET_PACKAGE, packageId)
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'services,services.serviceitems,services.carriers,services.carriers.images',
        },
      }

      packageAPI.getOne(
        packageId,
        _params,
        res => {
          let packageData = store.sync(res.data)
          resolve(packageData)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  getPackageDevices({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include:
            'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.devicetypes',
        },
      }

      packageAPI.getOne(
        state.selectedPackage,
        _params,
        res => {
          let packageData = store.sync(res.data)
          resolve(packageData)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  getPackagesDevices({ disptach, commit, state }) {
    return new Promise((resolve, reject) => {
      let promiseArray = []
      let _params = {
        params: {
          include:
            'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.devicetypes',
        },
      }

      for (let packageId of state.userPackages) {
        promiseArray.push(
          new Promise((resolve, reject) => {
            packageAPI.getOne(packageId, _params, res => resolve(res), err => reject(err))
          }),
        )
      }

      Promise.all(promiseArray).then(
        result_array => {
          let devicevariations = []
          for (let response of result_array) {
            let result = store.sync(response.data)

            for (let devicevariation of result.devicevariations) {
              devicevariations.push(devicevariation)
            }
          }
          resolve(devicevariations)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  getPackageAddresses({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'addresses',
        },
      }

      packageAPI.getOne(
        state.selectedPackage,
        _params,
        res => {
          let packageData = store.sync(res.data)
          resolve(packageData)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  getPackagesAddresses({ dispatch, commit, state }) {
    return new Promise((resolve, reject) => {
      let promiseArray = []
      let _params = {
        params: {
          include: 'addresses',
        },
      }

      for (let packageId of state.userPackages) {
        promiseArray.push(
          new Promise((resolve, reject) => {
            packageAPI.getOne(packageId, _params, res => resolve(res), err => reject(err))
          }),
        )
      }

      Promise.all(promiseArray).then(
        result_array => {
          let addresses = []
          for (let response of result_array) {
            let result = store.sync(response.data)

            for (let address of result.addresses) {
              addresses.push(address)
            }
          }
          resolve(addresses)
        },
        err => {
          reject(err)
        },
      )
    })
  }, */
}

// mutations
const mutations = {
  [types.PLACE_ORDER_SET_USER_PACKAGES](state, userPackages) {
    state.userPackages = userPackages
  },

  [types.PLACE_ORDER_SET_USER_PACKAGES_LOADING](state, userPackagesLoading) {
    state.userPackagesLoading = userPackagesLoading
  },

  // Upgrade

  [types.PLACE_ORDER_SET_UPGRADE_STEP](state, step) {
    state.upgrade.step = step
  },

  [types.PLACE_ORDER_SET_UPGRADE_SELECTED_EMPLOYEE](state, employee) {
    state.upgrade.selectedEmployee = employee
  },

  [types.PLACE_ORDER_SET_UPGRADE_SELECTED_SERVICE](state, service) {
    state.upgrade.selectedService = service
  },

  [types.PLACE_ORDER_SET_UPGRADE_SELECTED_DEVICE](state, device) {
    state.upgrade.selectedDevice = device
  },

  [types.PLACE_ORDER_SET_UPGRADE_CHANGE_CARRIER](state, changeCarrier) {
    state.upgrade.changeCarrier = changeCarrier
  },

  [types.PLACE_ORDER_SET_UPGRADE_HAS_ORDER](state, hasOrder) {
    state.upgrade.hasOrder = hasOrder
  },

  [types.PLACE_ORDER_SET_UPGRADE_COMMENT](state, comment) {
    state.upgrade.comment = comment
  },

  [types.PLACE_ORDER_RESET_UPGRADE](state) {
    state.upgrade = {
      ...state.upgrade,
      ..._.omit(initialUpgradeData, 'hasOrder'),
    }
  },

  // New Line of Service

  [types.PLACE_ORDER_SET_NEWLINE_STEP](state, step) {
    state.newline.step = step
  },

  [types.PLACE_ORDER_SET_NEWLINE_SELECTED_EMPLOYEE](state, selectedEmployee) {
    state.newline.selectedEmployee = selectedEmployee
  },

  [types.PLACE_ORDER_SET_NEWLINE_SELECTED_DEVICE](state, selectedDevice) {
    state.newline.selectedDevice = selectedDevice
  },

  [types.PLACE_ORDER_SET_NEWLINE_SELECTED_SERVICE](state, selectedService) {
    state.newline.selectedService = selectedService
  },

  [types.PLACE_ORDER_SET_NEWLINE_DETAILS](state, details) {
    state.newline.details = details
  },

  [types.PLACE_ORDER_SET_NEWLINE_NEED_NEW_DEVICE](state, needNewDevice) {
    state.newline.needNewDevice = needNewDevice
  },

  [types.PLACE_ORDER_SET_NEWLINE_NEED_NEW_SIM](state, needNewSim) {
    state.newline.needNewSim = needNewSim
  },

  [types.PLACE_ORDER_SET_NEWLINE_DEVICE_INFO](state, deviceInfo) {
    state.newline.deviceInfo = deviceInfo
  },

  [types.PLACE_ORDER_SET_NEWLINE_HAS_ORDER](state, hasOrder) {
    state.newline.hasOrder = hasOrder
  },

  [types.PLACE_ORDER_SET_NEWLINE_COMMENT](state, comment) {
    state.newline.comment = comment
  },

  [types.PLACE_ORDER_RESET_NEWLINE](state) {
    state.newline = {
      ...state.newline,
      ..._.omit(initialNewlineData, 'hasOrder'),
    }
  },

  // Transfer

  [types.PLACE_ORDER_SET_TRANSFER_STEP](state, step) {
    state.transfer.step = step
  },

  [types.PLACE_ORDER_SET_TRANSFER_SELECTED_EMPLOYEE](state, selectedEmployee) {
    state.transfer.selectedEmployee = selectedEmployee
  },

  [types.PLACE_ORDER_SET_TRANSFER_SELECTED_DEVICE](state, selectedDevice) {
    state.transfer.selectedDevice = selectedDevice
  },

  [types.PLACE_ORDER_SET_TRANSFER_SELECTED_SERVICE](state, selectedService) {
    state.transfer.selectedService = selectedService
  },

  [types.PLACE_ORDER_SET_TRANSFER_DETAILS](state, details) {
    state.transfer.details = details
  },

  [types.PLACE_ORDER_SET_EXISTING_SERVICE_INFO](state, existingServiceInfo) {
    state.transfer.existingServiceInfo = existingServiceInfo
  },

  [types.PLACE_ORDER_SET_TRANSFER_DEVICE_INFO](state, deviceInfo) {
    state.transfer.deviceInfo = deviceInfo
  },

  [types.PLACE_ORDER_SET_TRANSFER_NEED_NEW_DEVICE](state, needNewDevice) {
    state.transfer.needNewDevice = needNewDevice
  },

  [types.PLACE_ORDER_SET_TRANSFER_HAS_ORDER](state, hasOrder) {
    state.transfer.hasOrder = hasOrder
  },

  [types.PLACE_ORDER_SET_TRANSFER_COMMENT](state, comment) {
    state.transfer.comment = comment
  },

  [types.PLACE_ORDER_RESET_TRANSFER](state) {
    state.transfer = {
      ...state.transfer,
      ..._.omit(initialTransferData, 'hasOrder'),
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
