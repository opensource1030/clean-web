import _ from "lodash";
import packageAPI from "./../../api/package-api";
import companyAPI from "./../../api/company-api";
import presetAPI from "./../../api/preset-api";
import carrierAPI from "./../../api/carrier-api";
import serviceAPI from "./../../api/service-api";

import * as types from "./../mutation-types";

const {Store} = require('yayson')();
const store = new Store();

// initial state
const state = {
  presets: [],
  carriers: [],
  packages: [],
  pagination: {
    current_page: 1,
    total_pages: 0,
    count: 0,
    total: 0,
    per_page: 25
  },
  searchFilter: ''
};

// getters
const getters = {
  allPackages: (state) => {
    return state.packages
  },

  allPresets: (state) => {
    return state.presets
  },

  allCarriers: (state) => {
    return state.carriers
  }
};

// actions
const actions = {
  getAll ({dispatch, commit, state, rootState}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          page: state.pagination.current_page,
          include: 'conditions,devicevariations,devicevariations.modifications,devicevariations.devices,services,addresses',
          filter: {
            companyId: rootState.auth.profile.companyId,
            name: {
              like: state.searchFilter
            }
          }
        }
      }

      function getTheValuesFromInclude(packIncludeList, type) {
        let min = -1;
        let currencyMin = 'USD';
        let max = -1;
        let currencyMax = 'USD';

        for (let inc of packIncludeList) {
          if (type == 'month') {
            if(min == -1 && max == -1) {
              min = inc.cost;
              max = inc.cost;
              currencyMin = inc.currency;
              currencyMax = inc.currency;
            }
            if (min > inc.cost) {
              min = inc.cost;
              currencyMin = inc.currency;
            }
            if (max < inc.cost) {
              max = inc.cost;
              currencyMax = inc.currency;
            }
          } else if (type == 'once') {
            if(min == -1 && max == -1) {
              min = inc.priceRetail;
              max = inc.priceRetail;
              currencyMin = inc.devices[0].currency;
              currencyMax = inc.devices[0].currency;
            }
            if (min > inc.priceRetail) {
              min = inc.priceRetail;
              currencyMin = inc.devices[0].currency;
            }
            if (max < inc.priceRetail) {
              max = inc.priceRetail;
              currencyMax = inc.devices[0].currency;
            }
          }
        }

        if(min == -1) {
          min = 0;
        }
        if(max == -1) {
          max = 0;
        }

        return {
          min : min,
          currencyMin : currencyMin,
          max : max,
          currencyMax : currencyMax
        };
      }

      packageAPI.search(params, res => {
        let results = store.sync(res.data);
        for (let eachPackage of results) {
          _.extend(eachPackage, {
            valuesOnce: getTheValuesFromInclude(eachPackage.devicevariations, 'once'),
            valuesMonth: getTheValuesFromInclude(eachPackage.services, 'month')
          });
        }

        commit(types.PACKAGE_GET_ALL, {records: results});
        dispatch('setPagination', res.data.meta.pagination)
        resolve(results)
      }, err => {
        reject(err)
      })
    })
  },

  getOne ({dispatch, commit, state}, packageId) {
    return new Promise((resolve, reject) => {

      let params = {
        params: {
          include: 'conditions,devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images,services,services.serviceitems,addresses,globalsettingvalues.globalsettings'
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

  getPresets ({dispatch, commit, state, rootState}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          filter: {
            companyId: rootState.auth.profile.companyId
          }
        }
      }

      presetAPI.search(params, res => {
        let results = store.sync(res.body);
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
          include: 'devicevariations,devicevariations.modifications,devicevariations.devices,devicevariations.devices.images'
        }
      }

      presetAPI.getOne(presetId, params, res => {
        let results = store.sync(res.body);
        resolve(results.devicevariations);
      }, err => {
        reject(err)
      })
    })
  },

  getCarriers ({dispatch, commit, state}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'images'
        }
      }

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

  getCompanyInfo ({dispatch, commit, state, rootState}) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'udls,udls.udlvalues,addresses'
        }
      }

      companyAPI.get(rootState.auth.profile.companyId, params, res => {
        let results = store.sync(res.data);
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  createPackage ({dispatch, commit, state, rootState}, data) {
    return new Promise((resolve, reject) => {
      delete data.id
      data.attributes.companyId = rootState.auth.profile.companyId;
      let params = {
        data: data
      };
      packageAPI.create(params, res => {
        let results = res
        resolve(results)
      }, err => {
        reject(err)
      })
    })
  },

  updatePackage ({dispatch, commit, state, rootState}, data) {
    return new Promise((resolve, reject) => {
      let id = data.id
      delete data.id
      data.attributes.companyId = rootState.auth.profile.companyId
      let params = {
        data: data
      }
      packageAPI.update(id, params, res => {
        let results = res;
        resolve(results)
      }, err => {
        reject(err)
      })
    })
  },

  deletePackage ({dispatch, commit, state}, packageId) {
    return new Promise((resolve, reject) => {
      packageAPI.remove(packageId, res => {
        let results = res;
        resolve(results);
      }, err => {
        reject(err)
      })
    })
  },

  setPagination ({ commit }, pagination) {
    commit(types.PACKAGE_SET_PAGINATION, pagination)
  },

  prevPage ({ dispatch, commit, state }) {
    if (state.pagination.current_page > 1) {
      commit(types.PACKAGE_PREV_PAGE)
      dispatch('getAll')
    }
  },

  nextPage ({ dispatch, commit }) {
    if (state.pagination.current_page < state.pagination.total_pages) {
      commit(types.PACKAGE_NEXT_PAGE)
      dispatch('getAll')
    }
  },

  searchByName ({dispatch, commit, state}, query) {
    commit(types.PACKAGE_UPDATE_FILTERS, query)
    dispatch('getAll')
  }
};

// mutations
const mutations = {
  [types.PACKAGE_GET_ALL] (state, {records}) {
    state.packages = records
  },

  [types.PACKAGE_GET_PRESET_ALL] (state, {records}) {
    state.presets = records
  },

  [types.PACKAGE_GET_CARRIER_ALL] (state, {records}) {
    state.carriers = records
  },

  [types.PACKAGE_SET_PAGINATION] (state, pagination) {
    _.extend(state.pagination, pagination)
  },

  [types.PACKAGE_PREV_PAGE] (state) {
    state.pagination.current_page--
  },

  [types.PACKAGE_NEXT_PAGE] (state) {
    state.pagination.current_page++
  },

  [types.PACKAGE_UPDATE_FILTERS] (state, query ) {
    state.searchFilter = query
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
