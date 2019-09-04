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
  hasOrder: false,
}

const initialTransferData = {
  step: 0,
  selectedEmployee: null,
  selectedService: null,
  selectedDevice: null,
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
  transfer: { ...initialTransferData },
}

const getters = {
  userPackages: state => {
    return state.userPackages
  },

  userPackagesLoading: state => {
    return state.userPackagesLoading
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

  upgradeDevices: state => {
    let allDevices = []

    state.userPackages.forEach(({ id, devicevariations }) => {
      devicevariations.forEach(variation => {
        allDevices.push({ ...variation, packageId: id })
      })
    })

    allDevices = _.values(_.groupBy(_.uniqBy(allDevices, 'id'), 'deviceId'))

    return allDevices
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

  [types.PLACE_ORDER_RESET_UPGRADE](state) {
    state.upgrade = {
      ...state.upgrade,
      ..._.omit(initialUpgradeData, 'hasOrder'),
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
