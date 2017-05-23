import _ from 'lodash';
import packageAPI from './../../api/package-api'
import deviceAPI from './../../api/device-api.js'
import placeOrderAPI from './../../api/placeOrder-api'

import * as types from './../mutation-types';
import {http} from 'vue';

const {Store} = require('yayson')();
const store = new Store();

// initial state
const state = {
  currentView: 'select_package',
  selectedKeepService: 'Yes',
  userPackages: [],
  selectedPackage: '',
  selectedService: '',
  selectedDevice: {},
  selectedCapacity: '',
  selectedStyle: {},
  selectedNeedDevice: 'Yes',
  selectedDeviceType: 'subsided',
  typedServiceInfo: {
    IMEI: '',
    PhoneNo: '',
    Sim: ''
  },
  typedDeviceInfo: {
    IMEI: '',
    Carrier: '',
    Sim: ''
  },
  allPackages_loading: true
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
    return state.typedServiceInfo
  },
  getPackagesLoadingState: (state) => {
    return state.allPackages_loading
  }
}

// actions
const actions = {
  setCurrentView({ commit }, view) {
    commit(types.PLACE_ORDER_SET_VIEW, view)
  },

  getUserPackages({ dispatch, commit, state }, userId) {
    return new Promise((resolve, reject) => {
      placeOrderAPI.getPackages(userId, res => {
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

      let params = {
        params: {
          include: 'services,services.serviceitems,services.carriers,services.carriers.images'
        }
      };

      packageAPI.getOne(packageId, params, res => {
        let packageData = store.sync(res.data);
        resolve(packageData);
      }, err => {
        reject(err)
      })
    })
  },

  getPackageDevices ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {

      let params = {
        params: {
          include: 'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images'
        }
      };

      packageAPI.getOne(state.selectedPackage, params, res => {
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
      let params = {
        params: {
          include: 'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images'
        }
      };

      for(let eachPackage of state.userPackages)
        promiseArray.push(http.get(process.env.URL_API + '/packages/' + eachPackage, params));

      Promise.all(promiseArray).then(result_array => {
        let devicevariations = [];
        for(let response of result_array) {
          let result = store.sync(response.data);
          
          for(let devicevariation of result.devicevariations) {
            devicevariations.push(devicevariation);
          }
        }
        resolve(devicevariations);
      }, err => {
        reject(err)
      })
    })
  },

  getPackageAddresses ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {

      let params = {
        params: {
          include: 'addresses'
        }
      };

      packageAPI.getOne(state.selectedPackage, params, res => {
        let packageData = store.sync(res.data);
        resolve(packageData);
      }, err => {
        reject(err)
      })
    })
  },

  getPackagesAddresses ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let promiseArray = [];
      let params = {
        params: {
          include: 'addresses'
        }
      };

      for(let eachPackage of state.userPackages)
        promiseArray.push(http.get(process.env.URL_API + '/packages/' + eachPackage, params));

      Promise.all(promiseArray).then(result_array => {
        let addresses = [];
        for(let response of result_array) {
          let result = store.sync(response.data);
          
          for(let address of result.addresses) {
            addresses.push(address);
          }
        }
        resolve(addresses);
      }, err => {
        reject(err)
      })
    })
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
  }
}

// mutations
const mutations = {
  [types.PLACE_ORDER_SET_VIEW] (state, view) {
    state.currentView = view;
  },
  [types.PLACE_ORDER_SET_ORDER_TYPE] (state, type) {
    state.currentOrderType = type;
  },
  [types.PLACE_ORDER_SET_PACKAGELIST] (state, packages) {
    let packageIds = [];
    for(let eachPackage of packages)
      packageIds.push(eachPackage.id);
    state.userPackages = packageIds;
    state.allPackages_loading = false;
  },
  [types.PLACE_ORDER_SET_PACKAGE] (state, packageId) {
    state.selectedPackage = packageId;
  },
  [types.PLACE_ORDER_SET_SERVICE] (state, service) {
    state.selectedService = service;
  },
  [types.PLACE_ORDER_SET_DEVICE] (state, devicevariation) {
    state.selectedDevice = devicevariation;
  },
  [types.PLACE_ORDER_SET_CAPACITY] (state, capacity) {
    state.selectedCapacity = capacity;
  },
  [types.PLACE_ORDER_SET_STYLE] (state, style) {
    state.selectedStyle = style;
  },
  [types.PLACE_ORDER_SET_NEEDDEVICE] (state, needDevice) {
    state.selectedNeedDevice = needDevice;
  },
  [types.PLACE_ORDER_SET_DEVICETYPE] (state, deviceType) {
    state.selectedDeviceType = deviceType;
  },
  [types.PLACE_ORDER_SET_DEVICEINFO] (state, deviceInfo) {
    state.typedDeviceInfo = deviceInfo;
  },
  [types.PLACE_ORDER_SET_KEEPSERVICE] (state, keepService) {
    state.selectedKeepService = keepService;
  },
  [types.PLACE_ORDER_SET_SERVICEINFO] (state, serviceInfo) {
    state.typedServiceInfo = serviceInfo;
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}