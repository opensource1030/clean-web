import serviceAPI from '@/api/service-api'
import Services from '@/models/Service'
import * as types from '@/store/mutation-types'
import { findByAddons, findServiceItem } from '@/components/filters.js'

const { Store } = require('yayson')()
const store = new Store()

function initialState() {
  return {
    serviceDetails: {
      id: 0,
      title: '',
      carrierId: null,
      status: true,
      code: '',
      cost: '',
      description: '',
      currency: 'USD'
    },
    domesticPlan: {
      minutes: {
        id: 0,
        domain: "domestic",
        category: "voice",
        value: 0,
        unit: "minutes",
        unlimited: 0
      },
      data: {
        id: 0,
        domain: "domestic",
        category: "data",
        value: 0,
        unit: 'Gb',
        unlimited: 0
      },
      sms: {
        id: 0,
        domain: "domestic",
        category: "messaging",
        value: 0,
        unit: "messages",
        unlimited: 0
      }
    },
    internationalPlan: {
      minutes: {
        id: 0,
        domain: "international",
        category: "voice",
        value: 0,
        unit: "minutes",
        unlimited: 0
      },
      data: {
        id: 0,
        domain: "international",
        category: "data",
        value: 0,
        unit: 'Gb',
        unlimited: 0
      },
      sms: {
        id: 0,
        domain: "international",
        category: "messaging",
        value: 0,
        unit: "messages",
        unlimited: 0
      }
    },
    addons: [],
    items: []
  }
}

const state = initialState()

const getters = {
  getServiceDetails: (state) => {
    return state.serviceDetails
  },

  getDomesticPlan: (state) => {
    return state.domesticPlan
  },

  getInternationalPlan: (state) => {
    return state.internationalPlan
  },

  getAddons: (state) => {
    return state.addons
  }
}

const actions = {
  getOne ({ dispatch, commit, state }, id) {
    return new Promise((resolve, reject) => {
      let params = {
        params: {
          include: 'serviceitems,carriers'
        }
      }

      serviceAPI.getOne(params, id, res => {
        commit(types.SERVICES_GET_SERVICE, {records: res})
        resolve(res)
      }, err => {
        console.log('service err', err)
        reject(err)
      })
    })
  },

  save({ dispatch, commit, state, rootState }, { router }) {
    // console.log('vuex service/save', state.serviceDetails)
    let status = '';
    if (state.serviceDetails.status == true) {
      status = 'Enabled'
    } else {
      status = 'Disabled'
    }

    let serviceo = new Services(
      "services",
      state.serviceDetails.id,
      status,
      state.serviceDetails.title,
      state.serviceDetails.code,
      state.serviceDetails.cost,
      state.serviceDetails.description,
      state.serviceDetails.currency,
      state.serviceDetails.carrierId.id
    )

    let items = [];
    items.push(state.domesticPlan.minutes);
    items.push(state.domesticPlan.data);
    items.push(state.domesticPlan.sms);

    items.push(state.internationalPlan.minutes);
    items.push(state.internationalPlan.data);
    items.push(state.internationalPlan.sms);

    for (let addon of state.addons) {
      addon.unit = state.serviceDetails.currency;
      if (addon.description != "" && addon.cost != "") {
        if (addon.id == null) {
          addon.id = 0;
        }
        items.push(addon);
      }
    }
    serviceo.itemJson(items, serviceo);

    return new Promise((resolve, reject) => {
      let data = serviceo.toJSON()

      if (state.serviceDetails.id > 0) {
        serviceAPI.update(state.serviceDetails.id, {data: data}, res => {
          commit(types.SERVICE_UPDATE, { router })
          resolve(res)
        }, err => {
          console.log('service/update err', err)
          reject(err)
        })
      } else {
        data.attributes.companyId = rootState.auth.profile.companyId;
        serviceAPI.create({data: data}, res => {
          commit(types.SERVICE_ADD_NEW, {router})
          resolve(res)
        }, err => {
          console.log('service/create err', err)
          reject(err)
        })
      }
    })
  }
}

const mutations = {
  [types.SERVICES_GET_SERVICE] (state, { records }) {
    if (records.status == 'Enabled') {
      state.serviceDetails.status = true;
    } else {
      state.serviceDetails.status = false;
    }

    state.serviceDetails.title = records.title;
    state.serviceDetails.code = records.planCode;
    state.serviceDetails.cost = records.cost;
    state.serviceDetails.description = records.description;
    state.serviceDetails.currency = records.currency;
    state.serviceDetails.carrierId = records.carriers[0];
    state.serviceDetails.id = records.id;

    //domestic service
    state.domesticPlan.minutes = findServiceItem(records, "voice", "domestic");
    state.domesticPlan.data = findServiceItem(records, "data", "domestic");
    state.domesticPlan.sms = findServiceItem(records, "messaging", "domestic");

    //international service
    state.internationalPlan.minutes = findServiceItem(records, "voice", "international");
    state.internationalPlan.data = findServiceItem(records, "data", "international");
    state.internationalPlan.sms = findServiceItem(records, "messaging", "international");

    //addons
    let addOns = [];
    addOns = findByAddons(records.serviceitems, "addon", "");
    // state.addons.splice(0, 1);
    state.addons = [];
    for (let addOn of addOns) {
      state.addons.push(addOn);
    }

    // if (state.addons.length == 0) {
    //   state.addons.push({id: "0", description: '', cost: '', add: false, delete: false});
    // }

    if (state.addons.length != 0) {
      reorderButtons(state)
    }

  },

  hideAndPush (state) {
    if (state.serviceDetails.id > 0) {
      state.addons.push({id: "0", description: '', cost: '', add: true, delete: false});
    } else {
      state.addons.push({description: '', cost: '', add: true, delete: false});
    }

    reorderButtons(state)
  },

  deleteAddOns (state, index) {
    state.addons.splice(index, 1);
    // if (state.addons.length == 0) {
    //   state.addons.push({id: state.serviceDetails.id, description: '', cost: '', add: false, delete: false});
    // }

    for (let add of state.addons) {
      add.add = false;
      add.delete = true;
    }

    if (state.addons.length != 0) {
      reorderButtons(state)      
    }

  },

  updateServiceDetail (state, { e, type }) {
    state.serviceDetails[type] = e;
  },

  updateDomesticplan (state, { e, type }) {
    if (type == "unit") {
      state.domesticPlan.data[type] = e;
    } else {
      state.domesticPlan[type].value = e;
    }
  },

  updateUnlimitedDomesticplan (state, { e, type }) {

      state.domesticPlan[type].unlimited = (state.domesticPlan[type].unlimited == 0) ? 1 : 0

      if (state.domesticPlan[type].unlimited) {
        state.domesticPlan[type].value = 0
        if (type == "data") {
          state.domesticPlan[type].unit = "Tb"
        }
      } else {
        if (type == "data") {
          state.domesticPlan[type].unit = "Gb"
        }
      }
      
  },

  updateInternationalplan (state, { e, type }) {
    if (type == "unit") {
      state.internationalPlan.data[type] = e;
    } else {
      state.internationalPlan[type].value = e;
    }
  },

  updateUnlimitedInternationalplan (state, { e, type }) {

    state.internationalPlan[type].unlimited = (state.internationalPlan[type].unlimited == 0) ? 1 : 0

    if (state.internationalPlan[type].unlimited) {
      state.internationalPlan[type].value = 0
      if (type == "data") {
        state.internationalPlan[type].unit = "Tb"
      }
    } else {
      if (type == "data") {
        state.internationalPlan[type].unit = "Gb"
      }
    }
    
},

  updateAddon(state, {i, e, type}) {
    if (type == 'name') {
      state.addons[i].description = e.target.value;
    }

    if (type == 'price') {
      let value = e.target.value;
      if (value != '') {
        state.addons[i].cost = e.target.value;
      }
    }

    for (let add of state.addons) {
      add.add = false;
      add.delete = true;
    }

    if (state.addons[state.addons.length - 1].description != '' && state.addons[state.addons.length - 1].cost != '') {
      state.addons[state.addons.length - 1].add = true;
    } else if (state.addons[state.addons.length - 1].description == '' && state.addons[state.addons.length - 1].cost == '') {
      state.addons[state.addons.length - 1].delete = false;
    }
  },

  [types.SERVICE_PREPARE_JSON_ITEM] (state, { serviceo }) {
    serviceo.itemJson(state.items, serviceo);
  },

  [types.SERVICE_UPDATE] (state, { router }) {
    router.push({name: 'List Services'});
  },

  [types.SERVICE_ADD_NEW](state, { router }) {
    router.push({name: 'List Services'});
  },

  [types.SERVICE_PREPARE_ITEMS](state) {

    state.items.push(state.domesticPlan.minutes);
    state.items.push(state.domesticPlan.data);
    state.items.push(state.domesticPlan.sms);

    state.items.push(state.internationalPlan.minutes);
    state.items.push(state.internationalPlan.data);
    state.items.push(state.internationalPlan.sms);

    for (let addon of state.addons) {
      if (addon.description != "" && addon.cost != "") {
        if (addon.id == null) {
          addon.id = 0;
        }
        state.items.push(addon);
      }
      addon.unit = state.serviceDetails.currency;
    }
  },

  reset(state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

function reorderButtons(state) {
  for (let add of state.addons) {
    add.add = false;
    add.delete = true;
  }

  if (state.addons[state.addons.length - 1].description != '' && state.addons[state.addons.length - 1].cost != '') {
    state.addons[state.addons.length - 1].add = true;
  } else if (state.addons[state.addons.length - 1].description == '' && state.addons[state.addons.length - 1].cost == '') {
    state.addons[state.addons.length - 1].delete = false;
  }
}

export default {
  namespaced : true,
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  actions,
  mutations
}
