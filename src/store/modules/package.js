import _ from 'lodash'
import packageAPI from './../../api/package-api'
import companyAPI from './../../api/company-api'
import presetAPI from './../../api/preset-api'
import carrierAPI from './../../api/carrier-api'
import serviceAPI from './../../api/service-api'

import * as types from './../mutation-types'

const {Store} = require('yayson')();
const store = new Store();

// initial state
const state = {
  presets: [],
  carriers: []
};

// getters
const getters = {
  allPresets: (state) => {
    return state.presets
  },

  allCarriers: (state) => {
    return state.carriers
  }
};

// actions
const actions = {
  getAll ({dispatch, commit, state}) {

    return new Promise((resolve, reject) => {
      // this params has been updated by any component, guess vuex-router-sync

      let params = {
        params: {
          include: 'devicevariations,services,conditions,devicevariations.devices'
        }
      };

      packageAPI.getAll(params, res => {
        let packages = store.sync(res.data);
        resolve(packages)
      }, err => {
        reject(err)
      })
    })
  },

  getPresets ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {

      let userProfile = JSON.parse(localStorage.getItem('userProfile'));
      let companyId = userProfile.companyId;

      let params = {
        params: {
          filter: {
            companyId: companyId
          }
        }
      };

      presetAPI.getAll(params, res => {
        let results = store.sync(res);
        commit(types.PACKAGE_GET_PRESET_ALL, {records: results});
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  getDevicesPerPreset ({dispatch, commit, state}, presetId) {
    return new Promise((resolve, reject) => {

      let params = {
        params: {
          include: 'devicevariations,devicevariations.images,devicevariations.devices'
        }
      };

      presetAPI.getOne(params, presetId, res => {
        let results = res.devicevariations;
        resolve(results);
      }, err => {
        reject(err)
      });
    })
  },

  getCarriers ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {

      let params = {
        params: {
          include: 'images'
        }
      };

      carrierAPI.search(params, res => {
        let results = store.sync(res.data);
        commit(types.PACKAGE_GET_CARRIER_ALL, {records: results});
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  getServicesPerCarrier ({dispatch, commit, state}, carrierId) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'serviceitems',
          filter: {
            carrierId: carrierId
          }
        }
      };

      serviceAPI.getAll(params, res => {
        let results = store.sync(res);
        resolve(results);
      }, err => {
        reject(err)
      })

    })
  },

  getCompanyInfo ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'udls,devicevariations,devicevariations.images,devicevariations.devices,address'
        }
      };

      let userProfile = JSON.parse(localStorage.getItem('userProfile'));
      let companyId = userProfile.companyId;

      companyAPI.get(companyId, params, res => {
        let results = store.sync(res.data);
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

};

// mutations
const mutations = {
  [types.PACKAGE_GET_PRESET_ALL] (state, {records}) {
    state.presets = records
  },
  [types.PACKAGE_GET_CARRIER_ALL] (state, {records}) {
    state.carriers = records
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
