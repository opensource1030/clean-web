import * as types from '@/store/mutation-types'
import packageAPI from '@/api/package-api'
import orderAPI from '@/api/order-api'

const { Store } = require('yayson')()
const store = new Store()

// initial state
const state = {
  currentOrderType: 'New',
  currentView: 'select_package',
  selectedKeepService: 'Yes',
  userId: 0,
  packages: [],
  selectedPackage: null,
  selectedService: null,
  selectedDevice: null,
  selectedCapacity: '',
  selectedStyle: {},
  selectedAccessories: [],
  selectedNeedDevice: 'Yes',
  selectedDeviceType: 'subsided',
  // typedServiceInfo: {
  //   IMEI: '',
  //   PhoneNo: '',
  //   Sim: ''
  // },
  typedDeviceInfo: {
    IMEI: '',
    PhoneNo: '',
    Carrier: '',
    Sim: '',
  },
  loading: false,
  allocation: {},
  hasOrder: false,
  upgradeStep: 0,
  changeCarrier: false,
}

const getters = {
  getCurrentView: state => {
    return state.currentView
  },

  getCurrentOrderType: state => {
    return state.currentOrderType
  },

  getSelectedKeepService: state => {
    return state.selectedKeepService
  },

  getSelectedPackage: state => {
    return state.selectedPackage
  },

  selectedService: state => {
    return state.selectedService
  },

  selectedDevice: state => {
    return state.selectedDevice
  },

  getSelectedCapacity: state => {
    return state.selectedCapacity
  },

  getSelectedStyle: state => {
    return state.selectedStyle
  },

  getSelectedAccessories: state => {
    return state.selectedAccessories
  },

  getSelectedNeedDevice: state => {
    return state.selectedNeedDevice
  },

  getSelectedDeviceType: state => {
    return state.selectedDeviceType
  },

  getTypedDeviceInfo: state => {
    return state.typedDeviceInfo
  },

  getTypedServiceInfo: state => {
    // return state.typedServiceInfo
    return state.typedDeviceInfo
  },

  getLoadingState: state => {
    return state.loading
  },

  hasOrder: state => {
    return state.hasOrder
  },

  packages: state => {
    return state.packages
  },

  devices: state => {
    let allDevices = []

    state.packages.forEach(({ id, devicevariations }) => {
      devicevariations.forEach(variation => {
        allDevices.push({ ...variation, packageId: id })
      })
    })

    allDevices = _.values(_.groupBy(_.uniqBy(allDevices, 'id'), 'deviceId'))

    return allDevices
  },

  services: state => {
    const { selectedDevice, packages } = state

    let allServices = []

    if (!selectedDevice) {
      return allServices
    }

    packages.forEach(({ devicevariations, services }) => {
      if (_.find(devicevariations, { id: selectedDevice.id })) {
        services.forEach(service => {
          allServices.push(service)
        })
      }
    })

    return allServices
  },

  addresses: state => {
    const { selectedDevice, packages } = state

    let allAddresses = []

    if (!selectedDevice) {
      return allAddresses
    }

    packages.forEach(({ devicevariations, addresses }) => {
      if (_.find(devicevariations, { id: selectedDevice.id })) {
        addresses.forEach(address => {
          allAddresses.push(address)
        })
      }
    })

    return allAddresses
  },

  upgradeStep: state => {
    return state.upgradeStep
  },

  changeCarrier: state => {
    return state.changeCarrier
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

      commit(types.PLACE_ORDER_SET_LOADING, true)

      packageAPI.getMatchedPackages(
        userId,
        payload,
        res => {
          const results = store.sync(res.data)
          commit(types.PLACE_ORDER_SET_PACKAGES, results)
          commit(types.PLACE_ORDER_SET_LOADING, false)
          resolve(results)
        },
        err => {
          commit(types.PLACE_ORDER_SET_LOADING, false)
          reject(err)
        },
      )
    })
  },

  getPackageServices({ dispatch, commit, state }, packageId) {
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
  },

  createOrder({ commit, dispatch }, orderData) {
    return new Promise((resolve, reject) => {
      orderAPI.create(
        orderData,
        res => {
          commit(types.PLACE_ORDER_SET_HAS_ORDER, true)
          commit(types.PLACE_ORDER_RESET)
          dispatch(`employee/selectEmployee`, null, { root: true })
          resolve(res)
        },
        err => {
          reject(err)
        },
      )
    })
  },

  setCurrentOrderType({ commit }, type) {
    commit(types.PLACE_ORDER_SET_ORDER_TYPE, type)
  },

  setCurrentView({ commit }, view) {
    commit(types.PLACE_ORDER_SET_VIEW, view)
  },

  setUserId({ commit }, userId) {
    commit(types.PLACE_ORDER_SET_USER_ID, userId)
  },

  setService({ commit }, service) {
    commit(types.PLACE_ORDER_SET_SERVICE, service)
  },

  setDevice({ commit }, devicevariation) {
    commit(types.PLACE_ORDER_SET_DEVICE, devicevariation)
  },

  setCapacitySelected({ commit }, capacity) {
    commit(types.PLACE_ORDER_SET_CAPACITY, capacity)
  },

  setStyleSelected({ commit }, style) {
    commit(types.PLACE_ORDER_SET_STYLE, style)
  },

  setAccessoriesSelected({ commit }, accessories) {
    commit(types.PLACE_ORDER_SET_ACCESSORY, accessories)
  },

  setNeedDevice({ commit }, needDevice) {
    commit(types.PLACE_ORDER_SET_NEEDDEVICE, needDevice)
  },

  setDeviceType({ commit }, deviceType) {
    commit(types.PLACE_ORDER_SET_DEVICETYPE, deviceType)
  },

  setDeviceInfo({ commit }, deviceInfo) {
    commit(types.PLACE_ORDER_SET_DEVICEINFO, deviceInfo)
  },

  setKeepService({ commit }, keepService) {
    commit(types.PLACE_ORDER_SET_KEEPSERVICE, keepService)
  },

  setServiceInfo({ commit }, serviceInfo) {
    commit(types.PLACE_ORDER_SET_SERVICEINFO, serviceInfo)
  },

  setAllocation({ commit }, allocation) {
    commit(types.PLACE_ORDER_SET_ALLOCATION, allocation)
  },

  setHasOrder({ commit }, hasOrder) {
    commit(types.PLACE_ORDER_SET_HAS_ORDER, hasOrder)
  },

  setUpgradeStep({ commit }, step) {
    commit(types.PLACE_ORDER_SET_UPGRADE_STEP, step)
  },

  setChangeCarrier({ commit }, changeCarrier) {
    commit(types.PLACE_ORDER_SET_CHANGE_CARRIER, changeCarrier)
  },
}

// mutations
const mutations = {
  [types.PLACE_ORDER_SET_VIEW](state, view) {
    state.currentView = view
  },

  [types.PLACE_ORDER_SET_ORDER_TYPE](state, type) {
    state.currentOrderType = type
  },

  [types.PLACE_ORDER_SET_USER_ID](state, userId) {
    state.userId = userId
  },

  [types.PLACE_ORDER_SET_PACKAGES](state, packages) {
    state.packages = packages
  },

  [types.PLACE_ORDER_SET_LOADING](state, loading) {
    state.loading = loading
  },

  [types.PLACE_ORDER_SET_PACKAGE](state, packageId) {
    state.selectedPackage = packageId
  },

  [types.PLACE_ORDER_SET_SERVICE](state, service) {
    state.selectedService = service
  },

  [types.PLACE_ORDER_SET_DEVICE](state, devicevariation) {
    state.selectedDevice = devicevariation
  },

  [types.PLACE_ORDER_SET_CAPACITY](state, capacity) {
    state.selectedCapacity = capacity
  },

  [types.PLACE_ORDER_SET_STYLE](state, style) {
    state.selectedStyle = style
  },

  [types.PLACE_ORDER_SET_ACCESSORY](state, accessories) {
    state.selectedAccessories = accessories
  },

  [types.PLACE_ORDER_SET_NEEDDEVICE](state, needDevice) {
    state.selectedNeedDevice = needDevice
  },

  [types.PLACE_ORDER_SET_DEVICETYPE](state, deviceType) {
    state.selectedDeviceType = deviceType
  },

  [types.PLACE_ORDER_SET_DEVICEINFO](state, deviceInfo) {
    state.typedDeviceInfo = deviceInfo
  },

  [types.PLACE_ORDER_SET_KEEPSERVICE](state, keepService) {
    state.selectedKeepService = keepService
  },

  [types.PLACE_ORDER_SET_SERVICEINFO](state, serviceInfo) {
    // state.typedServiceInfo = serviceInfo;
    state.typedDeviceInfo = serviceInfo
  },

  [types.PLACE_ORDER_SET_ALLOCATION](state, allocation) {
    state.allocation = allocation
  },

  [types.PLACE_ORDER_SET_HAS_ORDER](state, hasOrder) {
    state.hasOrder = hasOrder
  },

  [types.PLACE_ORDER_SET_UPGRADE_STEP](state, step) {
    state.upgradeStep = step
  },

  [types.PLACE_ORDER_SET_CHANGE_CARRIER](state, changeCarrier) {
    state.changeCarrier = changeCarrier
  },

  [types.PLACE_ORDER_RESET](state) {
    state.changeCarrier = false
    state.upgradeStep = 0
    state.selectedDevice = null
    state.selectedService = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
