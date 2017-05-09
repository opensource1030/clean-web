import _ from 'lodash';
import packageAPI from './../../api/package-api'
import deviceAPI from './../../api/device-api.js'
import placeOrderAPI from './../../api/placeOrder-api'

import * as types from './../mutation-types';

const {Store} = require('yayson')();
const store = new Store();

// initial state
const state = {
  currentView: 'selectoption',
  selectedPackage: '',
  selectedService: '',
  selectedDevice: {},
  selectedCapacity: '',
  selectedStyle: '',
  selectedNeedDevice: 'Yes',
  selectedDeviceType: 'subsided',
  typedDeviceInfo: {
    IMEI: '',
    Carrier: '',
    Sim: ''
  }
}

const getters = {
  getCurrentView: (state) => {
    return state.currentView
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
          include: 'devicevariations,devicevariations.devices,devicevariations.devices.images,devicevariations.devices.modifications'
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

  setServiceSelected({ commit }, service) {
    commit(types.PLACE_ORDER_SET_SERVICE, service)
  },

  setDeviceSelected({ commit }, devicevariation) {
    commit(types.PLACE_ORDER_SET_DEVICE, devicevariation)
  },

  setCapacitySelected({ commit }, capacityId) {
    commit(types.PLACE_ORDER_SET_CAPACITY, capacityId)
  },

  setStyleSelected({ commit }, styleId) {
    commit(types.PLACE_ORDER_SET_STYLE, styleId)
  },

  setNeedDevice({ commit }, needDevice) {
    commit(types.PLACE_ORDER_SET_NEEDDEVICE, needDevice)
  },

  setDeviceType({ commit }, deviceType) {
    commit(types.PLACE_ORDER_SET_DEVICETYPE, deviceType)
  },

  setDeviceInfo({ commit }, deviceInfo) {
    commit(types.PLACE_ORDER_SET_DEVICEINFO, deviceInfo)
  }
}

// mutations
const mutations = {
  [types.PLACE_ORDER_SET_VIEW] (state, view) {
    state.currentView = view;
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
  [types.PLACE_ORDER_SET_CAPACITY] (state, capacityId) {
    state.selectedCapacity = capacityId;
  },
  [types.PLACE_ORDER_SET_STYLE] (state, styleId) {
    state.selectedStyle = styleId;
  },
  [types.PLACE_ORDER_SET_NEEDDEVICE] (state, needDevice) {
    state.selectedNeedDevice = needDevice;
  },
  [types.PLACE_ORDER_SET_DEVICETYPE] (state, deviceType) {
    state.selectedDeviceType = deviceType
  },
  [types.PLACE_ORDER_SET_DEVICEINFO] (state, deviceInfo) {
    state.typedDeviceInfo = deviceInfo
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}