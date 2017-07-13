import packageAPI from "./../../api/package-api";
import orderAPI from "./../../api/order-api";
import employeeAPI from "./../../api/employee-api";
import * as types from "./../mutation-types";

const {Store} = require('yayson')()
const store = new Store()

// initial state
const state = {
  currentOrderType: 'New',
  currentView: 'select_package',
  selectedKeepService: 'Yes',
  userId: 0,
  userPackages: [],
  selectedPackage: '',
  selectedService: '',
  selectedDevice: {},
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
    Sim: ''
  },
  allPackages_loading: true,
  allocation: {}
}

const getters = {
  getCurrentView: (state) => {
    return state.currentView
  },

  getCurrentOrderType: (state) => {
    return state.currentOrderType
  },

  getSelectedKeepService: (state) => {
    return state.selectedKeepService
  },

  getSelectedPackage: (state) => {
    return state.selectedPackage
  },

  getSelectedService: (state) => {
    return state.selectedService
  },

  getSelectedDevice: (state) => {
    return state.selectedDevice
  },

  getSelectedCapacity: (state) => {
    return state.selectedCapacity
  },

  getSelectedStyle: (state) => {
    return state.selectedStyle
  },

  getSelectedAccessories: (state) => {
    return state.selectedAccessories;
  },

  getSelectedNeedDevice: (state) => {
    return state.selectedNeedDevice
  },

  getSelectedDeviceType: (state) => {
    return state.selectedDeviceType
  },

  getTypedDeviceInfo: (state) => {
    return state.typedDeviceInfo
  },

  getTypedServiceInfo: (state) => {
    // return state.typedServiceInfo
    return state.typedDeviceInfo
  },
  getPackagesLoadingState: (state) => {
    return state.allPackages_loading
  }
}

// actions
const actions = {
  getUserPackages({ dispatch, commit, state }, userId) {
    return new Promise((resolve, reject) => {
      packageAPI.getMatchedPackages(userId, res => {
        let results = store.sync(res.data);
        commit(types.PLACE_ORDER_SET_PACKAGELIST, results);
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  getPackageServices ({dispatch, commit, state}, packageId) {
    commit(types.PLACE_ORDER_SET_PACKAGE, packageId)
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'services,services.serviceitems,services.carriers,services.carriers.images'
        }
      }

      packageAPI.getOne(packageId, _params, res => {
        let packageData = store.sync(res.data)
        resolve(packageData)
      }, err => {
        reject(err)
      })
    })
  },

  getPackageDevices ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.devicetypes'
        }
      }

      packageAPI.getOne(state.selectedPackage, _params, res => {
        let packageData = store.sync(res.data);
        resolve(packageData);
      }, err => {
        reject(err)
      })
    })
  },

  getPackagesDevices({disptach, commit, state}) {
    return new Promise((resolve, reject) => {
      let promiseArray = [];
      let _params = {
        params: {
          include: 'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.devicetypes'
        }
      }

      for (let packageId of state.userPackages) {
        promiseArray.push(new Promise((resolve, reject) => {
          packageAPI.getOne(packageId, _params, res => resolve(res), err => reject(err))
        }))
      }

      Promise.all(promiseArray).then(result_array => {
        let devicevariations = []
        for (let response of result_array) {
          let result = store.sync(response.data)

          for (let devicevariation of result.devicevariations) {
            devicevariations.push(devicevariation)
          }
        }
        resolve(devicevariations)
      }, err => {
        reject(err)
      })
    })
  },

  getPackageAddresses ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let _params = {
        params: {
          include: 'addresses'
        }
      }

      packageAPI.getOne(state.selectedPackage, _params, res => {
        let packageData = store.sync(res.data)
        resolve(packageData)
      }, err => {
        reject(err)
      })
    })
  },

  getPackagesAddresses ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let promiseArray = []
      let _params = {
        params: {
          include: 'addresses'
        }
      }

      for (let packageId of state.userPackages) {
        promiseArray.push(new Promise((resolve, reject) => {
          packageAPI.getOne(packageId, _params, res => resolve(res), err => reject(err))
        }))
      }

      Promise.all(promiseArray).then(result_array => {
        let addresses = []
        for (let response of result_array) {
          let result = store.sync(response.data)

          for(let address of result.addresses) {
            addresses.push(address)
          }
        }
        resolve(addresses)
      }, err => {
        reject(err)
      })
    })
  },

  createOrder ({dispatch, commit, state}, orderData) {
    return new Promise((resolve, reject) => {
      orderAPI.create(orderData, res => {
        console.log('place_order/createdOrder', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },

  setCurrentOrderType({commit}, type) {
    commit(types.PLACE_ORDER_SET_ORDER_TYPE, type)
  },

  setCurrentView({commit}, view) {
    commit(types.PLACE_ORDER_SET_VIEW, view)
  },

  setUserId({ commit }, userId) {
    commit(types.PLACE_ORDER_SET_USER_ID, userId)
  },

  setServiceSelected({ commit }, service) {
    commit(types.PLACE_ORDER_SET_SERVICE, service)
  },

  setDeviceSelected({ commit }, devicevariation) {
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

  setAllocation({commit}, allocation) {
    commit(types.PLACE_ORDER_SET_ALLOCATION, allocation)
  },
}

// mutations
const mutations = {
  [types.PLACE_ORDER_SET_VIEW] (state, view) {
    state.currentView = view
  },

  [types.PLACE_ORDER_SET_ORDER_TYPE] (state, type) {
    state.currentOrderType = type
  },

  [types.PLACE_ORDER_SET_USER_ID] (state, userId) {
    state.userId = userId
  },

  [types.PLACE_ORDER_SET_PACKAGELIST] (state, packages) {
    let packageIds = []
    for (let eachPackage of packages) {
      packageIds.push(eachPackage.id)
    }
    state.userPackages = packageIds
    state.allPackages_loading = false
  },

  [types.PLACE_ORDER_SET_PACKAGE] (state, packageId) {
    state.selectedPackage = packageId
  },

  [types.PLACE_ORDER_SET_SERVICE] (state, service) {
    state.selectedService = service
  },

  [types.PLACE_ORDER_SET_DEVICE] (state, devicevariation) {
    state.selectedDevice = devicevariation
  },

  [types.PLACE_ORDER_SET_CAPACITY] (state, capacity) {
    state.selectedCapacity = capacity
  },

  [types.PLACE_ORDER_SET_STYLE] (state, style) {
    state.selectedStyle = style
  },

  [types.PLACE_ORDER_SET_ACCESSORY] (state, accessories) {
    state.selectedAccessories = accessories
  },

  [types.PLACE_ORDER_SET_NEEDDEVICE] (state, needDevice) {
    state.selectedNeedDevice = needDevice
  },

  [types.PLACE_ORDER_SET_DEVICETYPE] (state, deviceType) {
    state.selectedDeviceType = deviceType
  },

  [types.PLACE_ORDER_SET_DEVICEINFO] (state, deviceInfo) {
    state.typedDeviceInfo = deviceInfo
  },

  [types.PLACE_ORDER_SET_KEEPSERVICE] (state, keepService) {
    state.selectedKeepService = keepService
  },

  [types.PLACE_ORDER_SET_SERVICEINFO] (state, serviceInfo) {
    // state.typedServiceInfo = serviceInfo;
    state.typedDeviceInfo = serviceInfo
  },

  [types.PLACE_ORDER_SET_ALLOCATION] (state, allocation) {
    state.allocation = allocation
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}